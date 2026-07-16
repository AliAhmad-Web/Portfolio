/**
 * Vercel serverless entry for the full Express API.
 * Purpose: Serve auth, admin, contact, and health under `/api/v1/*` on Vercel.
 * Locally the Vite proxy still targets `backend` on port 5000.
 */

import app from '../backend/src/app.js';

export default app;
