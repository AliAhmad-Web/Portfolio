# Production Deployment Guide

This project uses a **split deployment**:

| Piece | Host | Why |
|-------|------|-----|
| React SPA | **Vercel** | Static frontend |
| Express API (auth, admin, contact, health) | **Render** (or Railway) | Full Node API — Vercel’s `api/` shim only covered contact before |

The frontend reads `VITE_API_BASE_URL` at **build time** and calls the Express host for every `/api/v1/*` request.

---

## Step 1 — Deploy the Express API on Render

1. Push this repository to GitHub (include `backend/` and `render.yaml`).
2. Open [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.
3. Connect the repo. Render reads `render.yaml` and creates **portfolio-api**.
4. Fill in every `sync: false` environment variable (copy from your local `backend/.env.local`):

| Variable | Example / notes |
|----------|-----------------|
| `CLIENT_URL` | `https://your-app.vercel.app` (comma-separate custom domains) |
| `AUTH_VERIFY_EMAIL_URL` | `https://your-app.vercel.app/auth/verify-email` |
| `AUTH_RESET_PASSWORD_URL` | `https://your-app.vercel.app/auth/reset-password` |
| `SUPABASE_URL` | From Supabase → Project Settings → API |
| `SUPABASE_ANON_KEY` | anon / public key |
| `SUPABASE_SERVICE_ROLE_KEY` | **service_role** secret (never expose to the browser) |
| `SUPABASE_JWT_SECRET` | JWT Settings secret |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v3 secret |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | e.g. `Portfolio <onboarding@resend.dev>` |
| `RESEND_TO_EMAIL` | Admin inbox |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | For seeding (optional after first seed) |

5. Deploy and wait until the service is **Live**.
6. Copy the public URL, e.g. `https://portfolio-api-xxxx.onrender.com`.
7. Smoke-test in a browser or with curl:

```bash
curl https://YOUR-API.onrender.com/api/v1/health
```

You should get a JSON health payload (`success: true`).

### Alternative: Railway

1. New project → Deploy from GitHub → set **Root Directory** to `backend`.
2. Start command: `npm start`.
3. Add the same environment variables as above (`PORT` is set by Railway automatically).
4. Use the generated `*.up.railway.app` URL the same way as the Render URL.

---

## Step 2 — Point Supabase at production URLs

In **Supabase → Authentication → URL Configuration**:

- **Site URL:** `https://your-app.vercel.app`
- **Redirect URLs** (add both local and production if you still develop locally):
  - `https://your-app.vercel.app/auth/verify-email`
  - `https://your-app.vercel.app/auth/reset-password`
  - `http://localhost:5173/auth/verify-email`
  - `http://localhost:5173/auth/reset-password`

---

## Step 3 — Configure Google reCAPTCHA domains

In [reCAPTCHA Admin](https://www.google.com/recaptcha/admin), add:

- `localhost`
- `your-app.vercel.app`
- any custom domain

---

## Step 4 — Configure Vercel (frontend)

1. Open the Vercel project → **Settings → Environment Variables**.
2. Add (Production + Preview as needed):

| Name | Value |
|------|--------|
| `VITE_API_BASE_URL` | `https://YOUR-API.onrender.com/api/v1` |
| `VITE_RECAPTCHA_SITE_KEY` | Your reCAPTCHA **site** key |

3. Important: `VITE_*` variables are baked in at **build** time. After adding or changing them, trigger a **Redeploy** (Deployments → … → Redeploy). Do not skip this step.

4. You do **not** need Supabase/Resend secrets on Vercel for auth when using the Express host — those stay on Render. (Optional: keep the old `api/` contact function vars only if you still call that shim; the SPA no longer does when `VITE_API_BASE_URL` is set.)

---

## Step 5 — Verify production login

1. Open `https://your-app.vercel.app/auth/login`.
2. Open DevTools → Network.
3. Submit login — the request URL must be  
   `https://YOUR-API.onrender.com/api/v1/auth/login`  
   (not `your-app.vercel.app/api/...`).
4. Expect `200` with user + session JSON.
5. Confirm redirect into `/dashboard` for an admin user.
6. Also verify:
   - Signup / forgot password / reset password
   - Contact form submit
   - Admin → Contact Queries

---

## Step 6 — Free-tier cold starts (Render)

On Render’s free plan the API sleeps after idle time. The first request after sleep can take ~30–60s. If login seems to hang once, wait and retry — later requests are fast. Upgrade the plan if you need always-on API for demos.

---

## Local development (unchanged)

Leave `VITE_API_BASE_URL` **unset**. Vite proxies `/api` → `http://localhost:5000`.

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
npm run dev
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Not found: /api/v1/auth/login` on Vercel | `VITE_API_BASE_URL` missing or frontend not redeployed after setting it |
| CORS error in browser | Set `CLIENT_URL` on Render to your exact Vercel origin (`https://….vercel.app`) |
| Login 401 / invalid token | Check `SUPABASE_JWT_SECRET` and service role key on Render |
| reCAPTCHA fails | Add Vercel domain in reCAPTCHA admin; confirm site + secret keys |
| Email verify link goes to localhost | Update `AUTH_*_URL` on Render + Supabase redirect URLs |
| Health check fails on Render | Ensure path `/api/v1/health` returns 200 |
