import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse, sendResponse } from '../utils/ApiResponse.js';
import { healthService } from '../services/health.service.js';
import { env } from '../config/env.js';

export const getHealth = asyncHandler(async (_req, res) => {
  const database = await healthService.checkDatabaseConnection();

  const response = ApiResponse.ok('API is healthy', {
    status: 'ok',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
    database,
  });

  sendResponse(res, response);
});

export const getApiInfo = asyncHandler(async (_req, res) => {
  const response = ApiResponse.ok('Portfolio API', {
    name: 'Portfolio API',
    version: 'v1',
    endpoints: {
      health: 'GET /api/v1/health',
      auth: {
        signup: 'POST /api/v1/auth/signup',
        login: 'POST /api/v1/auth/login',
        logout: 'POST /api/v1/auth/logout',
        forgotPassword: 'POST /api/v1/auth/forgot-password',
        resetPassword: 'POST /api/v1/auth/reset-password',
        me: 'GET /api/v1/auth/me',
        refreshSession: 'POST /api/v1/auth/refresh-session',
        resendVerification: 'POST /api/v1/auth/resend-verification',
        verifyEmail: 'GET /api/v1/auth/verify-email',
      },
      admin: {
        me: 'GET /api/v1/admin/me',
        dashboard: 'GET /api/v1/admin/dashboard',
        contacts: 'GET /api/v1/admin/contacts',
        contactById: 'GET /api/v1/admin/contacts/:id',
        updateContactStatus: 'PATCH /api/v1/admin/contacts/:id/status',
      },
    },
  });

  sendResponse(res, response);
});
