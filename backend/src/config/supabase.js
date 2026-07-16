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

function isLikelyServiceRoleKey(key) {
  try {
    const payload = key.split('.')[1];
    if (!payload) return false;
    const json = Buffer.from(payload, 'base64url').toString('utf8');
    return JSON.parse(json).role === 'service_role';
  } catch {
    return false;
  }
}

const serviceRoleKey = env.supabase.serviceRoleKey;
const hasValidServiceRole =
  Boolean(env.supabase.url && serviceRoleKey) &&
  isLikelyServiceRoleKey(serviceRoleKey);

if (serviceRoleKey && !hasValidServiceRole) {
  console.warn(
    '[supabase] SUPABASE_SERVICE_ROLE_KEY does not look like a service_role key. ' +
      'Admin APIs and seed-admin will fail until you set the correct secret from Project Settings → API.',
  );
}

export const supabaseAdmin = hasValidServiceRole
  ? createClient(env.supabase.url, serviceRoleKey, supabaseOptions)
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