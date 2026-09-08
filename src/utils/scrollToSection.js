/**
 * Utility function: Smooth scrolls the page to a section by its ID.
 * Used by Header navigation links, Footer links, Hero CTAs, and "Back to Top".
 * Positions the section just below the sticky header so content is never covered.
 *
 * @param {string} id - The DOM element ID of the target section (e.g. "home", "projects").
 */

export function getHeaderOffset() {
  const bar = document.querySelector('[data-site-header-bar]');
  if (bar) return Math.max(0, Math.round(bar.getBoundingClientRect().height));
  const header = document.querySelector('[data-site-header]');
  if (header) return Math.max(0, Math.round(header.getBoundingClientRect().height));
  return 56;
}

function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function syncSectionHash(id) {
  const nextUrl = id === 'home' ? '/' : `/#${id}`;
  const currentUrl = `${window.location.pathname}${window.location.hash}`;
  if (currentUrl === nextUrl) return;
  window.history.replaceState(null, '', nextUrl);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

function alignSection(id) {
  const behavior = scrollBehavior();

  if (id === 'home') {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const section = document.getElementById(id);
  if (!section) return false;

  const offset = getHeaderOffset();
  const top = window.scrollY + section.getBoundingClientRect().top - offset;
  window.scrollTo({ top: Math.max(0, Math.round(top)), behavior });
  return true;
}

export function scrollToSection(id) {
  syncSectionHash(id);
  if (alignSection(id)) return;

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (alignSection(id) || attempts > 40) {
      window.clearInterval(timer);
    }
  }, 50);
}
