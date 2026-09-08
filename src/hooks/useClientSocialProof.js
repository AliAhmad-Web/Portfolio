/**
 * useClientSocialProof — Live Satisfied Clients count + latest review avatars.
 * Purpose: Keep the Home proof row filled with placeholders, then latest photos.
 * Used by: HeroSection.
 */

import { useCallback, useEffect, useState } from 'react';
import { portfolioStatsApi } from '../lib/api';
import {
  CLIENT_AVATAR_DISPLAY_LIMIT,
  PLACEHOLDER_AVATARS,
  SATISFIED_CLIENTS_BASELINE,
  mergeProofAvatars,
  satisfiedClientsCount,
} from '../data/clientAvatars';

export const PUBLIC_STATS_UPDATED_EVENT = 'portfolio:public-stats';

export function notifyPublicStatsUpdated() {
  window.dispatchEvent(new Event(PUBLIC_STATS_UPDATED_EVENT));
}

const initialProof = {
  satisfiedClients: SATISFIED_CLIENTS_BASELINE,
  recentClients: PLACEHOLDER_AVATARS,
};

export function useClientSocialProof() {
  const [proof, setProof] = useState(initialProof);

  const load = useCallback(async () => {
    try {
      const payload = await portfolioStatsApi.get();
      const stats = payload?.data ?? {};
      const approvedTotal = Number(stats.satisfiedClients);

      setProof({
        satisfiedClients: Number.isFinite(approvedTotal) && approvedTotal > 0
          ? approvedTotal
          : SATISFIED_CLIENTS_BASELINE,
        recentClients: mergeProofAvatars(
          Array.isArray(stats.recentClients)
            ? stats.recentClients.slice(0, CLIENT_AVATAR_DISPLAY_LIMIT)
            : [],
        ),
      });
    } catch {
      setProof({
        satisfiedClients: satisfiedClientsCount(0),
        recentClients: mergeProofAvatars([]),
      });
    }
  }, []);

  useEffect(() => {
    load();
    window.addEventListener(PUBLIC_STATS_UPDATED_EVENT, load);
    return () => window.removeEventListener(PUBLIC_STATS_UPDATED_EVENT, load);
  }, [load]);

  return proof;
}
