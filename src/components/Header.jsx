/**
 * Header — Sticky public navigation for the portfolio landing page.
 * Purpose: Section links + auth actions; highlights the active section while scrolling.
 * Used by: HomePage.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/scrollToSection';
import { useAuth } from '../context/AuthContext';
import { siteConfig } from '../data/site';
import BrandMark from './ui/BrandMark';

const navItems = siteConfig.navItems;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const { user, isAdmin, logout } = useAuth();

  const handleNavigate = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  const authActions = user ? (
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
  ) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#020617]/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <div className="shrink-0 [&_.text-cyan-400]:text-amber-300">
          <BrandMark
            onClick={() => handleNavigate('home')}
            className="font-sora text-base font-extrabold tracking-[0.18em] text-white md:text-lg"
          />
        </div>

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`relative px-2.5 py-1.5 text-[13px] font-medium tracking-wide transition xl:px-3 ${
                  isActive
                    ? 'text-amber-100'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_10px_rgba(251,191,36,0.7)]">
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-white/3 px-3.5 py-1.5 text-[12px] font-semibold text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.08)] transition hover:border-amber-200/60 hover:bg-amber-300/10"
          >
            Let&apos;s Work Together
            <HiOutlineArrowRight className="text-sm" />
          </button>
          {authActions}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 lg:hidden"
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
            className="border-t border-white/10 bg-[#020617]/95 p-4 lg:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`mb-2 block w-full rounded-2xl px-4 py-3 text-left text-base transition ${
                  activeSection === item.id
                    ? 'bg-amber-300/10 text-amber-100'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavigate('contact')}
              className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/35 bg-amber-300/8 px-4 py-3 text-sm font-semibold text-amber-100"
            >
              Let&apos;s Work Together
              <HiOutlineArrowRight className="text-sm" />
            </button>
            {authActions ? <div className="mt-3 flex flex-col gap-2">{authActions}</div> : null}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
