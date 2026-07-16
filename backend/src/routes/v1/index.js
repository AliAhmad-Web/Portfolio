import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import contactRoutes from './contact.routes.js';
import adminRoutes from './admin.routes.js';
import { getApiInfo } from '../../controllers/health.controller.js';

const router = Router();

router.get('/', getApiInfo);
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/admin', adminRoutes);

export default router;
