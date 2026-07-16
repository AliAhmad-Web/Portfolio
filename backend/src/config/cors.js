/**
 * CORS configuration for the Express API.
 * Purpose: Allow the Vite/Vercel frontend (and local dev) to call the API with credentials.
 * Used by: app.js
 */

const staticOrigins = ['http://localhost:5173', 'http://localhost:5000'];

function getConfiguredOrigins() {
  return String(process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isAllowedOrigin(origin) {
  if (!origin) return true;

  const allowed = new Set([...staticOrigins, ...getConfiguredOrigins()]);
  if (allowed.has(origin)) return true;

  // Vercel production + preview deployments
  if (origin.endsWith('.vercel.app')) return true;

  return false;
}

export const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400,
};
