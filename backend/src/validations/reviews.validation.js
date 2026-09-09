import { body } from 'express-validator';

const DATA_IMAGE = /^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=\s]+$/i;
const HTTP_IMAGE = /^https?:\/\/.+/i;

export const reviewValidations = {
  submit: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 80 })
      .withMessage('Name must be at most 80 characters'),
    body('location')
      .trim()
      .notEmpty()
      .withMessage('City / country is required')
      .isLength({ max: 80 })
      .withMessage('Location must be at most 80 characters'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5')
      .toInt(),
    body('comment')
      .trim()
      .isLength({ min: 12, max: 600 })
      .withMessage('Review should be between 12 and 600 characters'),
    body('service')
      .optional({ values: 'falsy' })
      .trim()
      .isLength({ max: 80 })
      .withMessage('Service must be at most 80 characters'),
    body('avatarUrl')
      .optional({ values: 'falsy' })
      .isString()
      .withMessage('Profile picture is invalid')
      .isLength({ max: 180000 })
      .withMessage('Profile picture is too large')
      .custom((value) => DATA_IMAGE.test(value) || HTTP_IMAGE.test(value))
      .withMessage('Profile picture must be an image'),
    body('recaptchaToken')
      .optional({ values: 'falsy' })
      .isString()
      .withMessage('reCAPTCHA token must be a string')
      .isLength({ min: 20, max: 4000 })
      .withMessage('reCAPTCHA token is invalid'),
  ],
};
