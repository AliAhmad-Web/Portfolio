import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

const FETCH_TIMEOUT_MS = 20000;

function looksLikePlaceholderHost(hostname) {
  return /(?:^|\.)example\.supabase\.co$|your-project-id|placeholder|localhost/i.test(
    hostname || '',
  );
}

function mergeAbortSignals(timeoutSignal, incomingSignal) {
  if (!incomingSignal || incomingSignal.aborted) {
    return timeoutSignal;
  }

  if (typeof AbortSignal.any === 'function') {
    return AbortSignal.any([timeoutSignal, incomingSignal]);
  }

  const controller = new AbortController();
  const abort = () => controller.abort();
  timeoutSignal.addEventListener('abort', abort, { once: true });
  incomingSignal.addEventListener('abort', abort, { once: true });
  return controller.signal;
}

function supabaseFetch(input, init = {}) {
  const { signal: incomingSignal, ...rest } = init;
  const timeoutSignal =
    typeof AbortSignal.timeout === 'function'
      ? AbortSignal.timeout(FETCH_TIMEOUT_MS)
      : undefined;
  const signal = timeoutSignal
    ? mergeAbortSignals(timeoutSignal, incomingSignal)
    : incomingSignal && !incomingSignal.aborted
      ? incomingSignal
      : undefined;

  return fetch(input, {
    ...rest,
    signal,
  });
}

const supabaseOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    fetch: async (input, init = {}) => {
      try {
        return await supabaseFetch(input, init);
      } catch (error) {
        const message = error?.cause?.message || error?.message || '';
        const aborted =
          error?.name === 'AbortError' ||
          init.signal?.aborted ||
          /aborted/i.test(String(message));
        const retryable = /ECONNRESET|ECONNREFUSED|UND_ERR_SOCKET/i.test(
          String(message),
        );

        if (aborted || !retryable) throw error;

        return supabaseFetch(input, { ...init, signal: undefined });
      }
    },
  },
};

const supabaseHostname = env.supabase.url ? (() => {
  try {
    return new URL(env.supabase.url).hostname;
  } catch {
    return '';
  }
})() : '';

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
      ...supabaseOptions.global,
      headers: {
        ...(supabaseOptions.global?.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}