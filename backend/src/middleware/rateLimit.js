import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

function clientKey(req) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const email = String(req.body?.email || '')
    .trim()
    .toLowerCase();

  // Scope by IP + email so one shared network does not lock out every user
  return email ? `${ip}:${email}` : ip;
}

function formatWindowLabel(windowMs) {
  const minutes = Math.round(windowMs / 60_000);
  if (minutes < 1) {
    return 'a short while';
  }
  if (minutes === 1) {
    return '1 minute';
  }
  return `${minutes} minutes`;
}

/**
 * Counts failed login attempts only (HTTP status >= 400).
 * Successful logins do not consume the budget.
 */
export const loginRateLimiter = rateLimit({
  windowMs: env.rateLimit.login.windowMs,
  max: env.rateLimit.login.max,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: clientKey,
  validate: {
    xForwardedForHeader: false,
    keyGeneratorIpFallback: false,
  },
  handler: (_req, res) => {
    const retryAfterSeconds = Math.ceil(env.rateLimit.login.windowMs / 1000);
    const windowLabel = formatWindowLabel(env.rateLimit.login.windowMs);

    res.setHeader('Retry-After', String(retryAfterSeconds));
    res.status(429).json({
      success: false,
      message: `Too many failed login attempts. Please try again in ${windowLabel}.`,
      errors: {
        retryAfterSeconds,
        limit: env.rateLimit.login.max,
        windowMs: env.rateLimit.login.windowMs,
      },
    });
  },
});
