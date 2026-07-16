import { env } from '../config/env.js';

/**
 * Auth cookie options.
 * In production the SPA (Vercel) and API (Render/Railway) are on different
 * origins, so cookies must use SameSite=None + Secure to be accepted cross-site.
 * Primary auth still uses Bearer tokens in sessionStorage; cookies are a fallback.
 */
function buildCookieOptions(maxAgeSeconds) {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: maxAgeSeconds * 1000,
  };
}

export function setAuthCookies(res, session) {
  const accessMaxAge = session.expires_in ?? 3600;
  const refreshMaxAge = 60 * 60 * 24 * 30;

  res.cookie(
    env.jwt.accessTokenCookie,
    session.access_token,
    buildCookieOptions(accessMaxAge),
  );

  res.cookie(
    env.jwt.refreshTokenCookie,
    session.refresh_token,
    buildCookieOptions(refreshMaxAge),
  );
}

export function clearAuthCookies(res) {
  const clearOptions = {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? 'none' : 'lax',
    path: '/',
  };

  res.clearCookie(env.jwt.accessTokenCookie, clearOptions);
  res.clearCookie(env.jwt.refreshTokenCookie, clearOptions);
}

export function extractRefreshToken(req) {
  if (req.body?.refreshToken) {
    return req.body.refreshToken;
  }

  return req.cookies?.[env.jwt.refreshTokenCookie] ?? null;
}
