import { env } from './env.js';

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  ...(env.clientUrl
    ? env.clientUrl.split(',').map((origin) => origin.trim())
    : []),
];

// Vercel preview deployments and custom domains
// We also allow any origin in production for convenience
const isVercelDeployment =
  process.env.VERCEL === '1' ||
  process.env.VERCEL_ENV === 'production' ||
  process.env.VERCEL_ENV === 'preview' ||
  process.env.VERCEL_URL;

export const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (server-to-server, curl, etc.)
    // Also allow all origins on Vercel since the deployment domain is dynamic
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      isVercelDeployment
    ) {
      callback(null, true);
      return;
    }

    // Check if origin ends with vercel.app (for preview deployments)
    if (typeof origin === 'string' && origin.includes('vercel.app')) {
      callback(null, true);
      return;
    }

    // For production, log the rejected origin for debugging
    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400,
};