import { env } from '../config/env.js';

function buildCookieOptions(maxAgeSeconds) {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? 'strict' : 'lax',
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
    sameSite: env.isProduction ? 'strict' : 'lax',
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
