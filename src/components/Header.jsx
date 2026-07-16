/**
 * Header — Sticky public navigation for the portfolio landing page.
 * Purpose: Section links + auth actions; highlights the active section while scrolling.
 * Used by: HomePage.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/scrollToSection';
import { useAuth } from '../context/AuthContext';
import { siteConfig } from '../data/site';
import BrandMark from './ui/BrandMark';

const navItems = siteConfig.navSections;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const { user, isAdmin, logout } = useAuth();

  const handleNavigate = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  const authActions = (
    <>
      {user ? (
        <>
          {isAdmin ? (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
            >
              Dashboard
            </Link>
          ) : null}
          <button
            type="button"
            onClick={async () => {
              setMenuOpen(false);
              await logout();
            }}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-100"
          >
            Log out
          </button>
        </>
      ) : (
        <Link
          to="/auth/login"
          onClick={() => setMenuOpen(false)}
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandMark
          onClick={() => handleNavigate('home')}
          className="text-xl font-black tracking-[0.25em] text-white md:text-2xl"
        />

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleNavigate(item)}
              className={`capitalize transition ${
                activeSection === item
                  ? 'text-cyan-300'
                  : 'text-slate-300 hover:text-cyan-200'
              }`}
            >
              {item}
            </button>
          ))}
          <div className="ml-2 flex items-center gap-2">{authActions}</div>
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
            transition={{ duration: 0.15 }}
            className="border-t border-white/10 bg-slate-950/95 p-4 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleNavigate(item)}
                className={`mb-2 block w-full rounded-2xl px-4 py-3 text-left text-base capitalize transition ${
                  activeSection === item
                    ? 'bg-cyan-400/10 text-cyan-200'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {item}
              </button>
            ))}
            <div className="mt-3 flex flex-col gap-2">{authActions}</div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
