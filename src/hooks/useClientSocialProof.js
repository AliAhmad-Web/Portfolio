/**
 * useClientSocialProof — Live Satisfied Clients count + latest review avatars.
 * Purpose: Keep the Home proof row in sync with the Customer Reviews photos.
 * Used by: HeroSection.
 */

import { useCallback, useEffect, useState } from 'react';
import { portfolioStatsApi } from '../lib/api';
import {
  SATISFIED_CLIENTS_BASELINE,
  latestReviewAvatars,
  mergeProofAvatars,
  satisfiedClientsCount,
} from '../data/clientAvatars';
import { mergeReviews } from '../data/demoReviews';
import { loadLatestReviews } from '../lib/reviewsLoader';
import { REVIEWS_UPDATED_EVENT, getCachedReviews } from './useCustomerReviews';

export const PUBLIC_STATS_UPDATED_EVENT = 'portfolio:public-stats';

const STATS_CACHE_KEY = 'portfolio:public-stats';
const STATS_TTL_MS = 60 * 1000;

export function notifyPublicStatsUpdated() {
  window.dispatchEvent(new Event(PUBLIC_STATS_UPDATED_EVENT));
}

function avatarsFromReviews(list) {
  const avatars = latestReviewAvatars(mergeReviews(Array.isArray(list) ? list : []));
  return avatars.length ? avatars : mergeProofAvatars([]);
}

function readStatsCache() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STATS_CACHE_KEY) || 'null');
    if (!parsed || !Number.isFinite(Number(parsed.satisfiedClients))) return null;
    if (!parsed.cachedAt || Date.now() - parsed.cachedAt > STATS_TTL_MS) return null;
    return Number(parsed.satisfiedClients);
  } catch {
    return null;
  }
}

function writeStatsCache(satisfiedClients) {
  try {
    sessionStorage.setItem(
      STATS_CACHE_KEY,
      JSON.stringify({ satisfiedClients, cachedAt: Date.now() }),
    );
  } catch {
    /* ignore quota */
  }
}

function initialProof() {
  return {
    satisfiedClients: readStatsCache() ?? SATISFIED_CLIENTS_BASELINE,
    recentClients: avatarsFromReviews(getCachedReviews()),
  };
}

export function useClientSocialProof() {
  const [proof, setProof] = useState(initialProof);

  const applyReviewAvatars = useCallback((list) => {
    const recentClients = avatarsFromReviews(list);
    setProof((prev) => ({ ...prev, recentClients }));
  }, []);

  const load = useCallback(async ({ cacheOnly = false } = {}) => {
    const cachedStats = readStatsCache();
    let recentClients = avatarsFromReviews(getCachedReviews());
    let satisfiedClients = cachedStats ?? SATISFIED_CLIENTS_BASELINE;

    if (!cacheOnly) {
      try {
        recentClients = avatarsFromReviews(await loadLatestReviews());
      } catch {
        /* Keep cached review photos if the reviews API is unreachable. */
      }

      if (cachedStats == null) {
        try {
          const payload = await portfolioStatsApi.get();
          const stats = payload?.data ?? {};
          const approvedTotal = Number(stats.satisfiedClients);
          satisfiedClients =
            Number.isFinite(approvedTotal) && approvedTotal > 0
              ? approvedTotal
              : SATISFIED_CLIENTS_BASELINE;
          writeStatsCache(satisfiedClients);
        } catch {
          satisfiedClients = satisfiedClientsCount(0);
        }
      }
    }

    setProof({ satisfiedClients, recentClients });
  }, []);

  useEffect(() => {
    load();
    const onReviewsUpdated = () => applyReviewAvatars(getCachedReviews());
    const onStatsUpdated = () => {
      try {
        sessionStorage.removeItem(STATS_CACHE_KEY);
      } catch {
        /* ignore */
      }
      load();
    };
    window.addEventListener(PUBLIC_STATS_UPDATED_EVENT, onStatsUpdated);
    window.addEventListener(REVIEWS_UPDATED_EVENT, onReviewsUpdated);
    return () => {
      window.removeEventListener(PUBLIC_STATS_UPDATED_EVENT, onStatsUpdated);
      window.removeEventListener(REVIEWS_UPDATED_EVENT, onReviewsUpdated);
    };
  }, [applyReviewAvatars, load]);

  return proof;
}
