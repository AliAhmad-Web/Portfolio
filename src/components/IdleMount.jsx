/**
 * IdleMount — Render heavy below-the-fold trees after first paint.
 * Purpose: Let the hero paint before homepage section chunks download.
 * Hash/deep links mount immediately so scroll-to-section still works.
 */

import { useEffect, useState } from 'react'

export default function IdleMount({ children, eager = false, timeout = 120 }) {
  const [ready, setReady] = useState(eager)

  useEffect(() => {
    if (ready) return undefined

    let idleId = 0
    const start = () => setReady(true)
    const raf = window.requestAnimationFrame(() => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout })
        return
      }
      idleId = window.setTimeout(start, 1)
    })

    return () => {
      window.cancelAnimationFrame(raf)
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      } else {
        window.clearTimeout(idleId)
      }
    }
  }, [ready, timeout])

  return ready ? children : null
}
