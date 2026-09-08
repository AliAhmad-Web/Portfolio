/**
 * Home proof-row avatars and Satisfied Clients helpers.
 * Purpose: Always fill 4 circular slots; swap in live customer photos when present.
 * Used by: HeroSection and GET /api/v1/portfolio/stats.
 */

export const CLIENT_AVATAR_SLOTS = ['is-a', 'is-b', 'is-c', 'is-d'];
export const CLIENT_AVATAR_DISPLAY_LIMIT = CLIENT_AVATAR_SLOTS.length;
export const SATISFIED_CLIENTS_BASELINE = 8;

export const PLACEHOLDER_AVATARS = [
  { id: 'placeholder-is-a', src: '/clients/placeholder-a.jpg' },
  { id: 'placeholder-is-b', src: '/clients/placeholder-b.jpg' },
  { id: 'placeholder-is-c', src: '/clients/placeholder-c.jpg' },
  { id: 'placeholder-is-d', src: '/clients/placeholder-d.jpg' },
];

export function publicAvatarSeed(value) {
  const input = String(value || '').trim().toLowerCase();
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function isUsableImageSrc(src) {
  const value = String(src || '').trim();
  return (
    value.startsWith('data:image/') ||
    value.startsWith('/') ||
    /^https?:\/\//i.test(value)
  );
}

export function satisfiedClientsCount(approvedCount) {
  const extra = Number(approvedCount);
  const safe = Number.isFinite(extra) && extra > 0 ? Math.floor(extra) : 0;
  return SATISFIED_CLIENTS_BASELINE + safe;
}

export function mergeProofAvatars(latestCustomerImages = []) {
  const merged = [];
  const used = new Set();

  for (const avatar of latestCustomerImages) {
    if (!avatar?.src || !isUsableImageSrc(avatar.src)) continue;
    const id = avatar.id || avatar.src;
    if (used.has(id) || used.has(avatar.src)) continue;
    used.add(id);
    used.add(avatar.src);
    merged.push({ id, src: avatar.src });
    if (merged.length >= CLIENT_AVATAR_DISPLAY_LIMIT) break;
  }

  for (const placeholder of PLACEHOLDER_AVATARS) {
    if (merged.length >= CLIENT_AVATAR_DISPLAY_LIMIT) break;
    merged.push(placeholder);
  }

  return merged.slice(0, CLIENT_AVATAR_DISPLAY_LIMIT);
}
