import { useEffect, useState } from 'react';

// Custom hook: Tracks which section is currently visible based on scroll position.
// Used by the Header to highlight the active navigation link.
// @param sectionIds - Array of section IDs to track. Default covers all sections.
// @returns The ID of the currently active (visible) section.

export function useActiveSection(sectionIds = ['home', 'about', 'skills', 'projects', 'contact']) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // Offset for header height.

      // Loop through sections and find the last one that has scrolled past the top.
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(id);
        }
      }
    };

    handleScroll(); // Run on mount to set initial active section.
    window.addEventListener('scroll', handleScroll, { passive: true }); // Update on scroll.
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount.
  }, [sectionIds]);

  return activeSection;
}