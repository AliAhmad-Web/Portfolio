/**
 * GitHub public statistics for the portfolio Stats section.
 * Purpose: Proxy GitHub user + search totals with in-memory cache.
 * Used by: portfolio github-stats route.
 */

import { env } from '../config/env.js';

const GITHUB_API = 'https://api.github.com';
const CACHE_TTL_MS = 5 * 60 * 1000;

let cachedPayload = null;
let cachedAt = 0;

function toCount(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

function githubHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'AliAhmad-Web-Portfolio',
  };

  if (env.github.token) {
    headers.Authorization = `Bearer ${env.github.token}`;
  }

  return headers;
}

async function githubJson(path) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: githubHeaders(),
  });

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`GitHub ${path} failed (${response.status})`);
    error.status = response.status;
    error.body = body.slice(0, 300);
    throw error;
  }

  return response.json();
}

async function searchTotal(path) {
  const payload = await githubJson(path);
  return toCount(payload?.total_count);
}

async function fetchGithubStats() {
  const username = env.github.username;
  const user = await githubJson(`/users/${encodeURIComponent(username)}`);
  const repositories = toCount(user.public_repos);

  const [commitsResult, commentsResult] = await Promise.allSettled([
    searchTotal(`/search/commits?q=${encodeURIComponent(`author:${username}`)}&per_page=1`),
    searchTotal(`/search/issues?q=${encodeURIComponent(`commenter:${username}`)}&per_page=1`),
  ]);

  return {
    username,
    repositories,
    commits: commitsResult.status === 'fulfilled' ? commitsResult.value : 0,
    comments: commentsResult.status === 'fulfilled' ? commentsResult.value : 0,
    createdAt: user.created_at || null,
    fetchedAt: new Date().toISOString(),
  };
}

export const githubStatsService = {
  async getPublicGithubStats() {
    const now = Date.now();
    if (cachedPayload && now - cachedAt < CACHE_TTL_MS) {
      return cachedPayload;
    }

    try {
      const stats = await fetchGithubStats();
      cachedPayload = stats;
      cachedAt = now;
      return stats;
    } catch (error) {
      if (cachedPayload) return cachedPayload;
      throw error;
    }
  },
};
