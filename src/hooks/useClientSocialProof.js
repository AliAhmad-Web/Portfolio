/**
 * useClientSocialProof — Live Satisfied Clients count + latest review avatars.
 * Purpose: Keep the Home proof row in sync with the Customer Reviews photos.
 * Used by: HeroSection.
 */

import { useCallback, useEffect, useState } from 'react';
import { portfolioStatsApi, reviewsApi } from '../lib/api';
import {
  SATISFIED_CLIENTS_BASELINE,
  latestReviewAvatars,
  mergeProofAvatars,
  satisfiedClientsCount,
} from '../data/clientAvatars';
import { mergeReviews } from '../data/demoReviews';
import { REVIEWS_UPDATED_EVENT, getCachedReviews } from './useCustomerReviews';

export const PUBLIC_STATS_UPDATED_EVENT = 'portfolio:public-stats';

export function notifyPublicStatsUpdated() {
  window.dispatchEvent(new Event(PUBLIC_STATS_UPDATED_EVENT));
}

function avatarsFromReviews(list) {
  const avatars = latestReviewAvatars(mergeReviews(Array.isArray(list) ? list : []));
  return avatars.length ? avatars : mergeProofAvatars([]);
}

function initialProof() {
  return {
    satisfiedClients: SATISFIED_CLIENTS_BASELINE,
    recentClients: avatarsFromReviews(getCachedReviews()),
  };
}

export function useClientSocialProof() {
  const [proof, setProof] = useState(initialProof);

  const load = useCallback(async () => {
    let recentClients = avatarsFromReviews(getCachedReviews());
    let satisfiedClients = SATISFIED_CLIENTS_BASELINE;

    try {
      const payload = await reviewsApi.list();
      recentClients = avatarsFromReviews(payload?.data?.reviews ?? []);
    } catch {
      /* Keep cached review photos if the reviews API is unreachable. */
    }

    try {
      const payload = await portfolioStatsApi.get();
      const stats = payload?.data ?? {};
      const approvedTotal = Number(stats.satisfiedClients);
      satisfiedClients =
        Number.isFinite(approvedTotal) && approvedTotal > 0
          ? approvedTotal
          : SATISFIED_CLIENTS_BASELINE;
    } catch {
      satisfiedClients = satisfiedClientsCount(0);
    }

    setProof({ satisfiedClients, recentClients });
  }, []);

  useEffect(() => {
    load();
    window.addEventListener(PUBLIC_STATS_UPDATED_EVENT, load);
    window.addEventListener(REVIEWS_UPDATED_EVENT, load);
    return () => {
      window.removeEventListener(PUBLIC_STATS_UPDATED_EVENT, load);
      window.removeEventListener(REVIEWS_UPDATED_EVENT, load);
    };
  }, [load]);

  return proof;
}
