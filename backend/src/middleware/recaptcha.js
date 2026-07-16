import { asyncHandler } from '../utils/asyncHandler.js';
import { recaptchaService } from '../services/recaptcha.service.js';

/**
 * Verifies a Google reCAPTCHA v3 token from the request body.
 * Expects `recaptchaToken` and matches the provided action name.
 */
export function verifyRecaptcha(expectedAction) {
  return asyncHandler(async (req, _res, next) => {
    const token =
      req.body?.recaptchaToken ??
      req.body?.captchaToken ??
      req.headers['x-recaptcha-token'];

    const result = await recaptchaService.verifyToken(token, {
      expectedAction,
      remoteIp: req.ip,
    });

    req.recaptcha = result;
    next();
  });
}
