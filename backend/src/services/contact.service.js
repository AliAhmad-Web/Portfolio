import { supabaseAdmin } from '../config/supabase.js';
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
};
