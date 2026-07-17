import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse, sendResponse } from '../utils/ApiResponse.js';
import { authService } from '../services/auth.service.js';
import {
  setAuthCookies,
  clearAuthCookies,
  extractRefreshToken,
} from '../utils/cookies.js';
import { extractBearerToken } from '../utils/jwt.js';
import { UnauthorizedError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

/**
 * Prefer the browser Origin (Vercel / local) for auth email redirects so
 * password-reset and verify links never fall back to a stale localhost URL.
 */
function resolveAuthRedirectBase(req) {
  const originHeader = req.get('origin');
  if (originHeader) {
    try {
      const origin = new URL(originHeader).origin;
      const allowed = new Set([
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        ...String(process.env.CLIENT_URL || '')
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean),
      ]);

      if (allowed.has(origin) || origin.endsWith('.vercel.app')) {
        return origin;
      }
    } catch {
      // ignore invalid Origin
    }
  }

  return env.clientUrl;
}
function respondWithAuth(res, message, payload, statusCode = 200) {
  if (payload.session) {
    setAuthCookies(res, {
      access_token: payload.session.accessToken,
      refresh_token: payload.session.refreshToken,
      expires_in: payload.session.expiresIn,
    });
  }

  const response =
    statusCode === 201
      ? ApiResponse.created(message, payload)
      : ApiResponse.ok(message, payload);

  sendResponse(res, response);
}

export const signUp = asyncHandler(async (req, res) => {
  const result = await authService.signUp(req.body);

  const message = result.needsEmailVerification
    ? 'Account created. Please check your email to verify your account'
    : 'Account created successfully';

  if (result.session) {
    respondWithAuth(res, message, {
      user: result.user,
      session: result.session,
      needsEmailVerification: result.needsEmailVerification,
    }, 201);
    return;
  }

  sendResponse(
    res,
    ApiResponse.created(message, {
      user: result.user,
      session: null,
      needsEmailVerification: result.needsEmailVerification,
    }),
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.signIn(req.body);

  respondWithAuth(res, 'Login successful', {
    user: result.user,
    session: result.session,
  });
});

export const logout = asyncHandler(async (req, res) => {
  try {
    await authService.signOut(req.accessToken);
  } catch {
    // Session may already be expired — still clear client-side cookies
  }

  clearAuthCookies(res);

  sendResponse(res, ApiResponse.ok('Logout successful', { signedOut: true }));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const base = resolveAuthRedirectBase(req);
  await authService.forgotPassword(req.body.email, {
    redirectTo: `${base}/auth/reset-password`,
  });

  sendResponse(
    res,
    ApiResponse.ok(
      'If an account exists with this email, a password reset link has been sent',
      { emailSent: true },
    ),
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const accessToken = extractBearerToken(req);

  if (!accessToken) {
    throw new UnauthorizedError(
      'Recovery access token is required. Pass it via Authorization header or accessToken field',
    );
  }

  const result = await authService.resetPassword(accessToken, req.body.password);

  respondWithAuth(res, 'Password reset successful', {
    user: result.user,
    session: result.session,
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.accessToken);

  sendResponse(res, ApiResponse.ok('User profile retrieved', { user }));
});

export const refreshSession = asyncHandler(async (req, res) => {
  const refreshToken = extractRefreshToken(req);

  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token is required');
  }

  const result = await authService.refreshSession(refreshToken);

  respondWithAuth(res, 'Session refreshed successfully', {
    user: result.user,
    session: result.session,
  });
});

export const resendVerification = asyncHandler(async (req, res) => {
  await authService.resendVerificationEmail(req.body.email);

  sendResponse(
    res,
    ApiResponse.ok(
      'If an account exists and is unverified, a verification email has been sent',
      { emailSent: true },
    ),
  );
});

export const verifyEmailStatus = asyncHandler(async (req, res) => {
  const user = await authService.verifyEmail(req.accessToken);

  sendResponse(res, ApiResponse.ok('Email verified successfully', { user }));
});
