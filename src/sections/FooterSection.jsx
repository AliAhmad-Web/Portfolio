// FooterSection: The bottom-most section of the portfolio.
// Contains:
//   - Brand logo with a short tagline.
//   - Quick links to all page sections for easy navigation.
//   - Social/contact icon links (GitHub, LinkedIn, WhatsApp, Email).
//   - Copyright notice with a heart icon.
//   - "Back to Top" button that scrolls to the home section.
//
// Uses the scrollToSection utility for navigation and react-icons for social icons.

import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaHeart, FaArrowUp } from 'react-icons/fa';
import { scrollToSection } from '../utils/scrollToSection';

export default function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 bg-[linear-gradient(135deg,#020617_0%,#111827_45%,#020617_100%)] px-4 py-12 text-slate-300 sm:px-6 lg:px-8">
      {/* Subtle cyan glow line at the top of the footer */}
      <div className="absolute inset-x-0 -top-px h-px 'bg-gradient-to-r' from-transparent via-cyan-400/30 to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Main footer content: Brand | Quick Links | Social Icons */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="text-2xl font-black tracking-[0.25em] text-white transition hover:text-cyan-300"
            >
              AliAhmad<span className="text-cyan-400">-Web</span>
            </button>
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              React Developer crafting modern, responsive, and high-performance web experiences.
            </p>
          </div>

          {/* Quick Links: Scroll buttons to navigate to each section */}
          <div className="hidden text-center sm:block md:text-left">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm md:justify-start">
              {['home', 'about', 'skills', 'stats', 'services', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollToSection(item)}
                  className="text-slate-400 capitalize transition hover:text-cyan-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact / Social icons */}
          <div className="text-center md:text-right">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">Contact</h4>
            <div className="flex items-center justify-center gap-3 md:justify-end">
              <a href="https://github.com/AliAhmad-Web" target="_blank" rel="noreferrer" className="group relative rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition-all hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-200" aria-label="GitHub">
                <FaGithub className="transition-transform group-hover:scale-110" />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="group relative rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition-all hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-200" aria-label="LinkedIn">
                <FaLinkedin className="transition-transform group-hover:scale-110" />
              </a>
              <a href="https://wa.me/923064382254" target="_blank" rel="noreferrer" className="group relative rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition-all hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-200" aria-label="WhatsApp">
                <FaWhatsapp className="transition-transform group-hover:scale-110" />
              </a>
              <a href="mailto:alikhan234ali@gmail.com" className="group relative rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition-all hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-200" aria-label="Email">
                <FaEnvelope className="transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="my-8 border-t border-white/5" />

        {/* Bottom bar: Copyright + Back to Top button */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row">
          <p className="flex items-center gap-1 text-slate-400">
            &copy; {new Date().getFullYear()} AliAhmad-Web. Crafted with
            <FaHeart className="text-rose-400" />
            using React & Tailwind CSS.
          </p>

          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Back to Top
            <FaArrowUp className="text-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
}