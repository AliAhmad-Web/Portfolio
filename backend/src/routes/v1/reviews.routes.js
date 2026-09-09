import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { verifyRecaptcha } from '../../middleware/recaptcha.js';
import { reviewValidations } from '../../validations/reviews.validation.js';
import { listReviews, submitReview } from '../../controllers/reviews.controller.js';

const router = Router();

router.get('/', listReviews);

router.post(
  '/',
  validate(reviewValidations.submit),
  verifyRecaptcha('review'),
  submitReview,
);

export default router;
