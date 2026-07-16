import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { verifyRecaptcha } from '../../middleware/recaptcha.js';
import { contactValidations } from '../../validations/publicContact.validation.js';
import { submitContactForm } from '../../controllers/contact.controller.js';

const router = Router();

router.post(
  '/',
  validate(contactValidations.submit),
  verifyRecaptcha('contact'),
  submitContactForm,
);

export default router;
