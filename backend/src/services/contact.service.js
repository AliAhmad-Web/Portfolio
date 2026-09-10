import {
  isSupabaseReachableConfig,
  supabaseAdmin,
  supabaseAnon,
} from '../config/supabase.js';
import { env } from '../config/env.js';
import { emailService } from './email.service.js';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../utils/ApiError.js';

const CONTACT_STATUSES = ['pending', 'resolved', 'completed'];

function assertAdminClient() {
  if (!supabaseAdmin) {
    throw new ApiError(
      500,
      'Supabase service role client is not configured. Set SUPABASE_SERVICE_ROLE_KEY.',
    );
  }
}

function localSavedContact({ name, email, message }) {
  const now = new Date().toISOString();
  return {
    id: `local-${Date.now()}`,
    name,
    email,
    message,
    status: 'pending',
    createdAt: now,
    updatedAt: null,
  };
}

const PUBLIC_INBOX = 'alikhan234ali@gmail.com';

function getContactInbox() {
  return env.resend.toEmail || env.admin.email || PUBLIC_INBOX;
}

async function deliverViaEmailFallback(payload) {
  const emailResult = await emailService.sendContactNotification({
    name: payload.name,
    email: payload.email,
    message: payload.message,
    submittedAt: new Date().toISOString(),
  });

  if (emailResult.sent) {
    return true;
  }

  const inbox = getContactInbox();
  const origin = env.clientUrl || 'https://aliahmadportfolio.vercel.app';

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: origin,
        Referer: `${origin.replace(/\/$/, '')}/`,
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        _replyto: payload.email,
        _subject: `New portfolio contact message from ${payload.name}`,
        _template: 'box',
        _captcha: 'false',
      }),
    });

    if (!response.ok) {
      console.error('[contact] Email fallback HTTP', response.status);
      return false;
    }

    const result = await response.json().catch(() => ({ success: true }));
    if (result.success === 'false' || result.success === false) {
      const reason = String(result.message || result);
      if (/activat/i.test(reason)) {
        console.warn('[contact] FormSubmit received the message and is waiting for inbox activation.');
        return true;
      }
      console.error('[contact] Email fallback rejected:', reason);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[contact] Email fallback failed:', error.message || error);
    return false;
  }
}

function formatContact(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    status: row.status ?? 'pending',
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? null,
  };
}

export const contactService = {
  statuses: CONTACT_STATUSES,

  async listContacts({ search = '', status = '', limit = 100 } = {}) {
    assertAdminClient();

    let query = supabaseAdmin
      .from('contact_messages')
      .select('id, name, email, message, status, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(Math.min(Number(limit) || 100, 500));

    if (status && CONTACT_STATUSES.includes(status)) {
      query = query.eq('status', status);
    }

    if (search?.trim()) {
      const safeTerm = search
        .trim()
        .replace(/[%_,]/g, ' ')
        .replace(/\s+/g, ' ')
        .slice(0, 100);
      const term = `%${safeTerm}%`;
      query = query.or(
        `name.ilike.${term},email.ilike.${term},message.ilike.${term}`,
      );
    }

    const { data, error } = await query;

    if (error) {
      throw new ApiError(500, `Failed to load contacts: ${error.message}`);
    }

    return (data ?? []).map(formatContact);
  },

  async getContactById(id) {
    assertAdminClient();

    const contactId = Number(id);
    if (!Number.isFinite(contactId) || contactId <= 0) {
      throw new BadRequestError('A valid contact ID is required');
    }

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('id, name, email, message, status, created_at, updated_at')
      .eq('id', contactId)
      .maybeSingle();

    if (error) {
      throw new ApiError(500, `Failed to load contact: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundError('Contact message not found');
    }

    return formatContact(data);
  },

  async updateContactStatus(id, status) {
    assertAdminClient();

    if (!CONTACT_STATUSES.includes(status)) {
      throw new BadRequestError(
        `Status must be one of: ${CONTACT_STATUSES.join(', ')}`,
      );
    }

    const contactId = Number(id);
    if (!Number.isFinite(contactId) || contactId <= 0) {
      throw new BadRequestError('A valid contact ID is required');
    }

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', contactId)
      .select('id, name, email, message, status, created_at, updated_at')
      .maybeSingle();

    if (error) {
      throw new ApiError(500, `Failed to update contact: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundError('Contact message not found');
    }

    return formatContact(data);
  },

  async getDashboardStats() {
    assertAdminClient();

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('id, name, email, message, status, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw new ApiError(500, `Failed to load dashboard stats: ${error.message}`);
    }

    const contacts = data ?? [];
    const stats = {
      total: contacts.length,
      pending: contacts.filter((item) => item.status === 'pending').length,
      resolved: contacts.filter((item) => item.status === 'resolved').length,
      completed: contacts.filter((item) => item.status === 'completed').length,
    };

    return {
      stats,
      recentContacts: contacts.slice(0, 5).map(formatContact),
    };
  },

  async createMessage({ name, email, message }) {
    const payload = {
      name,
      email,
      message,
      status: 'pending',
    };

    if (isSupabaseReachableConfig) {
      try {
        if (supabaseAdmin) {
          const { data, error } = await supabaseAdmin
            .from('contact_messages')
            .insert(payload)
            .select('id, name, email, message, status, created_at, updated_at')
            .single();

          if (!error && data) {
            return formatContact(data);
          }

          console.error('[contact] Admin insert failed, trying RPC:', error?.message || error);
        }

        if (supabaseAnon?.rpc) {
          const { data, error } = await supabaseAnon.rpc('insert_contact_message', {
            p_name: payload.name,
            p_email: payload.email,
            p_message: payload.message,
          });

          if (!error && data) {
            return formatContact(data) || data;
          }

          console.error('[contact] RPC insert failed:', error?.message || error);
        }
      } catch (error) {
        console.error('[contact] Unexpected insert error:', error?.message || error);
      }
    } else {
      console.warn('[contact] Skipping database — Supabase URL is missing or a placeholder.');
    }

    const delivered = await deliverViaEmailFallback(payload);
    if (delivered) {
      console.warn('[contact] Saved via email fallback because the database is unreachable.');
      return localSavedContact(payload);
    }

    console.error(
      '[contact] Database and email delivery failed. Accepting message so the visitor is not blocked.',
      {
        name: payload.name,
        email: payload.email,
        message: payload.message,
      },
    );
    return localSavedContact(payload);
  },
};
