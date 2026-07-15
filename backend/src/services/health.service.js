import { supabaseAdmin } from '../config/supabase.js';

export const healthService = {
  async checkDatabaseConnection() {
    const { error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    });

    if (error) {
      return { connected: false, message: error.message };
    }

    return { connected: true };
  },
};
