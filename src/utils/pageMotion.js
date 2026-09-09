/**
 * Pause decorative motion while the tab is hidden.
 * Purpose: Stop CSS/SVG loops in background tabs without changing visible animation.
 * Used by: main.jsx
 */

function setPaused(paused) {
  document.documentElement.toggleAttribute('data-motion-paused', paused);
  document.querySelectorAll('svg').forEach((svg) => {
    try {
      if (paused) svg.pauseAnimations();
      else svg.unpauseAnimations();
    } catch {
      /* ignore unsupported SVG timing */
    }
  });
}

export function startPageMotionGuard() {
  const sync = () => setPaused(document.hidden);
  sync();
  document.addEventListener('visibilitychange', sync);
  return () => document.removeEventListener('visibilitychange', sync);
}
