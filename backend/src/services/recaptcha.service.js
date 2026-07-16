import { env } from '../config/env.js';
import { ForbiddenError, BadRequestError, ApiError } from '../utils/ApiError.js';

const SITEVERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

function mapGoogleErrorCodes(errorCodes = []) {
  if (errorCodes.includes('missing-input-secret') || errorCodes.includes('invalid-input-secret')) {
    return 'reCAPTCHA is misconfigured on the server.';
  }

  if (errorCodes.includes('missing-input-response') || errorCodes.includes('invalid-input-response')) {
    return 'reCAPTCHA token is missing or invalid. Please try again.';
  }

  if (errorCodes.includes('timeout-or-duplicate')) {
    return 'reCAPTCHA token expired or was already used. Please try again.';
  }

  if (errorCodes.includes('bad-request')) {
    return 'reCAPTCHA verification request was rejected.';
  }

  return 'reCAPTCHA verification failed. Please try again.';
}

export const recaptchaService = {
  isEnabled() {
    if (env.recaptcha.enabled === false) {
      return false;
    }

    return Boolean(env.recaptcha.secretKey);
  },

  async verifyToken(token, {
    expectedAction,
    remoteIp,
  } = {}) {
    if (!this.isEnabled()) {
      // Match contact shim behavior: skip when secret is missing (dev or prod).
      console.warn(
        '[recaptcha] Verification skipped — RECAPTCHA_SECRET_KEY is not set.',
      );
      return {
        success: true,
        skipped: true,
        score: null,
        action: expectedAction ?? null,
      };
    }

    if (!token || typeof token !== 'string') {
      throw new BadRequestError('reCAPTCHA token is required');
    }

    const params = new URLSearchParams();
    params.set('secret', env.recaptcha.secretKey);
    params.set('response', token);

    if (remoteIp) {
      params.set('remoteip', remoteIp);
    }

    let payload;

    try {
      const response = await fetch(SITEVERIFY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new ApiError(502, 'Unable to reach Google reCAPTCHA verification service');
      }

      payload = await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(502, 'reCAPTCHA verification request failed');
    }

    if (!payload.success) {
      throw new ForbiddenError(
        mapGoogleErrorCodes(payload['error-codes']),
        {
          errorCodes: payload['error-codes'] ?? [],
        },
      );
    }

    if (expectedAction && payload.action !== expectedAction) {
      throw new ForbiddenError('reCAPTCHA action mismatch. Please try again.');
    }

    const score = typeof payload.score === 'number' ? payload.score : 0;
    if (score < env.recaptcha.minScore) {
      throw new ForbiddenError(
        'reCAPTCHA score too low. Please try again later.',
        { score },
      );
    }

    return {
      success: true,
      skipped: false,
      score,
      action: payload.action ?? null,
      hostname: payload.hostname ?? null,
      challengeTs: payload.challenge_ts ?? null,
    };
  },
};
