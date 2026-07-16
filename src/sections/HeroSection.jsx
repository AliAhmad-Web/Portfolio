/**
 * HeroSection — Above-the-fold introduction for the portfolio.
 * Purpose: Present name, role, short bio, CTAs, and profile image.
 * Used by: HomePage.
 */

import { motion } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';
import { siteConfig } from '../data/site';
import heroImage from '../assets/ailAhmad.png';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.10),transparent_40%)]" />
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center">
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              Hi, I'm {siteConfig.brand.fullName}
            </span>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {siteConfig.brand.role}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 lg:mx-0 lg:text-lg">
              I specialize in crafting fast, responsive, and visually engaging web experiences with
              React.js, JavaScript, and Tailwind CSS. I enjoy turning ideas into modern digital
              products through clean code, intuitive user interfaces, and performance-focused
              development.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300 lg:mx-0 lg:text-lg">
              With a strong passion for continuous learning and problem-solving, I build projects
              that combine functionality, accessibility, and exceptional user experience.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-900/30 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                View Projects
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
              >
                Hire Me
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="shrink-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-cyan-400/20 blur-3xl" />
              <img
                src={heroImage}
                alt={`${siteConfig.brand.fullName} - ${siteConfig.brand.role}`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative z-10 h-64 w-64 rounded-full border-4 border-cyan-400/40 object-cover shadow-2xl shadow-cyan-500/20 sm:h-72 sm:w-72 md:h-80 md:w-80"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
