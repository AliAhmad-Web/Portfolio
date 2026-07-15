import { extractBearerToken } from '../utils/jwt.js';
import { ForbiddenError, UnauthorizedError } from '../utils/ApiError.js';
import { authService } from '../services/auth.service.js';

/**
 * Protects routes that require an authenticated user.
 */
export async function authenticate(req, res, next) {
  try {
    const token = extractBearerToken(req);

    if (!token) {
      throw new UnauthorizedError('Authentication token is required');
    }

    const user = await authService.getUserFromToken(token);

    req.user = user;
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
 * Role data must live in app_metadata (not user_metadata).
 */
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user?.app_metadata?.role;

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
