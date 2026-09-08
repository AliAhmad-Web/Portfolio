/**
 * useInView — Tracks whether a DOM node is inside the viewport.
 * Purpose: Replay viewport-triggered animations when a section enters/leaves view.
 */

import { useEffect, useState } from 'react';

export function useInView(amount = 0.3) {
  const [node, setNode] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: amount },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, amount]);

  return [setNode, inView];
}
