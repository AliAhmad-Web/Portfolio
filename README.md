# Ali Ahmad — Personal Portfolio

A full-stack developer portfolio built for professional presentation and internship submission. It showcases projects and skills on a public site, and includes authentication, an admin dashboard, contact form storage, email notifications, and bot protection.

**Live stack:** React (Vite) + Express + Supabase · Frontend on Vercel · API on Render/Railway

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
| Deploy | Vercel (SPA) + Render/Railway (Express API) |

---

## Project Structure

```text
Portfolio/
├── api/                 # Legacy Vercel contact shim (unused when VITE_API_BASE_URL is set)
├── backend/             # Express API (auth, admin, contact, health) — deploy to Render
├── docs/                # Setup + deployment guides
├── render.yaml          # Render Blueprint for the API
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
# Leave VITE_API_BASE_URL unset locally (Vite proxies /api → localhost:5000)
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

**Recommended (this repo):** Frontend + **full Express API on Vercel**

| Piece | Host | Role |
|-------|------|------|
| React SPA | Vercel | Public site + auth UI |
| Express API | Vercel `api/index.js` | Auth, admin, contact, health under `/api/v1` |

Same origin means the SPA calls `/api/v1/...` (no `VITE_API_BASE_URL` required on Vercel).

### Production checklist (Vercel)

1. Connect the GitHub repo to the Vercel project and deploy.
2. In **Settings → Environment Variables**, set at least:

| Name | Notes |
|------|--------|
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://your-app.vercel.app` |
| `COOKIE_SECRET` | long random string |
| `SUPABASE_URL` | from Supabase |
| `SUPABASE_ANON_KEY` | anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
| `SUPABASE_JWT_SECRET` | JWT secret (or leave placeholder; auth uses Supabase fallback) |
| `AUTH_VERIFY_EMAIL_URL` | `https://your-app.vercel.app/auth/verify-email` |
| `AUTH_RESET_PASSWORD_URL` | `https://your-app.vercel.app/auth/reset-password` |
| `VITE_RECAPTCHA_SITE_KEY` | optional site key |
| `RECAPTCHA_SECRET_KEY` | optional; verification skips if empty |
| `RESEND_*` | optional email notify |

3. Redeploy after adding env vars.
4. Update Supabase redirect URLs for the Vercel domain.
5. Test `/auth/login` and `/api/v1/health` on the live site.

**Optional alternative:** host Express on Render (`render.yaml`) and set `VITE_API_BASE_URL` — see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

Related: `docs/AUTH_SETUP.md`, `docs/RECAPTCHA_SETUP.md`, `docs/RATE_LIMITING.md`.

---

## Security Notes

- Secrets live only in environment files / host dashboards (never hardcoded).
- `SUPABASE_SERVICE_ROLE_KEY` is server-only; never expose it to the browser.
- reCAPTCHA **site** key is public; **secret** key stays on the API host.
- Login rate limit applies to **failed** attempts only (configurable via env).
- Admin routes require a valid JWT and `admin` role.

---

## Contact

**Ali Ahmad** — Frontend Developer  
Email: [alikhan234ali@gmail.com](mailto:alikhan234ali@gmail.com)  
GitHub: [AliAhmad-Web](https://github.com/AliAhmad-Web)

Feel free to reach out for collaboration, freelance work, or internship opportunities.
