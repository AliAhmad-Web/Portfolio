import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError } from './ApiError.js';

export function extractBearerToken(req) {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  if (req.body?.accessToken) {
    return req.body.accessToken;
  }

  return req.cookies?.[env.jwt.accessTokenCookie] ?? null;
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, env.supabase.jwtSecret);
  } catch {
    throw new UnauthorizedError('Invalid or expired access token');
  }
}

export function signAccessToken(payload, options = {}) {
  return jwt.sign(payload, env.supabase.jwtSecret, {
    expiresIn: env.jwt.expiresIn,
    ...options,
  });
}
