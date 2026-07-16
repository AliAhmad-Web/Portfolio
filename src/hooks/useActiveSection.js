/**
 * useActiveSection — Tracks which landing-page section is currently in view.
 * Purpose: Drive active nav highlighting in the Header.
 * Used by: Header.
 */

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../data/site';

export function useActiveSection(sectionIds = siteConfig.navSections) {
  const [activeSection, setActiveSection] = useState('home');
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          current = id;
        }
      }
      setActiveSection((prev) => (prev !== current ? current : prev));
    };

    const throttledScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionIds]);

  return activeSection;
}
