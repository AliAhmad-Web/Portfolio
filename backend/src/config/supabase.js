import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

const supabaseOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

const hasSupabaseConfig = env.supabase.url && env.supabase.anonKey;

function createSafeClient() {
  if (!hasSupabaseConfig) {
    // Return a mock client that logs errors for development without Supabase
    const createStub = (name) => ({
      rpc: () => {
        console.error(`Supabase ${name} called but no Supabase credentials configured`);
        return { data: null, error: new Error('Supabase not configured') };
      },
    });
    return createStub('client');
  }

  return createClient(env.supabase.url, env.supabase.anonKey, supabaseOptions);
}

export const supabaseAdmin = env.supabase.url && env.supabase.serviceRoleKey
  ? createClient(env.supabase.url, env.supabase.serviceRoleKey, supabaseOptions)
  : null;

export const supabaseAnon = createSafeClient();

/**
 * Creates a Supabase client scoped to a user's JWT.
 * Use this for future authenticated dashboard operations.
 */
export function createSupabaseUserClient(accessToken) {
  if (!hasSupabaseConfig) {
    console.error('createSupabaseUserClient called but no Supabase credentials configured');
    return null;
  }
  return createClient(env.supabase.url, env.supabase.anonKey, {
    ...supabaseOptions,
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}