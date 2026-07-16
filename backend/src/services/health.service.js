import { supabaseAdmin, supabaseAnon } from '../config/supabase.js';

export const healthService = {
  async checkDatabaseConnection() {
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 1,
      });

      if (error) {
        return { connected: false, message: error.message };
      }

      return { connected: true, mode: 'service_role' };
    }

    // Fallback probe when only the anon key is configured
    const { error } = await supabaseAnon.auth.getSession();

    if (error) {
      return { connected: false, message: error.message };
    }

    return {
      connected: true,
      mode: 'anon',
      warning:
        'SUPABASE_SERVICE_ROLE_KEY is missing or invalid. Admin seed and profile sync are limited.',
    };
  },
};
