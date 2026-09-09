/**
 * AuthLayout — Shared chrome for authentication pages.
 * Purpose: Consistent branded shell for login/signup/password flows.
 * Used by: pages under src/pages/auth/.
 */

import { useLocation } from 'react-router-dom';
import BrandMark from '../ui/BrandMark';
import SeoHead from '../seo/SeoHead';
import { siteConfig } from '../../data/site';

export default function AuthLayout({ title, subtitle, children, footer }) {
  const location = useLocation();
  const description = `${subtitle || title} This account area is private and is not part of the public Ali Ahmad portfolio.`;

  return (
    <>
      <SeoHead
        title={`${title} | ${siteConfig.brand.fullName}`}
        description={description}
        path={location.pathname}
        robots="noindex, nofollow"
      />

      <div className="site-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 text-white">

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8 text-center">
            <BrandMark
              to="/"
              className="text-xl font-black tracking-[0.14em] text-white transition hover:text-cyan-200"
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">{title}</h1>
            {subtitle ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{subtitle}</p>
            ) : null}
          </div>

          <div className="glass-panel p-6 sm:p-8">
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
