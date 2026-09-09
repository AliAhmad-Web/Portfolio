/**
 * useCustomerReviews — Latest public testimonials for Contact.
 * Purpose: Load, cache, and prepend newly submitted reviews.
 * Used by: CustomerReviews.
 */

import { useCallback, useEffect, useState } from 'react';
import { reviewsApi } from '../lib/api';
import {
  getCachedReviews,
  loadLatestReviews,
  notifyReviewsUpdated,
  writeReviewsCache,
} from '../lib/reviewsLoader';

export { getCachedReviews, notifyReviewsUpdated, REVIEWS_UPDATED_EVENT } from '../lib/reviewsLoader';

export function useCustomerReviews() {
  const [reviews, setReviews] = useState(() => getCachedReviews());
  const [status, setStatus] = useState(() => (getCachedReviews().length ? 'ready' : 'loading'));

  const applyLatest = useCallback((next) => {
    const latest = writeReviewsCache(next);
    setReviews(latest);
    setStatus('ready');
    notifyReviewsUpdated();
    return latest;
  }, []);

  const refresh = useCallback(async ({ force = false } = {}) => {
    try {
      const latest = await loadLatestReviews({ force });
      setReviews(latest);
      setStatus('ready');
    } catch {
      setStatus((prev) => (prev === 'ready' ? 'ready' : 'error'));
    }
  }, []);

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
        const statusCode = Number(error?.status);
        if (statusCode >= 400 && statusCode < 500) {
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
