/**
 * Customer reviews persistence for the Contact testimonials strip.
 * Purpose: Store and return the latest public reviews.
 * Used by: reviews.controller.js
 */

import { supabaseAdmin } from '../config/supabase.js';
import {
  EXISTING_REVIEW,
  MAX_REVIEWS,
  mergeReviews,
} from '../../../src/data/demoReviews.js';

const REVIEW_SELECT = 'id, name, location, rating, comment, avatar_url, service, created_at';

const memoryReviews = [
  {
    id: EXISTING_REVIEW.id,
    name: EXISTING_REVIEW.name,
    location: EXISTING_REVIEW.location,
    rating: EXISTING_REVIEW.rating,
    comment: EXISTING_REVIEW.comment,
    avatar_url: EXISTING_REVIEW.avatarUrl,
    service: EXISTING_REVIEW.service,
    created_at: EXISTING_REVIEW.createdAt,
  },
];

function formatReview(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    rating: Number(row.rating),
    comment: row.comment,
    avatarUrl: row.avatar_url || '',
    service: row.service || 'Web Development',
    createdAt: row.created_at,
  };
}

function storedMemory() {
  return memoryReviews
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, MAX_REVIEWS)
    .map(formatReview);
}

function memoryList() {
  return mergeReviews(storedMemory());
}

function trimMemory() {
  memoryReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  if (memoryReviews.length > MAX_REVIEWS) {
    memoryReviews.length = MAX_REVIEWS;
  }
}

async function loadStored() {
  if (!supabaseAdmin) {
    return storedMemory();
  }

  const { data, error } = await supabaseAdmin
    .from('customer_reviews')
    .select(REVIEW_SELECT)
    .order('created_at', { ascending: false })
    .limit(MAX_REVIEWS);

  if (error) {
    console.warn('[reviews] Falling back to memory store:', error.message);
    return storedMemory();
  }

  return (data ?? []).map(formatReview);
}

async function trimSupabase() {
  if (!supabaseAdmin) return;

  const { data, error } = await supabaseAdmin
    .from('customer_reviews')
    .select('id, created_at')
    .order('created_at', { ascending: false });

  if (error || !data?.length) return;

  const extraIds = data.slice(MAX_REVIEWS).map((row) => row.id);
  if (!extraIds.length) return;

  await supabaseAdmin.from('customer_reviews').delete().in('id', extraIds);
}

export const reviewsService = {
  maxVisible: MAX_REVIEWS,

  async listLatest() {
    const stored = await loadStored();
    return mergeReviews(stored);
  },

  async createReview({ name, location, rating, comment, avatarUrl, service }) {
    const payload = {
      name,
      location,
      rating,
      comment,
      avatar_url: avatarUrl || null,
      service: service || 'Web Development',
    };

    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('customer_reviews')
        .insert(payload)
        .select(REVIEW_SELECT)
        .single();

      if (!error && data) {
        await trimSupabase();
        const latest = await this.listLatest();
        return { review: formatReview(data), latest };
      }

      console.warn('[reviews] Insert failed, using memory store:', error?.message);
    }

    const row = {
      id: `local-${Date.now()}`,
      name: payload.name,
      location: payload.location,
      rating: payload.rating,
      comment: payload.comment,
      avatar_url: payload.avatar_url,
      service: payload.service,
      created_at: new Date().toISOString(),
    };
    memoryReviews.unshift(row);
    trimMemory();

    return { review: formatReview(row), latest: memoryList() };
  },
};
