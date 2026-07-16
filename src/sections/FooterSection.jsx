/**
 * FooterSection — Site footer with brand, quick links, and social contacts.
 * Purpose: Secondary navigation and contact shortcuts for the landing page.
 * Used by: HomePage.
 */

import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaHeart, FaArrowUp } from 'react-icons/fa';
import { scrollToSection } from '../utils/scrollToSection';
import { siteConfig, getMailtoHref } from '../data/site';
import BrandMark from '../components/ui/BrandMark';

const socialLinks = [
  { href: siteConfig.social.github, label: 'GitHub', Icon: FaGithub },
  { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  { href: siteConfig.social.whatsapp, label: 'WhatsApp', Icon: FaWhatsapp },
  { href: getMailtoHref(), label: 'Email', Icon: FaEnvelope },
];

export default function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950 px-4 py-12 text-slate-300 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 -top-px h-px 'bg-gradient-to-r' from-transparent via-cyan-400/30 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <BrandMark
              onClick={() => scrollToSection('home')}
              className="text-2xl font-black tracking-[0.25em] text-white transition hover:text-cyan-300"
            />
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              {siteConfig.brand.tagline}
            </p>
          </div>

          <div className="hidden text-center sm:block md:text-left">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm md:justify-start">
              {siteConfig.navSections.map((item) => (
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

          <div className="text-center md:text-right">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Contact
            </h4>
            <div className="flex items-center justify-center gap-3 md:justify-end">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="group relative rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition-all hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-200"
                  aria-label={label}
                >
                  <Icon className="transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-white/5" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row">
          <p className="flex items-center gap-1 text-slate-400">
            &copy; {new Date().getFullYear()} {siteConfig.brand.name}
            {siteConfig.brand.suffix}. Crafted with
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
