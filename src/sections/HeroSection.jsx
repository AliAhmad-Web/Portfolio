/**
 * HeroSection — Above-the-fold introduction for the portfolio.
 * Purpose: Position Ali Ahmad as a builder of complete digital solutions.
 * Used by: HomePage.
 */

import { motion } from 'framer-motion';
import {
  HiOutlineArrowRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCpuChip,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { scrollToSection } from '../utils/scrollToSection';
import HeroOrbit from '../components/hero/HeroOrbit';

const VALUE_PROPS = [
  { title: 'AI-Driven', subtitle: 'Smarter Solutions', Icon: HiOutlineCpuChip },
  { title: 'End-to-End', subtitle: 'From Idea to Launch', Icon: HiOutlineRocketLaunch },
  { title: 'Reliable & Secure', subtitle: 'Built to Scale', Icon: HiOutlineShieldCheck },
  { title: 'Business Focused', subtitle: 'Real-World Results', Icon: HiOutlineChartBar },
];

const HERO_METRICS = [
  { value: '25+', label: 'Satisfied Clients', tone: 'gold' },
  { value: '30+', label: 'Projects Delivered', tone: 'blue' },
  { value: '100%', label: 'Client Satisfaction', tone: 'green' },
];

export default function HeroSection() {
  return (
    <section id="home" className="hero-screen relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-aurora" aria-hidden="true" />

      <div className="hero-main relative z-10 mx-auto grid max-w-7xl items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-3 xl:gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl text-center lg:max-w-none lg:text-left"
        >
          <span className="hero-badge">
            <HiOutlineSparkles className="text-amber-300" />
            AI • Automation • Full-Stack Solutions
          </span>

          <h1 className="font-sora mt-3 font-extrabold leading-[1.12] tracking-tight text-white">
            Crafting Intelligent
            <br />
            <span className="hero-text-gold">Digital Solutions</span> with{' '}
            <span className="hero-text-gold">AI</span>
          </h1>

          <p className="hero-script mt-1.5 text-amber-100">
            Beyond Code. Real Impact.
          </p>

          <p className="hero-copy mx-auto mt-2.5 max-w-xl text-slate-300 lg:mx-0">
            I build complete, modern, and scalable digital systems that automate processes,
            enhance productivity, and <span className="font-medium text-amber-300">accelerate growth</span>{' '}
            for businesses and startups.
          </p>

          <div className="mx-auto mt-4 grid max-w-xl grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 lg:mx-0 lg:max-w-none">
            {VALUE_PROPS.map((item) => (
              <div key={item.title} className="hero-value">
                <item.Icon className="hero-value-icon" />
                <div>
                  <p className="text-[12px] font-semibold text-white">{item.title}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-400">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-2.5 sm:flex-row lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="hero-cta-primary"
            >
              Explore My Work
              <HiOutlineArrowRight className="text-base" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="hero-cta-secondary"
            >
              <HiOutlineChatBubbleLeftRight className="text-base" />
              Discuss Your Project
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="relative mx-auto w-full overflow-hidden"
        >
          <HeroOrbit />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="hero-metrics relative z-10 mx-auto max-w-7xl"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="hero-proof" aria-hidden="true">
              <span className="is-a" />
              <span className="is-b" />
              <span className="is-c" />
              <span className="is-d" />
              <span className="hero-proof-plus">+</span>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-7">
              {HERO_METRICS.map((metric) => (
                <div key={metric.label} className="text-center sm:text-left">
                  <p className={`font-sora text-xl font-extrabold sm:text-2xl is-${metric.tone}`}>
                    {metric.value}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-300 sm:text-[11px]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 lg:justify-end">
            <blockquote className="flex max-w-sm items-start gap-2.5 text-left">
              <span className="font-script text-2xl leading-none text-amber-300" aria-hidden="true">
                “
              </span>
              <p className="pt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Turning complex ideas into simple, powerful solutions.
              </p>
            </blockquote>
            <p className="font-script shrink-0 text-[1.65rem] text-amber-300">Ali Ahmad</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
