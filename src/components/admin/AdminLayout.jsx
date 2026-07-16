/**
 * AdminLayout — Authenticated dashboard chrome (sidebar + top bar).
 * Purpose: Shared shell for admin dashboard routes under /dashboard.
 * Used by: App.jsx protected admin routes.
 */

import { NavLink, Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FiGrid,
  FiMail,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import BrandMark from '../ui/BrandMark';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/dashboard/contacts', label: 'Contact Queries', icon: FiMail },
  { to: '/dashboard/profile', label: 'Profile', icon: FiUser },
];

function SidebarNav({ onNavigate }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-4">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-cyan-400/15 text-cyan-200'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.08),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1440px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-xl lg:flex">
          <div className="border-b border-white/10 px-6 py-6">
            <BrandMark
              to="/dashboard"
              className="text-lg font-black tracking-[0.2em]"
            />
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Admin Panel
            </p>
          </div>

          <SidebarNav />

          <div className="space-y-3 border-t border-white/10 p-4">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-200"
            >
              <FiExternalLink size={16} />
              View portfolio
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-rose-400/40 hover:text-rose-200"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/70"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative flex h-full w-72 flex-col border-r border-white/10 bg-slate-950">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <BrandMark className="font-black tracking-[0.2em]" as="span" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-slate-200"
                  aria-label="Close sidebar"
                >
                  <FiX size={18} />
                </button>
              </div>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
              <div className="border-t border-white/10 p-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            </aside>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-100 lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
              >
                <FiMenu size={18} />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                  Dashboard
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Signed in as {user?.email}
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium capitalize text-cyan-200">
                {user?.role || 'admin'}
              </span>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
