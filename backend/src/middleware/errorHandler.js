import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

function formatErrorResponse(error) {
  const response = {
    success: false,
    message: error.message || 'Internal server error',
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  if (env.isDevelopment && error.stack) {
    response.stack = error.stack;
  }

  return response;
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error.message?.includes('not allowed by CORS')) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
    return;
  }

  const statusCode = error instanceof ApiError ? error.statusCode : 500;

  if (!(error instanceof ApiError) && env.isDevelopment) {
    console.error('[Unhandled Error]', error);
  }

  res.status(statusCode).json(formatErrorResponse(error));
}
