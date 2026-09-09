import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse, sendResponse } from '../utils/ApiResponse.js';
import { invalidatePortfolioStatsCache } from '../services/portfolioStats.service.js';
import { reviewsService } from '../services/reviews.service.js';

export const listReviews = asyncHandler(async (_req, res) => {
  const reviews = await reviewsService.listLatest();
  sendResponse(res, ApiResponse.ok('Reviews retrieved', { reviews }));
});

export const submitReview = asyncHandler(async (req, res) => {
  const { name, location, rating, comment, avatarUrl, service } = req.body;
  const result = await reviewsService.createReview({
    name: String(name).trim(),
    location: String(location).trim(),
    rating: Number(rating),
    comment: String(comment).trim(),
    avatarUrl: String(avatarUrl || '').trim(),
    service: String(service || 'Web Development').trim(),
  });

  invalidatePortfolioStatsCache();

  sendResponse(
    res,
    ApiResponse.created('Review submitted', {
      review: result.review,
      reviews: result.latest,
    }),
  );
});
