import { body } from 'express-validator';

export const contactValidations = {
  submit: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 100 })
      .withMessage('Name must be at most 100 characters'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('A valid email address is required')
      .normalizeEmail(),
    body('message')
      .trim()
      .isLength({ min: 12, max: 5000 })
      .withMessage('Message must be between 12 and 5000 characters'),
    body('recaptchaToken')
      .optional({ values: 'falsy' })
      .isString()
      .withMessage('reCAPTCHA token must be a string')
      .isLength({ min: 20, max: 4000 })
      .withMessage('reCAPTCHA token is invalid'),
  ],
};
