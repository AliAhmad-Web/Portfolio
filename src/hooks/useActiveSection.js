import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds = ['home', 'about', 'skills', 'projects', 'contact']) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(id);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}
