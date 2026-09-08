import { Router } from 'express';
import { getPortfolioStats } from '../../controllers/portfolioStats.controller.js';

const router = Router();

router.get('/stats', getPortfolioStats);

export default router;
