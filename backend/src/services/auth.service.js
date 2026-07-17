import {
  supabaseAnon,
  supabaseAdmin,
  createSupabaseUserClient,
} from '../config/supabase.js';
import { env } from '../config/env.js';
import {
  ApiError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  BadRequestError,
} from '../utils/ApiError.js';
import { sanitizeUser, formatSession } from '../utils/user.js';
import { profileService } from './profile.service.js';

function mapSupabaseAuthError(error) {
  const message = error.message ?? 'Authentication failed';
  const normalized = message.toLowerCase();

  if (
    normalized.includes('invalid login credentials') ||
    normalized.includes('invalid refresh token')
  ) {
    return new UnauthorizedError('Invalid email or password');
  }

  if (normalized.includes('email not confirmed')) {
    return new ForbiddenError(
      'Please verify your email address before signing in',
    );
  }

  if (
    normalized.includes('user already registered') ||
    normalized.includes('already been registered')
  ) {
    return new ConflictError('An account with this email already exists');
  }

  if (normalized.includes('password should be at least')) {
    return new BadRequestError(message);
  }

  if (normalized.includes('signup is disabled')) {
    return new ForbiddenError('New registrations are currently disabled');
  }

  if (normalized.includes('email rate limit exceeded')) {
    return new ApiError(429, 'Too many requests. Please try again later');
  }

  return new ApiError(error.status ?? 400, message);
}

async function buildAuthPayload(user, session) {
  let profile = null;

  try {
    profile = await profileService.ensureProfile(user);
  } catch (error) {
    // Profiles table may not exist yet during initial setup
    console.warn('[auth] profile sync skipped:', error.message);
  }

  return {
    user: sanitizeUser(user, profile),
    session: session ? formatSession(session) : null,
  };
}

function assertEmailVerified(user) {
  if (env.auth.requireEmailVerification && !user.email_confirmed_at) {
    throw new ForbiddenError(
      'Please verify your email address before signing in',
    );
  }
}

export const authService = {
  async signUp({ email, password, fullName }) {
    const { data, error } = await supabaseAnon.auth.signUp({
      email,
      password,
      options: {
        data: fullName ? { full_name: fullName } : undefined,
        emailRedirectTo: env.auth.verifyEmailRedirectUrl,
      },
    });

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    const needsEmailVerification = !data.session;

    return {
      ...(await buildAuthPayload(data.user, data.session)),
      needsEmailVerification,
    };
  },

  async signIn({ email, password }) {
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    assertEmailVerified(data.user);

    return buildAuthPayload(data.user, data.session);
  },

  async signOut(accessToken) {
    const client = createSupabaseUserClient(accessToken);

    if (!client) {
      return { signedOut: true };
    }

    const { error } = await client.auth.signOut();

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    return { signedOut: true };
  },

  async forgotPassword(email, { redirectTo } = {}) {
    const { error } = await supabaseAnon.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || env.auth.resetPasswordRedirectUrl,
    });

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    return { emailSent: true };
  },

  async resetPassword(accessToken, password) {
    const client = createSupabaseUserClient(accessToken);

    if (!client) {
      throw new ApiError(500, 'Supabase is not configured');
    }

    const { data, error } = await client.auth.updateUser({ password });

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    return buildAuthPayload(data.user, data.session);
  },

  async getUserFromToken(accessToken) {
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin.auth.getUser(accessToken);

      if (!error && data.user) {
        return data.user;
      }
    }

    const { data, error } = await supabaseAnon.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new UnauthorizedError('Invalid or expired session');
    }

    return data.user;
  },

  async getCurrentUser(accessToken) {
    const user = await this.getUserFromToken(accessToken);
    const profile = await profileService.ensureProfile(user);
    return sanitizeUser(user, profile);
  },

  async refreshSession(refreshToken) {
    const { data, error } = await supabaseAnon.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session || !data.user) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    assertEmailVerified(data.user);

    return buildAuthPayload(data.user, data.session);
  },

  async resendVerificationEmail(email) {
    const { error } = await supabaseAnon.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: env.auth.verifyEmailRedirectUrl,
      },
    });

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    return { emailSent: true };
  },

  async verifyEmail(accessToken) {
    const user = await this.getUserFromToken(accessToken);

    if (!user.email_confirmed_at) {
      throw new ForbiddenError('Email address is not verified yet');
    }

    const profile = await profileService.ensureProfile(user);
    return sanitizeUser(user, profile);
  },
};
