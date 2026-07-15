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
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }
}

validateEnv();

const clientUrl = process.env.CLIENT_URL.split(',')[0].trim();

export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  clientUrl,
  cookieSecret: process.env.COOKIE_SECRET ?? 'change-me-in-production',
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
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
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};
