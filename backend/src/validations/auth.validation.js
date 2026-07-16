import { body } from 'express-validator';

const passwordRules = body('password')
  .isString()
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter')
  .matches(/[0-9]/)
  .withMessage('Password must contain at least one number');

const emailRules = body('email')
  .trim()
  .isEmail()
  .withMessage('A valid email address is required')
  .normalizeEmail();

export const authValidations = {
  signup: [
    emailRules,
    passwordRules,
    body('fullName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Full name must be between 2 and 100 characters'),
  ],

  login: [
    emailRules,
    body('password')
      .isString()
      .notEmpty()
      .withMessage('Password is required'),
    body('recaptchaToken')
      .optional({ values: 'falsy' })
      .isString()
      .withMessage('reCAPTCHA token must be a string')
      .isLength({ min: 20, max: 4000 })
      .withMessage('reCAPTCHA token is invalid'),
  ],

  forgotPassword: [
    emailRules,
  ],

  resetPassword: [
    passwordRules,
    body('accessToken')
      .optional()
      .isString()
      .withMessage('Access token must be a string'),
  ],

  refreshSession: [
    body('refreshToken')
      .optional()
      .isString()
      .withMessage('Refresh token must be a string'),
  ],

  resendVerification: [
    emailRules,
  ],
};
