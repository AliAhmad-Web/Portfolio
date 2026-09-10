import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

const FETCH_TIMEOUT_MS = 4000;

function looksLikePlaceholderHost(hostname) {
  return /fake|example|placeholder|your-project-id|localhost/i.test(hostname || '');
}

function supabaseFetch(input, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  if (init.signal) {
    if (init.signal.aborted) {
      controller.abort();
    } else {
      init.signal.addEventListener('abort', () => controller.abort(), { once: true });
    }
  }

  return fetch(input, { ...init, signal: controller.signal }).finally(() => {
    clearTimeout(timeout);
  });
}

const supabaseOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    fetch: async (input, init) => {
      try {
        return await supabaseFetch(input, init);
      } catch (error) {
        const message = error?.cause?.message || error?.message || '';
        const retryable = /ECONNRESET|ECONNREFUSED|ETIMEDOUT|UND_ERR_SOCKET/i.test(
          String(message),
        );
        if (!retryable) throw error;
        return supabaseFetch(input, init);
      }
    },
  },
};

let supabaseHostname = '';
try {
  supabaseHostname = env.supabase.url ? new URL(env.supabase.url).hostname : '';
} catch {
  supabaseHostname = '';
}

const hasSupabaseConfig = Boolean(env.supabase.url && env.supabase.anonKey);
export const isSupabaseReachableConfig =
  hasSupabaseConfig && !looksLikePlaceholderHost(supabaseHostname);

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

export const supabaseAdmin =
  hasValidServiceRole && isSupabaseReachableConfig
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