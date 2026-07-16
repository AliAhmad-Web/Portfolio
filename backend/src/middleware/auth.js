import { extractBearerToken, verifyAccessToken } from '../utils/jwt.js';
import { ForbiddenError, UnauthorizedError } from '../utils/ApiError.js';
import { authService } from '../services/auth.service.js';
import { profileService } from '../services/profile.service.js';

/**
 * Protects routes that require an authenticated user.
 * Validates the JWT (when secret is configured) and confirms the session
 * with Supabase, then attaches user + profile to the request.
 */
export async function authenticate(req, res, next) {
  try {
    const token = extractBearerToken(req);

    if (!token) {
      throw new UnauthorizedError('Authentication token is required');
    }

    // Local JWT signature check (skipped if SUPABASE_JWT_SECRET is unset)
    verifyAccessToken(token);

    const user = await authService.getUserFromToken(token);
    const profile = await profileService.ensureProfile(user);

    req.user = user;
    req.profile = profile;
    req.accessToken = token;

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Ensures the authenticated user has verified their email.
 */
export function requireVerifiedEmail(req, res, next) {
  if (!req.user?.email_confirmed_at) {
    return next(
      new ForbiddenError('Please verify your email address to access this resource'),
    );
  }

  return next();
}

/**
 * Restricts access to users with specific roles.
 * Prefer profiles.role; fall back to app_metadata.role (never user_metadata).
 */
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    const role =
      req.profile?.role ??
      req.user?.app_metadata?.role ??
      null;

    if (!role || !allowedRoles.includes(role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    return next();
  };
}

/** Shorthand for admin-only routes */
export const requireAdmin = [authenticate, authorize('admin')];

/** Shorthand for any authenticated user */
export const requireAuth = authenticate;
