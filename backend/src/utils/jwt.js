/**
 * JWT helpers for Supabase access tokens.
 * Purpose: Extract bearer/cookie tokens and optionally verify JWT signature locally.
 * Used by: auth middleware and auth controller.
 */

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError } from './ApiError.js';

/** Reads the access token from Authorization header, body, or auth cookie. */
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

/**
 * Locally verifies the Supabase JWT signature when SUPABASE_JWT_SECRET is set.
 * Returns null when the secret is not configured so callers can fall back to
 * supabase.auth.getUser() validation.
 */
export function verifyAccessToken(token) {
  const secret = env.supabase.jwtSecret;

  if (!secret || secret === 'your-jwt-secret') {
    return null;
  }

  try {
    return jwt.verify(token, secret);
  } catch {
    throw new UnauthorizedError('Invalid or expired access token');
  }
}
