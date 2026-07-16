import { Resend } from 'resend';
import { env } from '../config/env.js';

let resendClient = null;

function getResendClient() {
  if (!env.resend.apiKey) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(env.resend.apiKey);
  }

  return resendClient;
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

export const emailService = {
  isConfigured() {
    return Boolean(
      env.resend.enabled &&
        env.resend.apiKey &&
        env.resend.fromEmail &&
        env.resend.toEmail,
    );
  },

  /**
   * Sends an admin notification for a new contact form submission.
   * Never throws — failures are logged and returned for the caller.
   */
  async sendContactNotification(payload) {
    if (!this.isConfigured()) {
      console.warn(
        '[email] Resend is not configured. Skipping contact notification.',
      );
      return {
        sent: false,
        skipped: true,
        reason: 'Resend is not configured',
      };
    }

    const client = getResendClient();
    if (!client) {
      return {
        sent: false,
        skipped: true,
        reason: 'Resend client unavailable',
      };
    }

    const { name, email, message, submittedAt } = payload;
    const { text, html } = buildContactEmailContent({
      name,
      email,
      message,
      submittedAt,
    });

    try {
      const { data, error } = await client.emails.send({
        from: env.resend.fromEmail,
        to: [env.resend.toEmail],
        replyTo: email,
        subject: `New contact message from ${name}`,
        text,
        html,
      });

      if (error) {
        console.error('[email] Resend contact notification failed:', error);
        return {
          sent: false,
          skipped: false,
          error: error.message || 'Failed to send email',
        };
      }

      console.info('[email] Contact notification sent:', data?.id ?? 'ok');
      return {
        sent: true,
        skipped: false,
        id: data?.id ?? null,
      };
    } catch (error) {
      console.error('[email] Resend contact notification error:', error);
      return {
        sent: false,
        skipped: false,
        error: error.message || 'Unexpected email error',
      };
    }
  },
};
