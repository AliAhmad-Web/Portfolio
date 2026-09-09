/**
 * Outbound network defaults for Node runtimes (Vercel / local).
 * Purpose: Prefer IPv4 so Supabase fetches do not fail with "fetch failed"
 * when the host's IPv6 path is broken.
 * Used by: api/index.js, app.js — must load before any Supabase client.
 */

import dns from 'node:dns';

try {
  dns.setDefaultResultOrder('ipv4first');
} catch {
  /* older Node without this API */
}
