/**
 * Shared customer-reviews loader.
 * Purpose: One in-flight GET, hydrate from cache, and skip refetch while fresh.
 * Used by: useCustomerReviews, useClientSocialProof.
 */

import { reviewsApi } from './api';
import { MAX_REVIEWS, mergeReviews } from '../data/demoReviews';

export const REVIEWS_CACHE_KEY = 'portfolio:customer-reviews';
export const REVIEWS_UPDATED_EVENT = 'portfolio:customer-reviews-updated';

const CACHE_TTL_MS = 2 * 60 * 1000;

let inflight = null;

export function notifyReviewsUpdated() {
  window.dispatchEvent(new Event(REVIEWS_UPDATED_EVENT));
}

function parseCache(raw) {
  if (!raw) return { reviews: mergeReviews([]), cachedAt: 0 };
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    return { reviews: mergeReviews(parsed), cachedAt: 0 };
  }
  if (parsed && Array.isArray(parsed.reviews)) {
    return {
      reviews: mergeReviews(parsed.reviews),
      cachedAt: Number(parsed.cachedAt) || 0,
    };
  }
  return { reviews: mergeReviews([]), cachedAt: 0 };
}

export function getCachedReviews() {
  try {
    return parseCache(localStorage.getItem(REVIEWS_CACHE_KEY)).reviews;
  } catch {
    return mergeReviews([]);
  }
}

function readCacheMeta() {
  try {
    return parseCache(localStorage.getItem(REVIEWS_CACHE_KEY));
  } catch {
    return { reviews: mergeReviews([]), cachedAt: 0 };
  }
}

export function writeReviewsCache(reviews) {
  const latest = mergeReviews(Array.isArray(reviews) ? reviews : []);
  try {
    localStorage.setItem(
      REVIEWS_CACHE_KEY,
      JSON.stringify({
        v: 1,
        cachedAt: Date.now(),
        reviews: latest.slice(0, MAX_REVIEWS),
      }),
    );
  } catch {
    /* ignore quota */
  }
  return latest;
}

function isFresh(cachedAt) {
  return Boolean(cachedAt) && Date.now() - cachedAt < CACHE_TTL_MS;
}

export async function loadLatestReviews({ force = false } = {}) {
  const cached = readCacheMeta();
  if (!force && cached.reviews.length && isFresh(cached.cachedAt)) {
    return cached.reviews;
  }

  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const payload = await reviewsApi.list();
      const latest = writeReviewsCache(payload?.data?.reviews ?? cached.reviews);
      return latest;
    } catch (error) {
      if (cached.reviews.length) return cached.reviews;
      throw error;
    }
  })().finally(() => {
    inflight = null;
  });

  return inflight;
}
