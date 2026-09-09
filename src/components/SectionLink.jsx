/**
 * SectionLink — Crawlable in-page navigation that keeps the existing scroll behavior.
 * Purpose: Replace JS-only buttons with real hrefs for SEO internal linking.
 * Used by: Header, Footer, Hero CTAs.
 */

import { Link } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';

function sectionHref(id) {
  return id === 'home' ? '/' : `/#${id}`;
}

export default function SectionLink({
  id,
  className,
  children,
  onNavigate,
  ariaLabel,
  ariaCurrent,
}) {
  return (
    <Link
      to={sectionHref(id)}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      onClick={(event) => {
        onNavigate?.();
        if (window.location.pathname === '/') {
          event.preventDefault();
          scrollToSection(id);
        }
      }}
    >
      {children}
    </Link>
  );
}
