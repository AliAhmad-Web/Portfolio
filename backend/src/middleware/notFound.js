import { NotFoundError } from '../utils/ApiError.js';

export function notFoundHandler(req, res, next) {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
}
