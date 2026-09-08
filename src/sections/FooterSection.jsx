/**
 * FooterSection — Site footer with brand, quick links, and social contacts.
 * Purpose: Secondary navigation and contact shortcuts for the landing page.
 * Used by: HomePage.
 */

import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
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
    <footer className="site-footer">
      <div className="site-wrap">
        <div className="footer-grid">
          <div>
            <BrandMark
              onClick={() => scrollToSection('home')}
              className="text-xl font-black tracking-[0.14em] text-white transition hover:text-cyan-300"
            />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              {siteConfig.brand.tagline}
            </p>
          </div>

          <div className="hidden sm:block">
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              {siteConfig.footerLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-title">Connect</h4>
            <div className="footer-socials">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 {siteConfig.brand.name}
            {siteConfig.brand.suffix}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="btn-ghost"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
          >
            Back to Top
            <FaArrowUp className="text-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
}
