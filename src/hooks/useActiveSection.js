import { useEffect, useRef, useState } from 'react';

// Custom hook: Tracks which section is currently visible based on scroll position.
// Uses requestAnimationFrame throttling to avoid excessive re-renders on scroll.
// Used by the Header to highlight the active navigation link.
// @param sectionIds - Array of section IDs to track. Default covers all sections.
// @returns The ID of the currently active (visible) section.

export function useActiveSection(sectionIds = ['home', 'about', 'skills', 'projects', 'contact']) {
  const [activeSection, setActiveSection] = useState('home');
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // Offset for header height.

      // Find the last section that has scrolled past the top.
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          current = id;
        }
      }
      // Only update state if section actually changed (avoids useless re-renders)
      setActiveSection((prev) => (prev !== current ? current : prev));
    };

    // Throttled scroll handler using requestAnimationFrame
    const throttledScroll = () => {
      if (rafRef.current) return; // Skip if a frame is already pending
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    handleScroll(); // Run on mount to set initial active section.
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
