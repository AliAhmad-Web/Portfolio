import { Router } from 'express';
import { requireAdmin } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse, sendResponse } from '../../utils/ApiResponse.js';
import { sanitizeUser } from '../../utils/user.js';
import { contactValidations } from '../../validations/contact.validation.js';
import {
  listContacts,
  getContactById,
  updateContactStatus,
  getDashboardOverview,
} from '../../controllers/contact.controller.js';

const router = Router();

router.use(...requireAdmin);

router.get(
  '/me',
  asyncHandler(async (req, res) => {
    sendResponse(
      res,
      ApiResponse.ok('Admin access granted', {
        user: sanitizeUser(req.user, req.profile),
        profile: req.profile,
      }),
    );
  }),
);

router.get('/dashboard', getDashboardOverview);

router.get(
  '/contacts',
  validate(contactValidations.list),
  listContacts,
);

router.get(
  '/contacts/:id',
  validate(contactValidations.getById),
  getContactById,
);

router.patch(
  '/contacts/:id/status',
  validate(contactValidations.updateStatus),
  updateContactStatus,
);

export default router;
