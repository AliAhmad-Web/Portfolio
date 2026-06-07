import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 350);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 left-6 z-110 rounded-full bg-cyan-400 p-3 text-slate-950 shadow-lg shadow-cyan-900/30 transition ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
}
