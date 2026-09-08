/**
 * HeroOrbit — Right-side hero visual matching the design reference.
 * Purpose: Portrait, gold ring, tilted orbits, and 7 glass tiles.
 * Used by: HeroSection.
 */

import {
  HiOutlineCpuChip,
  HiOutlineCog6Tooth,
  HiOutlineGlobeAlt,
  HiOutlineChartBar,
  HiOutlineSquares2X2,
  HiOutlineShieldCheck,
  HiOutlineCloud,
} from 'react-icons/hi2';
import heroImage from '../../assets/ailAhmad.png';
import { siteConfig } from '../../data/site';

const OUTER_NODES = [
  { label: 'AI Intelligence', Icon: HiOutlineCpuChip, tone: 'gold', angle: -90 },
  { label: 'Web Applications', Icon: HiOutlineGlobeAlt, tone: 'blue', angle: -32 },
  { label: 'Secure & Scalable', Icon: HiOutlineShieldCheck, tone: 'green', angle: 50 },
  { label: 'Custom Systems & Dashboards', Icon: HiOutlineSquares2X2, tone: 'magenta', angle: 140 },
];

const INNER_NODES = [
  { label: 'Automation & Workflows', Icon: HiOutlineCog6Tooth, tone: 'cyan', angle: -148 },
  { label: 'Analytics & Insights', Icon: HiOutlineChartBar, tone: 'violet', angle: 10 },
  { label: 'Cloud Solutions', Icon: HiOutlineCloud, tone: 'blue', angle: 180 },
];

function angleToDistance(angle) {
  const deg = ((angle % 360) + 360) % 360;
  return `${(deg / 360) * 100}%`;
}

function OrbitLayer({ nodes, layer, hideFrom = 99 }) {
  return (
    <div className={`hero-orbit-cards hero-orbit-cards-${layer}`}>
      {nodes.map((node, index) => (
        <div
          key={node.label}
          className={`hero-orbit-slot ${index >= hideFrom ? 'max-sm:hidden' : ''}`}
          style={{ '--dist': angleToDistance(node.angle) }}
        >
          <div className={`hero-orbit-node-card is-${node.tone}`}>
            <span className="hero-orbit-node-icon">
              <node.Icon />
            </span>
            <span>{node.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroOrbit() {
  return (
    <div className="hero-orbit">
      <div className="hero-orbit-bound">
        <div className="hero-orbit-floor" aria-hidden="true">
          <svg viewBox="0 0 560 150" preserveAspectRatio="none">
            <path d="M10 88 C 120 40, 200 110, 280 72 C 360 34, 440 108, 550 70" fill="none" stroke="rgba(251,191,36,0.35)" strokeWidth="1.2" />
            <path d="M0 112 C 130 68, 220 128, 290 96 C 370 62, 450 130, 560 98" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" />
            <path d="M20 132 C 150 92, 230 148, 300 118 C 390 84, 470 146, 540 120" fill="none" stroke="rgba(56,189,248,0.16)" strokeWidth="1" />
          </svg>
        </div>

        <div className="hero-orbit-glow" />
        <div className="hero-orbit-particles" aria-hidden="true" />

        <svg className="hero-orbit-svg" viewBox="0 0 560 560" aria-hidden="true">
          <defs>
            <linearGradient id="hero-arc-gold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
              <stop offset="45%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-arc-cyan" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <mask id="hero-orbit-face-mask">
            <rect width="560" height="560" fill="white" />
            <circle cx="280" cy="280" r="168" fill="black" />
          </mask>
          <g mask="url(#hero-orbit-face-mask)">
            <ellipse className="hero-orbit-path-outer" cx="280" cy="282" rx="228" ry="90" fill="none" stroke="url(#hero-arc-gold)" strokeWidth="1.5" />
            <ellipse className="hero-orbit-path-mid" cx="280" cy="282" rx="190" ry="74" fill="none" stroke="url(#hero-arc-cyan)" strokeWidth="1.2" />
            <ellipse className="hero-orbit-path-inner" cx="280" cy="282" rx="156" ry="60" fill="none" stroke="url(#hero-arc-gold)" strokeWidth="0.9" />
            <circle className="hero-orbit-bead" r="2.2" fill="#fbbf24">
              <animateMotion dur="18s" repeatCount="indefinite" rotate="0">
                <mpath href="#hero-bead-path" />
              </animateMotion>
            </circle>
            <circle className="hero-orbit-bead" r="1.8" fill="#22d3ee">
              <animateMotion dur="14s" begin="-6s" repeatCount="indefinite" rotate="0">
                <mpath href="#hero-bead-path-2" />
              </animateMotion>
            </circle>
          </g>
          <path id="hero-bead-path" d="M52,282 a228,90 0 1,1 456,0 a228,90 0 1,1 -456,0" fill="none" />
          <path id="hero-bead-path-2" d="M90,282 a190,74 0 1,0 380,0 a190,74 0 1,0 -380,0" fill="none" />
        </svg>

        <OrbitLayer nodes={OUTER_NODES} layer="outer" />
        <OrbitLayer nodes={INNER_NODES} layer="inner" hideFrom={2} />

        <div className="hero-orbit-core">
          <div className="hero-orbit-core-halo" />
          <div className="hero-orbit-core-ring" />
          <div className="hero-orbit-core-frame">
            <img
              src={heroImage}
              alt={`${siteConfig.brand.fullName}, digital solutions specialist`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="hero-orbit-portrait"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
