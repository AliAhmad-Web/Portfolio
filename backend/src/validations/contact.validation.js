import { body, param, query } from 'express-validator';
import { contactService } from '../services/contact.service.js';

export const contactValidations = {
  list: [
    query('search')
      .optional()
      .isString()
      .isLength({ max: 200 })
      .withMessage('Search must be at most 200 characters'),
    query('status')
      .optional()
      .isIn(contactService.statuses)
      .withMessage(`Status must be one of: ${contactService.statuses.join(', ')}`),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 500 })
      .withMessage('Limit must be between 1 and 500'),
  ],

  getById: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Contact ID must be a positive integer'),
  ],

  updateStatus: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Contact ID must be a positive integer'),
    body('status')
      .isString()
      .isIn(contactService.statuses)
      .withMessage(`Status must be one of: ${contactService.statuses.join(', ')}`),
  ],
};
