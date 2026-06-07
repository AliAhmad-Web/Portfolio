import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/scrollToSection';

const navItems = ['home', 'about', 'skills', 'projects', 'contact'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const handleNavigate = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => handleNavigate('home')} className="text-xl font-black tracking-[0.25em] text-white md:text-2xl" aria-label="Go to home section">
          ALI<span className="text-cyan-400">.DEV</span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleNavigate(item)}
              className={`capitalize transition ${activeSection === item ? 'text-cyan-300' : 'text-slate-300 hover:text-cyan-200'}`}
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/10 bg-slate-950/95 p-4 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleNavigate(item)}
                className={`mb-2 block w-full rounded-2xl px-4 py-3 text-left text-base capitalize transition ${activeSection === item ? 'bg-cyan-400/10 text-cyan-200' : 'text-slate-200 hover:bg-white/5'}`}
              >
                {item}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
