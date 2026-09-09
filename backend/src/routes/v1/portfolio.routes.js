import { Router } from 'express';
import { getGithubStats, getPortfolioStats } from '../../controllers/portfolioStats.controller.js';

const router = Router();

router.get('/stats', getPortfolioStats);
router.get('/github-stats', getGithubStats);

export default router;
