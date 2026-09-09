/**
 * useGitHubStats — Live GitHub metrics for the Stats and About sections.
 * Purpose: Hydrate from cache, refresh from GitHub, and keep local fallbacks.
 * Used by: GitHubStatsSection, AboutSection.
 */

import { useEffect, useState } from 'react';
import { getCachedGithubStats, loadGithubStats } from '../lib/githubStats';
import { getUniqueTechnologiesCount } from '../data/skills';
import { formatExperienceValue } from '../utils/experienceDuration';
import { siteConfig } from '../data/site';

function localFallback() {
  return {
    projects: 0,
    repositories: 0,
    commits: 0,
    comments: 0,
    technologies: getUniqueTechnologiesCount(),
    experience: formatExperienceValue(siteConfig.learningStartDate),
    source: 'local',
  };
}

export function useGitHubStats() {
  const [stats, setStats] = useState(() => getCachedGithubStats() ?? localFallback());
  const [status, setStatus] = useState(() => (getCachedGithubStats() ? 'ready' : 'loading'));

  useEffect(() => {
    let cancelled = false;

    loadGithubStats()
      .then((live) => {
        if (cancelled) return;
        setStats(live);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStats((prev) => ({
          ...localFallback(),
          ...prev,
          technologies: getUniqueTechnologiesCount(),
          experience: formatExperienceValue(siteConfig.learningStartDate),
        }));
        setStatus((prev) => (prev === 'ready' ? 'ready' : 'error'));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, status };
}
