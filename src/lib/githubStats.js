/**
 * Live GitHub statistics loader.
 * Purpose: Read public GitHub profile/search data with cache and fallbacks.
 * Used by: useGitHubStats. Prefers the portfolio API, then GitHub.com.
 */

import { API_BASE_URL, getGithubUsername, siteConfig } from '../data/site';
import { getUniqueTechnologiesCount } from '../data/skills';
import { formatExperienceValue } from '../utils/experienceDuration';

const CACHE_KEY = 'portfolio:github-stats';
const CACHE_TTL_MS = 5 * 60 * 1000;
const GITHUB_API = 'https://api.github.com';

let inflight = null;

function githubHeaders() {
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

function toCount(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

function buildLocalStats(github = {}) {
  const repositories = toCount(github.repositories);
  return {
    projects: repositories,
    repositories,
    commits: toCount(github.commits),
    comments: toCount(github.comments),
    technologies: getUniqueTechnologiesCount(),
    experience: formatExperienceValue(siteConfig.learningStartDate),
    username: github.username || getGithubUsername(),
    source: github.source || 'local',
  };
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(github) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        ...github,
        cachedAt: Date.now(),
      }),
    );
  } catch {
    /* ignore quota / private mode */
  }
}

function isFresh(cache) {
  return Boolean(cache?.cachedAt) && Date.now() - cache.cachedAt < CACHE_TTL_MS;
}

async function searchTotalCount(path) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: githubHeaders(),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    throw new Error(`GitHub search failed (${response.status})`);
  }
  const payload = await response.json();
  return toCount(payload?.total_count);
}

async function fetchGithubDirect() {
  const username = getGithubUsername();
  const userRes = await fetch(`${GITHUB_API}/users/${encodeURIComponent(username)}`, {
    headers: githubHeaders(),
    signal: AbortSignal.timeout(8000),
  });

  if (!userRes.ok) {
    throw new Error(`GitHub profile failed (${userRes.status})`);
  }

  const user = await userRes.json();
  const repositories = toCount(user.public_repos);

  const [commits, comments] = await Promise.allSettled([
    searchTotalCount(`/search/commits?q=${encodeURIComponent(`author:${username}`)}&per_page=1`),
    searchTotalCount(`/search/issues?q=${encodeURIComponent(`commenter:${username}`)}&per_page=1`),
  ]);

  return {
    username,
    repositories,
    commits: commits.status === 'fulfilled' ? commits.value : 0,
    comments: comments.status === 'fulfilled' ? comments.value : 0,
    createdAt: user.created_at || null,
    source: 'github',
  };
}

async function fetchViaBackend() {
  const response = await fetch(`${API_BASE_URL}/portfolio/github-stats`, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
    signal: AbortSignal.timeout(4000),
  });

  if (!response.ok) {
    throw new Error(`Portfolio GitHub stats failed (${response.status})`);
  }

  const payload = await response.json();
  const data = payload?.data;
  if (!data || !Number.isFinite(Number(data.repositories))) {
    throw new Error('Invalid GitHub stats payload');
  }
  return {
    username: data.username || getGithubUsername(),
    repositories: toCount(data.repositories),
    commits: toCount(data.commits),
    comments: toCount(data.comments),
    createdAt: data.createdAt || null,
    source: 'api',
  };
}

async function fetchLiveGithub() {
  try {
    return await fetchViaBackend();
  } catch {
    return fetchGithubDirect();
  }
}

export function getCachedGithubStats() {
  const cache = readCache();
  if (!cache) return null;
  return buildLocalStats(cache);
}

export async function loadGithubStats() {
  if (inflight) return inflight;

  inflight = (async () => {
    const cache = readCache();
    if (isFresh(cache)) {
      return buildLocalStats(cache);
    }

    try {
      const live = await fetchLiveGithub();
      writeCache(live);
      return buildLocalStats(live);
    } catch (error) {
      if (cache) return buildLocalStats(cache);
      throw error;
    }
  })().finally(() => {
    inflight = null;
  });

  return inflight;
}
