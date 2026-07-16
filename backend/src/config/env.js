/**
 * Environment configuration for the Express backend.
 * Purpose: Load `.env.local`, warn on missing vars, and expose typed `env` object.
 * Used by: all backend services, middleware, and config modules.
 * Secrets must stay in environment files — never hardcode keys here.
 */

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'CLIENT_URL',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_JWT_SECRET',
];

function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }
}

validateEnv();

const clientUrl = process.env.CLIENT_URL?.split(',')[0]?.trim() || 'http://localhost:5173';

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  clientUrl,
  cookieSecret: process.env.COOKIE_SECRET ?? 'change-me-in-production',
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    jwtSecret: process.env.SUPABASE_JWT_SECRET || '',
  },
  jwt: {
    accessTokenCookie: process.env.JWT_ACCESS_COOKIE ?? 'access_token',
    refreshTokenCookie: process.env.JWT_REFRESH_COOKIE ?? 'refresh_token',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
  auth: {
    requireEmailVerification:
      process.env.REQUIRE_EMAIL_VERIFICATION !== 'false',
    verifyEmailRedirectUrl:
      process.env.AUTH_VERIFY_EMAIL_URL ?? `${clientUrl}/auth/verify-email`,
    resetPasswordRedirectUrl:
      process.env.AUTH_RESET_PASSWORD_URL ?? `${clientUrl}/auth/reset-password`,
  },
  recaptcha: {
    secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
    minScore: Number(process.env.RECAPTCHA_MIN_SCORE || 0.5),
    // Explicit false disables verification even if a secret is present
    enabled: process.env.RECAPTCHA_ENABLED !== 'false',
  },
  rateLimit: {
    login: {
      max: Number(process.env.LOGIN_RATE_LIMIT_MAX || 5),
      windowMs: Number(
        process.env.LOGIN_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
      ),
    },
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail:
      process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
    toEmail:
      process.env.RESEND_TO_EMAIL ||
      process.env.ADMIN_EMAIL ||
      '',
    enabled: process.env.RESEND_ENABLED !== 'false',
  },
  admin: {
    email: process.env.ADMIN_EMAIL ?? '',
    password: process.env.ADMIN_PASSWORD ?? '',
    fullName: process.env.ADMIN_FULL_NAME ?? 'Portfolio Admin',
  },
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production',
};