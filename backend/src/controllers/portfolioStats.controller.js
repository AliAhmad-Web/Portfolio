import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse, sendResponse } from '../utils/ApiResponse.js';
import { portfolioStatsService } from '../services/portfolioStats.service.js';

export const getPortfolioStats = asyncHandler(async (_req, res) => {
  const stats = await portfolioStatsService.getPublicStats();
  sendResponse(res, ApiResponse.ok('Portfolio stats retrieved', stats));
});
