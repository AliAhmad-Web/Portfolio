# Ali Ahmad — Personal Portfolio

A full-stack developer portfolio built for professional presentation and internship submission. It showcases projects and skills on a public site, and includes authentication, an admin dashboard, contact form storage, email notifications, and bot protection.

**Live stack:** React (Vite) + Express + Supabase + Vercel (frontend + contact API)

---

## Features

- Responsive public portfolio (About, Skills, Stats, Services, Projects, Contact)
- Project detail pages with live/GitHub links
- Contact form with Google reCAPTCHA v3, Supabase persistence, and Resend email alerts
- Supabase Auth (signup, login, email verification, password reset)
- Admin dashboard (stats, contact queries, profile)
- Login rate limiting (failed attempts only)
- JWT-protected admin APIs

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS, Framer Motion, React Router |
| Backend | Node.js, Express 5 |
| Database / Auth | Supabase (PostgreSQL + Auth) |
| Email | Resend |
| Security | Helmet, CORS, reCAPTCHA v3, express-rate-limit |
| Deploy | Vercel (frontend + contact serverless function); Express API on a Node host |

---

## Project Structure

```text
Portfolio/
├── api/                 # Vercel serverless contact API (production)
├── backend/             # Full Express API (auth, admin, contact, health)
├── docs/                # Setup guides (auth, reCAPTCHA, rate limiting)
├── public/              # Static assets
├── src/                 # React frontend
│   ├── components/
│   ├── context/
│   ├── data/            # Site config, projects, skills, services, stats
│   ├── hooks/
│   ├── lib/             # API client, reCAPTCHA helpers
│   ├── pages/
│   ├── sections/
│   └── utils/
├── supabase/migrations/ # SQL migrations
└── vercel.json
```

---

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- (Optional for local) Google reCAPTCHA v3 keys
- (Optional) [Resend](https://resend.com) API key for contact emails

---

## Local Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd Portfolio

npm install
cd backend && npm install && cd ..
```

### 2. Environment variables

**Frontend** — copy `.env.example` to `.env.local` in the project root:

```env
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-v3-site-key
```

**Backend** — copy `backend/.env.example` to `backend/.env.local` and fill in all values (Supabase, cookies, admin seed, reCAPTCHA, Resend). See comments in the example file.

Never commit real secrets. `.env` / `.env.local` files are gitignored.

### 3. Supabase migrations

In **Supabase → SQL Editor**, run in order:

1. `supabase/migrations/20260716000000_create_profiles.sql`
2. `supabase/migrations/20260716010000_contact_messages_status.sql`

Configure **Authentication → URL Configuration**:

- Site URL: `http://localhost:5173`
- Redirect URLs:
  - `http://localhost:5173/auth/verify-email`
  - `http://localhost:5173/auth/reset-password`

### 4. Seed the admin user

```bash
cd backend
npm run seed:admin
```

Uses `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_FULL_NAME` from `backend/.env.local`.

### 5. Run locally (two terminals)

```bash
# Terminal 1 — Express API (port 5000)
cd backend
npm run dev

# Terminal 2 — Vite frontend (port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` to the Express server.

---

## Scripts

| Command | Where | Description |
|---------|-------|-------------|
| `npm run dev` | root | Start Vite frontend |
| `npm run build` | root | Production frontend build |
| `npm run lint` | root | ESLint |
| `npm run preview` | root | Preview production build |
| `npm run dev` | `backend/` | Start Express with nodemon |
| `npm start` | `backend/` | Start Express (production) |
| `npm run seed:admin` | `backend/` | Create/promote admin user |

---

## Deployment Architecture

### What Vercel hosts today

With the current `vercel.json` setup:

| Surface | On Vercel? | Notes |
|---------|------------|--------|
| React SPA (`dist/`) | Yes | Built with `npm run build` |
| Public contact API | Yes | `api/index.js` (reCAPTCHA → Supabase → Resend) |
| Auth APIs (`/api/v1/auth/*`) | **No** | Require the Express `backend/` |
| Admin APIs (`/api/v1/admin/*`) | **No** | Require the Express `backend/` |
| Health / full contact controller | **No** | Require the Express `backend/` |

All `/api/*` traffic on Vercel is rewritten to the serverless function in `api/`, which only implements the **contact** flow. Login, signup, session refresh, and the admin dashboard **will not work** on a Vercel-only deploy until the Express API is hosted separately and the frontend points at it.

### Recommended production layout

1. **Frontend + contact form** → Vercel  
   - Set env vars used by `api/index.js` and the client:
     - `VITE_RECAPTCHA_SITE_KEY`
     - `SUPABASE_URL`, `SUPABASE_ANON_KEY`
     - `RECAPTCHA_SECRET_KEY`, `RECAPTCHA_MIN_SCORE`, `RECAPTCHA_ENABLED`
     - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`, `RESEND_ENABLED`
   - Add your Vercel domain to reCAPTCHA allowed domains and Supabase redirect URLs.

2. **Full API (auth + admin)** → any Node host (Railway, Render, Fly.io, VPS, etc.)  
   - Deploy the `backend/` folder (`npm start`).
   - Set the full `backend/.env.example` variables for production.
   - Set `CLIENT_URL` to your Vercel URL (comma-separated if multiple origins).
   - Update Supabase redirect URLs to the production frontend paths.

3. **Wiring auth in production**  
   - Locally, Vite proxies `/api` → `http://localhost:5000`.  
   - In production, either:
     - Proxy `/api/v1/auth` and `/api/v1/admin` from Vercel to the Express host, **or**
     - Point the frontend API base URL at the Express host (requires a small config change when you are ready to ship auth live).

Until step 2–3 are done, use **local Express** for auth/dashboard demos (e.g. Loom), and Vercel for the public site + contact form.

More detail: `docs/AUTH_SETUP.md`, `docs/RECAPTCHA_SETUP.md`, `docs/RATE_LIMITING.md`.

---

## Security Notes

- Secrets live only in environment files / host dashboards (never hardcoded).
- `SUPABASE_SERVICE_ROLE_KEY` is server-only; never expose it to the browser.
- reCAPTCHA **site** key is public; **secret** key stays on the server / Vercel env.
- Login rate limit applies to **failed** attempts only (configurable via env).
- Admin routes require a valid JWT and `admin` role.

---

## Contact

**Ali Ahmad** — Frontend Developer  
Email: [alikhan234ali@gmail.com](mailto:alikhan234ali@gmail.com)  
GitHub: [AliAhmad-Web](https://github.com/AliAhmad-Web)

Feel free to reach out for collaboration, freelance work, or internship opportunities.
