/**
 * CORS configuration for the Express API.
 * Purpose: Allow the Vite/Vercel frontend (and local dev) to call the API with credentials.
 * Used by: app.js
 */

const staticOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5000',
];

function getConfiguredOrigins() {
  return String(process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isLocalDevOrigin(origin) {
  try {
    const url = new URL(origin);
    const isLocal =
      url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    return isLocal && (url.protocol === 'http:' || url.protocol === 'https:');
  } catch {
    return false;
  }
}

function isAllowedOrigin(origin) {
  if (!origin) return true;

  const allowed = new Set([...staticOrigins, ...getConfiguredOrigins()]);
  if (allowed.has(origin)) return true;

  // Vite picks the next free port (5174, 5175, …) when 5173 is already in use.
  if (isLocalDevOrigin(origin)) return true;

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
