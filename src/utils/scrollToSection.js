/**
 * Utility function: Smooth scrolls the page to a section by its ID.
 * Used by Header navigation links, Footer links, and "Back to Top" button.
 *
 * @param {string} id - The DOM element ID of the target section (e.g. "home", "projects").
 */

export function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section && id !== 'home') return;

  const nextUrl = id === 'home' ? '/' : `/#${id}`;
  const currentUrl = `${window.location.pathname}${window.location.hash}`;
  if (currentUrl !== nextUrl) {
    window.history.replaceState(null, '', nextUrl);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
