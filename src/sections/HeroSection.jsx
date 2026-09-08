/**
 * HeroSection — Above-the-fold introduction for the portfolio.
 * Purpose: Present name, role, short bio, CTAs, and profile image.
 * Used by: HomePage.
 */

import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import {
  HiOutlineCloud,
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineBolt,
} from 'react-icons/hi2';
import { scrollToSection } from '../utils/scrollToSection';
import { siteConfig } from '../data/site';
import heroImage from '../assets/ailAhmad.png';

const VALUE_POINTS = [
  { title: 'AI-Driven', subtitle: 'Smart Solutions' },
  { title: 'End-to-End', subtitle: 'From Idea to Launch' },
  { title: 'Reliable & Secure', subtitle: 'Built to Scale' },
  { title: 'Business Focused', subtitle: 'Real-World Results' },
];

const HERO_METRICS = [
  { value: '25+', label: 'Satisfied Clients' },
  { value: '30+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
];

const DECOR_NODES = [
  { Icon: HiOutlineSparkles, style: { top: '6%', left: '12%' } },
  { Icon: HiOutlineCodeBracket, style: { top: '18%', right: '4%' } },
  { Icon: HiOutlineCpuChip, style: { top: '48%', right: '-2%' } },
  { Icon: HiOutlineCloud, style: { bottom: '16%', right: '8%' } },
  { Icon: HiOutlineShieldCheck, style: { bottom: '8%', left: '10%' } },
  { Icon: HiOutlineBolt, style: { top: '42%', left: '-2%' } },
];

export default function HeroSection() {
  return (
    <section id="home" className="site-section hero-screen">
      <div className="site-wrap">
        <div className="hero-main">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center lg:text-left"
          >
            <span className="hero-badge">
              AI • Automation • Full-Stack Solutions
            </span>

            <h1 className="hero-title">
              Crafting Intelligent
              <br />
              Digital Solutions with AI
            </h1>

            <p className="hero-tagline">Beyond Code. Real Impact.</p>

            <p className="hero-copy mx-auto lg:mx-0">
              I build complete, modern, and scalable digital systems that automate processes,
              enhance productivity, and accelerate growth for businesses and startups.
            </p>

            <div className="hero-values mx-auto lg:mx-0">
              {VALUE_POINTS.map((item) => (
                <div key={item.title} className="hero-value">
                  <span className="hero-check" aria-hidden="true">
                    <FiCheck strokeWidth={3} />
                  </span>
                  <div>
                    <p className="t">{item.title}</p>
                    <p className="s">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-ctas justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn-primary"
              >
                Explore My Work
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-ghost"
              >
                Discuss Your Project
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hero-visual"
          >
            <div className="hero-glow" aria-hidden="true" />
            <div className="hero-frame">
              <div className="hero-ring-2" aria-hidden="true" />
              <div className="hero-ring" aria-hidden="true" />
              <img
                src={heroImage}
                alt={`${siteConfig.brand.fullName} - ${siteConfig.brand.role}`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="hero-photo"
              />
              {DECOR_NODES.map((node, index) => (
                <span key={index} className="hero-node" style={node.style} aria-hidden="true">
                  <node.Icon />
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="hero-metrics"
        >
          <div className="hero-metrics-inner">
            <div className="flex flex-wrap items-center gap-5">
              <div className="hero-avatars" aria-hidden="true">
                <img src={heroImage} alt="" />
                <span className="a" />
                <span className="b" />
                <span className="c" />
              </div>
              <div className="hero-metric-row">
                {HERO_METRICS.map((metric) => (
                  <div key={metric.label}>
                    <p className="n">{metric.value}</p>
                    <p className="l">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="hero-quote">
              Turning complex ideas into simple, powerful solutions.{' '}
              <span className="font-semibold text-white">{siteConfig.brand.fullName}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
