/**
 * Vercel serverless contact API shim.
 * Purpose: Handle POST /api/v1/contact (reCAPTCHA → Supabase → Resend) in production.
 * Note: Full auth/admin APIs run on the Express backend; this covers the public contact form.
 */

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

async function verifyRecaptchaToken(token, expectedAction) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const enabled = process.env.RECAPTCHA_ENABLED !== 'false';
  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);

  if (!enabled || !secret) {
    return { ok: true, skipped: true };
  }

  if (!token) {
    return { ok: false, status: 400, message: 'reCAPTCHA token is required' };
  }

  const params = new URLSearchParams();
  params.set('secret', secret);
  params.set('response', token);

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const payload = await response.json();

  if (!payload.success) {
    return {
      ok: false,
      status: 403,
      message: 'reCAPTCHA verification failed. Please try again.',
    };
  }

  if (expectedAction && payload.action !== expectedAction) {
    return {
      ok: false,
      status: 403,
      message: 'reCAPTCHA action mismatch. Please try again.',
    };
  }

  if (typeof payload.score === 'number' && payload.score < minScore) {
    return {
      ok: false,
      status: 403,
      message: 'reCAPTCHA score too low. Please try again later.',
    };
  }

  return { ok: true, skipped: false, score: payload.score };
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatSubmittedAt(value) {
  const date = value ? new Date(value) : new Date();
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'UTC',
  }).format(date);
}

function buildContactEmailContent({ name, email, message, submittedAt }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');
  const submittedLabel = formatSubmittedAt(submittedAt);

  const text = [
    'New portfolio contact message',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Submitted: ${submittedLabel}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a;">
      <h2 style="margin: 0 0 16px;">New portfolio contact message</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p style="margin: 0 0 16px;"><strong>Submitted:</strong> ${escapeHtml(submittedLabel)}</p>
      <div style="padding: 16px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px;"><strong>Message</strong></p>
        <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
      </div>
    </div>
  `.trim();

  return { text, html };
}

async function sendContactNotification({ name, email, message, submittedAt }) {
  const enabled = process.env.RESEND_ENABLED !== 'false';
  const apiKey = process.env.RESEND_API_KEY || '';
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';
  const toEmail = process.env.RESEND_TO_EMAIL || process.env.ADMIN_EMAIL || '';

  if (!enabled || !apiKey || !toEmail) {
    return { sent: false, skipped: true, reason: 'Resend not configured' };
  }

  const resend = new Resend(apiKey);
  const { text, html } = buildContactEmailContent({
    name,
    email,
    message,
    submittedAt,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New contact message from ${name}`,
      text,
      html,
    });

    if (error) {
      console.error('[email] Resend contact notification failed:', error);
      return { sent: false, skipped: false, error: error.message || 'Failed to send email' };
    }

    console.info('[email] Resend contact notification sent:', data?.id ?? 'ok');
    return { sent: true, skipped: false, id: data?.id ?? null };
  } catch (error) {
    console.error('[email] Resend contact notification error:', error);
    return {
      sent: false,
      skipped: false,
      error: error?.message || 'Unexpected email error',
    };
  }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    const path = (req.url || '').split('?')[0];

    // Root / health
    if (path === '/' || path.endsWith('/api')) {
      res.status(200).json({ success: true, message: 'API is running' });
      return;
    }

    // POST contact
    if (path.includes('contact') && req.method === 'POST') {
      const { name, email, message, recaptchaToken } = req.body || {};
      if (!name || !email || !message) {
        res.status(400).json({ success: false, message: 'All fields required' });
        return;
      }

      const captcha = await verifyRecaptchaToken(recaptchaToken, 'contact');
      if (!captcha.ok) {
        res.status(captcha.status).json({
          success: false,
          message: captcha.message,
        });
        return;
      }

      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        res.status(500).json({ success: false, message: 'Supabase not configured' });
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data: inserted, error } = await supabase.rpc('insert_contact_message', {
        p_name: name.trim(),
        p_email: email.trim(),
        p_message: message.trim(),
      });

      if (error) {
        console.error('Supabase error:', error);
        res.status(500).json({ success: false, message: 'Failed to save message' });
        return;
      }

      // Email must never block a successful DB save
      // (if it fails, we still return success to the user)
      try {
        await sendContactNotification({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          submittedAt: inserted?.created_at || inserted?.createdAt,
        });
      } catch (error) {
        console.error('[email] Failed to send contact notification:', error);
      }

      res.status(201).json({ success: true, message: 'Message sent!' });
      return;
    }

    res.status(404).json({ success: false, message: `Not found: ${path}` });
  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
}
