import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import { verifyRecaptcha } from '../../middleware/recaptcha.js';
import { loginRateLimiter } from '../../middleware/rateLimit.js';
import { authValidations } from '../../validations/auth.validation.js';
import {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  refreshSession,
  resendVerification,
  verifyEmailStatus,
} from '../../controllers/auth.controller.js';

const router = Router();

router.post('/signup', validate(authValidations.signup), signUp);
router.post(
  '/login',
  loginRateLimiter,
  validate(authValidations.login),
  verifyRecaptcha('login'),
  login,
);
router.post('/logout', authenticate, logout);
router.post(
  '/forgot-password',
  validate(authValidations.forgotPassword),
  forgotPassword,
);
router.post(
  '/reset-password',
  validate(authValidations.resetPassword),
  resetPassword,
);
router.post(
  '/refresh-session',
  validate(authValidations.refreshSession),
  refreshSession,
);
router.post(
  '/resend-verification',
  validate(authValidations.resendVerification),
  resendVerification,
);
router.get('/verify-email', authenticate, verifyEmailStatus);
router.get('/me', authenticate, getMe);

export default router;

