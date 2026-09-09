/**
 * NotFoundPage — SEO-friendly 404 for unknown public routes.
 * Purpose: Avoid soft-404 homepage redirects while keeping the existing visual system.
 * Route: unmatched paths.
 */

import { Link } from 'react-router-dom';
import SeoHead from '../components/seo/SeoHead';
import BrandMark from '../components/ui/BrandMark';
import { notFoundSeo } from '../data/seo';

const recoveryLinks = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About Ali Ahmad' },
  { to: '/#services', label: 'Web & AI services' },
  { to: '/#projects', label: 'Selected projects' },
  { to: '/#faq', label: 'FAQ' },
  { to: '/#contact', label: 'Contact' },
];

export default function NotFoundPage() {
  return (
    <>
      <SeoHead
        title={notFoundSeo.title}
        description={notFoundSeo.description}
        path={notFoundSeo.path}
        robots={notFoundSeo.robots}
      />

      <div className="site-shell min-h-screen px-4 py-10 text-white sm:px-6 lg:px-8">
        <header className="mx-auto flex max-w-3xl justify-center">
          <BrandMark
            to="/"
            className="font-sora text-lg font-extrabold tracking-[0.18em] text-white"
          />
        </header>

        <main className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">404</p>
          <h1 className="font-sora mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            This page is not available
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300">
            The URL may be mistyped or the page was moved. Continue to Ali Ahmad’s portfolio for
            web development, AI solutions, and automation work from Lahore, Pakistan.
          </p>

          <nav aria-label="Helpful pages" className="mt-10 flex flex-wrap justify-center gap-3">
            {recoveryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </main>
      </div>
    </>
  );
}
