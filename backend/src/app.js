/**
 * Express application for the portfolio API.
 * Purpose: Security middleware, JSON parsing, and `/api` route mounting.
 * Used by: server.js (local development / Node hosts).
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors.js';
import { requestLogger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API server is running',
    api: '/api/v1',
  });
});

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
