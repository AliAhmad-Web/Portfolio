import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

const supabaseOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

export const supabaseAdmin = createClient(
  env.supabase.url,
  env.supabase.serviceRoleKey,
  supabaseOptions,
);

export const supabaseAnon = createClient(
  env.supabase.url,
  env.supabase.anonKey,
  supabaseOptions,
);

/**
 * Creates a Supabase client scoped to a user's JWT.
 * Use this for future authenticated dashboard operations.
 */
export function createSupabaseUserClient(accessToken) {
  return createClient(env.supabase.url, env.supabase.anonKey, {
    ...supabaseOptions,
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}
