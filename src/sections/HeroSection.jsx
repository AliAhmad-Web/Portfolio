import { motion } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_25%)]" />
      <div className="mx-auto flex min-h-[78vh] max-w-7xl items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative z-10 mx-auto w-full max-w-4xl text-center lg:text-center">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">React Developer • UI Engineer • Problem Solver</span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            I design fast, elegant, and conversion-focused digital experiences.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 lg:text-xl">
            I build modern React portfolios and web products with clean interfaces, thoughtful animations, and production-level code quality.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-center">
            <button type="button" onClick={() => scrollToSection('projects')} className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-900/30 transition hover:-translate-y-0.5 hover:bg-cyan-300">View Projects</button>
            <button type="button" onClick={() => scrollToSection('contact')} className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200">Hire Me</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
