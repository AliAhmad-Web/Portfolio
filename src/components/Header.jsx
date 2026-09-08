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

const navItems = siteConfig.navItems;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const { user, isAdmin, logout } = useAuth();

  const handleNavigate = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  const workTogetherButton = (
    <button
      type="button"
      onClick={() => handleNavigate('contact')}
      className="btn-primary"
    >
      Let's Work Together
    </button>
  );

  const authActions = (
    <>
      {workTogetherButton}
      {user ? (
        <>
          {isAdmin ? (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="btn-ghost"
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
            className="btn-ghost"
          >
            Log out
          </button>
        </>
      ) : (
        <Link
          to="/auth/login"
          onClick={() => setMenuOpen(false)}
          className="btn-ghost"
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <BrandMark
          onClick={() => handleNavigate('home')}
          className="text-lg font-black tracking-[0.14em] text-white md:text-xl"
        />

        <nav className="site-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`nav-link ${activeSection === item.id ? 'is-active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          <div className="header-actions">{authActions}</div>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="menu-toggle"
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
            className="mobile-nav"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`mobile-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-3 flex flex-col gap-2">{authActions}</div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
