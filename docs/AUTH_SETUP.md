# Phase 1 — Authentication Setup

## What was added

- Supabase Auth API routes (signup, login, logout, forgot/reset password, email verification)
- `profiles` table linked to `auth.users` with RLS + auto-create trigger
- JWT middleware (`authenticate`, `authorize`, `requireAdmin`)
- `scripts/seed-admin.ts` to create the first admin
- React auth pages + protected `/dashboard` route (placeholder only)

## One-time Supabase configuration

1. Open **Supabase → SQL Editor** and run:

   `supabase/migrations/20260716000000_create_profiles.sql`

2. Open **Authentication → URL Configuration** and set:

   - Site URL: `http://localhost:5173`
   - Redirect URLs:
     - `http://localhost:5173/auth/verify-email`
     - `http://localhost:5173/auth/reset-password`

3. In **Project Settings → API**, copy into `backend/.env.local`:

   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (**service_role**, not anon)
   - `SUPABASE_JWT_SECRET` (JWT Settings)

4. Set admin seed values in `backend/.env.local`:

```env
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=StrongPass123!
ADMIN_FULL_NAME=Portfolio Admin
```

5. Seed the admin user:

```bash
cd backend
npm run seed:admin
```

## Run locally

```bash
# terminal 1
cd backend
npm run dev

# terminal 2
npm run dev
```

## Auth routes

| Page | Path |
|------|------|
| Login | `/auth/login` |
| Signup | `/auth/signup` |
| Forgot password | `/auth/forgot-password` |
| Reset password | `/auth/reset-password` |
| Verify email | `/auth/verify-email` |
| Admin gate | `/dashboard` (admin only) |

## API

| Method | Endpoint |
|--------|----------|
| POST | `/api/v1/auth/signup` |
| POST | `/api/v1/auth/login` |
| POST | `/api/v1/auth/logout` |
| POST | `/api/v1/auth/forgot-password` |
| POST | `/api/v1/auth/reset-password` |
| POST | `/api/v1/auth/refresh-session` |
| POST | `/api/v1/auth/resend-verification` |
| GET | `/api/v1/auth/verify-email` |
| GET | `/api/v1/auth/me` |
| GET | `/api/v1/admin/me` |
