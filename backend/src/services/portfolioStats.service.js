/**
 * Public Home social-proof statistics.
 * Purpose: Satisfied Clients starts at 8 and grows with approved reviews.
 *          Latest 4 profile photos come from the Customer Reviews system.
 * Used by: portfolioStats.controller.js
 */

import { supabaseAdmin } from '../config/supabase.js';
import { latestReviewAvatars, satisfiedClientsCount } from '../../../src/data/clientAvatars.js';
import { reviewsService } from './reviews.service.js';

const CACHE_TTL_MS = 20 * 1000;
const APPROVED_STATUSES = new Set(['resolved', 'completed']);
let cachedPayload = null;
let cachedAt = 0;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

async function loadApprovedClientCount() {
  if (!supabaseAdmin) {
    return satisfiedClientsCount(0);
  }

  const { data, error } = await supabaseAdmin
    .from('contact_messages')
    .select('email, status')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[portfolio-stats] Failed to load client reviews:', error.message);
    return satisfiedClientsCount(0);
  }

  const approvedEmails = new Set();
  for (const row of data ?? []) {
    const email = normalizeEmail(row?.email);
    if (email && APPROVED_STATUSES.has(String(row?.status || '').toLowerCase())) {
      approvedEmails.add(email);
    }
  }

  return satisfiedClientsCount(approvedEmails.size);
}

async function loadLatestReviewAvatars() {
  try {
    const reviews = await reviewsService.listLatest();
    return latestReviewAvatars(reviews);
  } catch (error) {
    console.warn('[portfolio-stats] Failed to load review avatars:', error.message);
    return [];
  }
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

    const [satisfiedClients, recentClients] = await Promise.all([
      loadApprovedClientCount(),
      loadLatestReviewAvatars(),
    ]);

    cachedPayload = {
      satisfiedClients,
      recentClients,
      clientSatisfaction: 100,
    };
    cachedAt = Date.now();
    return cachedPayload;
  },
};
