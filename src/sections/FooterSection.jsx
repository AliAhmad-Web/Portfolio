/**
 * FooterSection — Reference-matched site footer.
 * Purpose: Brand, section shortcuts, and social links for the landing page.
 * Used by: HomePage. Scrolls to existing section ids.
 */

import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import {
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineCodeBracket,
  HiOutlineEnvelope,
  HiOutlineFolder,
  HiOutlineHome,
  HiOutlineQuestionMarkCircle,
  HiOutlineUser,
} from 'react-icons/hi2';
import { siteConfig, getMailtoHref } from '../data/site';
import BrandMark from '../components/ui/BrandMark';
import SectionLink from '../components/SectionLink';

const quickLinks = [
  { id: 'home', label: 'Home', Icon: HiOutlineHome },
  { id: 'about', label: 'About', Icon: HiOutlineUser },
  { id: 'skills', label: 'Skills', Icon: HiOutlineCodeBracket },
  { id: 'stats', label: 'Stats', Icon: HiOutlineChartBar },
  { id: 'services', label: 'Services', Icon: HiOutlineBriefcase },
  { id: 'projects', label: 'Projects', Icon: HiOutlineFolder },
  { id: 'faq', label: 'FAQ', Icon: HiOutlineQuestionMarkCircle },
  { id: 'contact', label: 'Contact', Icon: HiOutlineEnvelope },
];

const socialLinks = [
  { href: siteConfig.social.github, label: 'GitHub', Icon: FaGithub, tone: 'github' },
  { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: FaLinkedin, tone: 'linkedin' },
  { href: siteConfig.social.whatsapp, label: 'WhatsApp', Icon: FaWhatsapp, tone: 'whatsapp' },
  { href: getMailtoHref(), label: 'Email', Icon: FaEnvelope, tone: 'email' },
];

function CircuitGlow({ id, color }) {
  return (
    <filter id={id} x="-180%" y="-180%" width="460%" height="460%">
      <feGaussianBlur stdDeviation="1.8" result="blur" />
      <feFlood floodColor={color} floodOpacity="0.9" result="tint" />
      <feComposite in="tint" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

function FooterCircuitLeft() {
  return (
    <svg className="footer-circuit footer-circuit-left" viewBox="0 0 92 240" preserveAspectRatio="xMinYMid meet" aria-hidden="true">
      <defs>
        <CircuitGlow id="footer-glow-cyan" color="#67e8f9" />
        <CircuitGlow id="footer-glow-blue" color="#38bdf8" />
      </defs>
      <g fill="none" strokeLinecap="butt" strokeLinejoin="miter">
        <path d="M16 22 V58 L32 74 H58" stroke="rgba(56,189,248,0.62)" strokeWidth="1.05" />
        <path d="M16 58 V118 H40 L54 132 V168" stroke="rgba(34,211,238,0.5)" strokeWidth="0.95" />
        <path d="M40 118 V176 H24 V214" stroke="rgba(125,211,252,0.42)" strokeWidth="0.9" />
        <path d="M16 148 H34" stroke="rgba(56,189,248,0.38)" strokeWidth="0.85" />
        <path d="M58 74 V96" stroke="rgba(167,139,250,0.4)" strokeWidth="0.85" />
        <path d="M32 74 V88 H46" stroke="rgba(56,189,248,0.32)" strokeWidth="0.8" />
      </g>
      <circle cx="16" cy="22" r="2.35" fill="#67e8f9" filter="url(#footer-glow-cyan)" />
      <circle cx="32" cy="74" r="1.55" fill="#38bdf8" />
      <circle cx="58" cy="74" r="2.05" fill="#67e8f9" filter="url(#footer-glow-cyan)" />
      <circle cx="40" cy="118" r="1.45" fill="#7dd3fc" />
      <circle cx="54" cy="168" r="1.9" fill="#c4b5fd" filter="url(#footer-glow-blue)" />
      <circle cx="24" cy="214" r="2.15" fill="#22d3ee" filter="url(#footer-glow-cyan)" />
    </svg>
  );
}

function FooterCircuitRight() {
  return (
    <svg className="footer-circuit footer-circuit-right" viewBox="0 0 92 240" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
      <defs>
        <CircuitGlow id="footer-glow-violet" color="#c084fc" />
        <CircuitGlow id="footer-glow-cyan-r" color="#67e8f9" />
      </defs>
      <g fill="none" strokeLinecap="butt" strokeLinejoin="miter">
        <path d="M76 24 V60 L60 76 H34" stroke="rgba(167,139,250,0.58)" strokeWidth="1.05" />
        <path d="M76 60 V120 H52 L38 134 V170" stroke="rgba(56,189,248,0.46)" strokeWidth="0.95" />
        <path d="M52 120 V178 H68 V216" stroke="rgba(192,132,252,0.42)" strokeWidth="0.9" />
        <path d="M76 150 H58" stroke="rgba(196,181,253,0.36)" strokeWidth="0.85" />
        <path d="M34 76 V98" stroke="rgba(56,189,248,0.36)" strokeWidth="0.85" />
        <path d="M60 76 V90 H46" stroke="rgba(167,139,250,0.3)" strokeWidth="0.8" />
      </g>
      <circle cx="76" cy="24" r="2.35" fill="#c4b5fd" filter="url(#footer-glow-violet)" />
      <circle cx="60" cy="76" r="1.55" fill="#67e8f9" />
      <circle cx="34" cy="76" r="2.05" fill="#38bdf8" filter="url(#footer-glow-cyan-r)" />
      <circle cx="52" cy="120" r="1.45" fill="#a78bfa" />
      <circle cx="38" cy="170" r="1.9" fill="#e879f9" filter="url(#footer-glow-violet)" />
      <circle cx="68" cy="216" r="2.15" fill="#67e8f9" filter="url(#footer-glow-cyan-r)" />
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer className="footer-screen px-4 sm:px-6 lg:px-8">
      <div className="footer-shell">
        <FooterCircuitLeft />
        <FooterCircuitRight />

        <div className="footer-top">
          <div className="footer-brand">
            <BrandMark
              to="/"
              className="footer-logo"
            />
            <p>{siteConfig.brand.tagline}</p>
            <span className="footer-brand-rule" />
          </div>

          <div className="footer-quick">
            <h2>QUICK LINKS</h2>
            <span className="footer-heading-rule" />
            <nav className="footer-qlinks" aria-label="Footer quick links">
              {quickLinks.map(({ id, label, Icon }, index) => (
                <div key={id} className="footer-qlink-wrap">
                  {index > 0 ? <span className="footer-qlink-divider" /> : null}
                  <SectionLink id={id} className="footer-qlink">
                    <Icon />
                    <span>{label}</span>
                  </SectionLink>
                </div>
              ))}
            </nav>
          </div>

          <div className="footer-connect">
            <h2>CONNECT</h2>
            <span className="footer-heading-rule" />
            <div className="footer-socials">
              {socialLinks.map(({ href, label, Icon, tone }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className={`footer-social is-${tone}`}
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {siteConfig.brand.name}
          {siteConfig.brand.suffix}. All rights reserved.
        </p>
        <span className="footer-bottom-rule" />
        <SectionLink id="home" className="footer-top-btn">
          Back to Top
          <span>
            <FaArrowUp />
          </span>
        </SectionLink>
      </div>
    </footer>
  );
}
