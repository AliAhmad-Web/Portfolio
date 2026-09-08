/**
 * Public Home social-proof statistics.
 * Purpose: Satisfied Clients starts at 8 and grows with approved reviews.
 *          Latest 4 customer profile photos replace placeholders when present.
 * Used by: portfolioStats.controller.js
 */

import { supabaseAdmin } from '../config/supabase.js';
import {
  CLIENT_AVATAR_DISPLAY_LIMIT,
  isUsableImageSrc,
  publicAvatarSeed,
  satisfiedClientsCount,
} from '../../../src/data/clientAvatars.js';

const CACHE_TTL_MS = 20 * 1000;
const APPROVED_STATUSES = new Set(['resolved', 'completed']);
let cachedPayload = null;
let cachedAt = 0;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function uniqueNewestCustomers(rows) {
  const seen = new Set();
  const unique = [];

  for (const row of rows) {
    const email = normalizeEmail(row?.email);
    if (!email || seen.has(email)) continue;
    seen.add(email);
    unique.push({
      email,
      name: String(row?.name || '').trim(),
      status: String(row?.status || '').trim().toLowerCase(),
      avatarUrl: String(row?.avatar_url || '').trim(),
    });
  }

  return unique;
}

async function avatarMapForEmails(emails) {
  if (!supabaseAdmin || emails.length === 0) return new Map();

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('email, avatar_url')
    .in('email', emails);

  if (error) {
    console.warn('[portfolio-stats] Failed to load profile avatars:', error.message);
    return new Map();
  }

  const map = new Map();
  for (const row of data ?? []) {
    const email = normalizeEmail(row?.email);
    const src = String(row?.avatar_url || '').trim();
    if (email && isUsableImageSrc(src)) {
      map.set(email, src);
    }
  }
  return map;
}

async function loadSatisfiedClients() {
  if (!supabaseAdmin) {
    return {
      satisfiedClients: satisfiedClientsCount(0),
      recentClients: [],
    };
  }

  const { data, error } = await supabaseAdmin
    .from('contact_messages')
    .select('name, email, status, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[portfolio-stats] Failed to load client reviews:', error.message);
    return {
      satisfiedClients: satisfiedClientsCount(0),
      recentClients: [],
    };
  }

  const rows = data ?? [];
  const approvedEmails = new Set();
  for (const row of rows) {
    const email = normalizeEmail(row?.email);
    if (email && APPROVED_STATUSES.has(String(row?.status || '').toLowerCase())) {
      approvedEmails.add(email);
    }
  }

  const customers = uniqueNewestCustomers(rows);
  const profileAvatars = await avatarMapForEmails(customers.map((item) => item.email));
  const recentClients = [];

  for (const customer of customers) {
    const src = profileAvatars.get(customer.email) || customer.avatarUrl;
    if (!isUsableImageSrc(src)) continue;
    recentClients.push({
      id: publicAvatarSeed(customer.email),
      src,
    });
    if (recentClients.length >= CLIENT_AVATAR_DISPLAY_LIMIT) break;
  }

  return {
    satisfiedClients: satisfiedClientsCount(approvedEmails.size),
    recentClients,
  };
}

export function invalidatePortfolioStatsCache() {
  cachedPayload = null;
  cachedAt = 0;
}

export const portfolioStatsService = {
  async getPublicStats() {
    const now = Date.now();
    if (cachedPayload && now - cachedAt < CACHE_TTL_MS) {
      return cachedPayload;
    }

    const clients = await loadSatisfiedClients();
    cachedPayload = {
      satisfiedClients: clients.satisfiedClients,
      recentClients: clients.recentClients,
      clientSatisfaction: 100,
    };
    cachedAt = Date.now();
    return cachedPayload;
  },
};
