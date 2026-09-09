/**
 * useCustomerReviews — Latest public testimonials for Contact.
 * Purpose: Load, cache, and prepend newly submitted reviews.
 * Used by: CustomerReviews.
 */

import { useCallback, useEffect, useState } from 'react';
import { reviewsApi } from '../lib/api';
import { MAX_REVIEWS, mergeReviews } from '../data/demoReviews';

const CACHE_KEY = 'portfolio:customer-reviews';
export const REVIEWS_UPDATED_EVENT = 'portfolio:customer-reviews-updated';

export function notifyReviewsUpdated() {
  window.dispatchEvent(new Event(REVIEWS_UPDATED_EVENT));
}

export function getCachedReviews() {
  return readCache();
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return mergeReviews(Array.isArray(parsed) ? parsed : []);
  } catch {
    return mergeReviews([]);
  }
}

function writeCache(reviews) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(reviews.slice(0, MAX_REVIEWS)));
  } catch {
    /* ignore quota */
  }
}

export function useCustomerReviews() {
  const [reviews, setReviews] = useState(() => readCache());
  const [status, setStatus] = useState(() => (readCache().length ? 'ready' : 'loading'));

  const applyLatest = useCallback((next) => {
    const latest = mergeReviews(Array.isArray(next) ? next : []);
    setReviews(latest);
    writeCache(latest);
    setStatus('ready');
    notifyReviewsUpdated();
    return latest;
  }, []);

  const refresh = useCallback(async () => {
    try {
      const payload = await reviewsApi.list();
      applyLatest(payload?.data?.reviews ?? []);
    } catch {
      setStatus((prev) => (prev === 'ready' ? 'ready' : 'error'));
    }
  }, [applyLatest]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const submitReview = useCallback(
    async (payload) => {
      try {
        const result = await reviewsApi.submit(payload);
        const latest = result?.data?.reviews;
        if (Array.isArray(latest)) {
          return applyLatest(latest);
        }
        if (result?.data?.review) {
          return applyLatest([result.data.review, ...reviews]);
        }
      } catch (error) {
        const status = Number(error?.status);
        if (status >= 400 && status < 500) {
          throw error;
        }
      }

      const local = {
        id: `local-${Date.now()}`,
        name: payload.name,
        location: payload.location,
        rating: payload.rating,
        comment: payload.comment,
        avatarUrl: payload.avatarUrl || '',
        service: payload.service || 'Web Development',
        createdAt: new Date().toISOString(),
      };
      return applyLatest([local, ...reviews]);
    },
    [applyLatest, reviews],
  );

  return { reviews, status, submitReview, refresh };
}
