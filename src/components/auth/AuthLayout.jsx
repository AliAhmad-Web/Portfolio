/**
 * AuthLayout — Shared chrome for authentication pages.
 * Purpose: Consistent branded shell for login/signup/password flows.
 * Used by: pages under src/pages/auth/.
 */

import { Helmet } from 'react-helmet-async';
import BrandMark from '../ui/BrandMark';
import { siteConfig } from '../../data/site';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <>
      <Helmet>
        <title>
          {title} | {siteConfig.brand.fullName}
        </title>
      </Helmet>

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
        <div className="pointer-events-none absolute inset-0 'bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.1),_transparent_36%)]" />
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="mb-8 text-center">
            <BrandMark
              to="/"
              className="text-xl font-black tracking-[0.25em] text-white transition hover:text-cyan-200"
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">{title}</h1>
            {subtitle ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{subtitle}</p>
            ) : null}
          </div>

          <div className="rounded-3xl border border-white/10 'bg-white/[0.04]' p-6 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-8">
            {children}
          </div>

          {footer ? (
            <div className="mt-6 text-center text-sm text-slate-400">{footer}</div>
          ) : null}
        </div>
      </div>
    </>
  );
}
