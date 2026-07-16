import { supabaseAdmin } from '../config/supabase.js';
import { ApiError, NotFoundError } from '../utils/ApiError.js';

function assertAdminClient() {
  if (!supabaseAdmin) {
    throw new ApiError(
      500,
      'Supabase service role client is not configured. Set SUPABASE_SERVICE_ROLE_KEY.',
    );
  }
}

export const profileService = {
  async getById(userId) {
    if (!supabaseAdmin) {
      return null;
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, full_name, role, avatar_url, created_at, updated_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      throw new ApiError(500, `Failed to load profile: ${error.message}`);
    }

    return data;
  },

  async ensureProfile(user) {
    if (!supabaseAdmin) {
      return {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name ?? null,
        role: user.app_metadata?.role ?? 'user',
        avatar_url: user.user_metadata?.avatar_url ?? null,
        created_at: user.created_at,
        updated_at: null,
      };
    }

    const existing = await this.getById(user.id);
    if (existing) {
      return existing;
    }

    const role = user.app_metadata?.role ?? 'user';

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name ?? null,
          role,
          avatar_url: user.user_metadata?.avatar_url ?? null,
        },
        { onConflict: 'id' },
      )
      .select('id, email, full_name, role, avatar_url, created_at, updated_at')
      .single();

    if (error) {
      // Table may not exist yet — fall back to auth metadata
      console.warn('[profiles] ensureProfile fallback:', error.message);
      return {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name ?? null,
        role,
        avatar_url: user.user_metadata?.avatar_url ?? null,
        created_at: user.created_at,
        updated_at: null,
      };
    }

    return data;
  },

  async requireById(userId) {
    const profile = await this.getById(userId);

    if (!profile) {
      throw new NotFoundError('User profile not found');
    }

    return profile;
  },

  async countAdmins() {
    assertAdminClient();

    const { count, error } = await supabaseAdmin
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'admin');

    if (error) {
      throw new ApiError(500, `Failed to count admins: ${error.message}`);
    }

    return count ?? 0;
  },
};
