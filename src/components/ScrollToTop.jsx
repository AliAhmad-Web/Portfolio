// ScrollToTop: A floating button that appears when the user scrolls down the page.
// Clicking it smoothly scrolls back to the top of the page (the "home" section).
// Uses the FaArrowUp icon from react-icons.
// Visibility is controlled by tracking the current scroll position.

import { useEffect, useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  // Throttled scroll handler to avoid excessive state updates
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;
      setVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    const throttledScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    visible && (
      <button
        type="button"
        onClick={scrollToTop}
        className="btn-ghost fixed bottom-6 left-6 z-50 p-3"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    )
  );
}
