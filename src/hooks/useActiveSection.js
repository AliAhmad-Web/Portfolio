/**
 * useActiveSection — Tracks which landing-page section is currently in view.
 * Purpose: Drive active nav highlighting in the Header.
 * Used by: Header.
 *
 * Uses viewport position (not nav-item order) so Projects stays active while it
 * is on screen even though skills/stats appear earlier in the document.
 */

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../data/site';

const VIEW_MARKER = 120;

function hashSection(sectionIds) {
  const id = window.location.hash.replace('#', '');
  if (sectionIds.includes(id)) return id;
  return null;
}

function sectionFromScroll(sectionIds) {
  let current = sectionIds[0];
  let bestTop = -Infinity;

  for (const id of sectionIds) {
    const section = document.getElementById(id);
    if (!section) continue;
    const top = section.getBoundingClientRect().top;
    if (top <= VIEW_MARKER && top >= bestTop) {
      bestTop = top;
      current = id;
    }
  }

  return current;
}

export function useActiveSection(sectionIds = siteConfig.navSections) {
  const [activeSection, setActiveSection] = useState(
    () => hashSection(sectionIds) || 'home',
  );
  const rafRef = useRef(null);
  const pendingHashRef = useRef(hashSection(sectionIds));

  useEffect(() => {
    const apply = (next) => {
      setActiveSection((prev) => (prev !== next ? next : prev));
    };

    const syncFromHash = () => {
      const fromHash = hashSection(sectionIds);
      pendingHashRef.current = fromHash;
      if (fromHash) apply(fromHash);
      else if (!window.location.hash) apply('home');
    };

    const handleScroll = () => {
      const pending = pendingHashRef.current;
      if (pending) {
        const section = document.getElementById(pending);
        const top = section?.getBoundingClientRect().top ?? Infinity;
        if (top > VIEW_MARKER) {
          apply(pending);
          return;
        }
        pendingHashRef.current = null;
      }
      apply(sectionFromScroll(sectionIds));
    };

    const throttledScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    syncFromHash();
    handleScroll();
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('hashchange', syncFromHash);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('hashchange', syncFromHash);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionIds]);

  return activeSection;
}
