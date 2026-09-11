/**
 * Pause decorative motion while the tab is hidden or a section is off-screen.
 * Purpose: Stop CSS/SVG loops that are not visible, without changing on-screen animation.
 * Used by: main.jsx
 */

const SECTION_SELECTOR = [
  '.hero-screen',
  '.about-screen',
  '.skills-screen',
  '.stats-screen',
  '.services-screen',
  '.projects-screen',
  '.faq-screen',
  '.contact-screen',
  '.team-screen',
  '.team-page-screen',
].join(',')

function pauseSvg(root, paused) {
  root.querySelectorAll('svg').forEach((svg) => {
    try {
      if (paused) svg.pauseAnimations()
      else svg.unpauseAnimations()
    } catch {
      /* ignore unsupported SVG timing */
    }
  })
}

function setDocumentPaused(paused) {
  document.documentElement.toggleAttribute('data-motion-paused', paused)
  pauseSvg(document, paused)
}

export function startPageMotionGuard() {
  const observed = new WeakSet()
  const syncHidden = () => setDocumentPaused(document.hidden)

  syncHidden()
  document.addEventListener('visibilitychange', syncHidden)

  const io = new IntersectionObserver(
    (entries) => {
      if (document.hidden) return
      entries.forEach((entry) => {
        const paused = !entry.isIntersecting
        entry.target.toggleAttribute('data-motion-paused', paused)
        pauseSvg(entry.target, paused)
      })
    },
    { rootMargin: '120px 0px', threshold: 0 },
  )

  const scan = () => {
    document.querySelectorAll(SECTION_SELECTOR).forEach((el) => {
      if (observed.has(el)) return
      observed.add(el)
      io.observe(el)
    })
  }

  scan()
  const mo = new MutationObserver(scan)
  mo.observe(document.body, { childList: true, subtree: true })

  return () => {
    document.removeEventListener('visibilitychange', syncHidden)
    io.disconnect()
    mo.disconnect()
  }
}
