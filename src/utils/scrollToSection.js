/**
 * Utility function: Smooth scrolls the page to a section by its ID.
 * Used by Header navigation links, Footer links, and "Back to Top" button.
 *
 * @param {string} id - The DOM element ID of the target section (e.g. "home", "projects").
 *
 * How it works:
 * 1. Finds the DOM element with the given ID using document.getElementById().
 * 2. Scrolls the page so that element is at the top of the viewport.
 * 3. The scrolling animation is smooth (CSS scroll-behavior or JS behavior option).
 */

export function scrollToSection(id) {
  const section = document.getElementById(id); // Locate the target section element.
  if (!section) return;                         // Exit if element doesn't exist.

  section.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smooth scroll to element.
}