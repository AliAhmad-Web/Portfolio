/**
 * GitHubStatsSection — Development journey metrics grid.
 * Purpose: Display key stats (projects, commits, etc.) on the landing page.
 * Used by: HomePage. Data: src/data/stats.jsx.
 */

import { motion } from 'framer-motion';
import stats from '../data/stats.jsx';

export default function GitHubStatsSection() {
  return (
    <section id="stats" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">GitHub Stats</p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          GitHub Stats & Development Journey
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          A snapshot of my continuous learning, coding activity, and project-building experience.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-cyan-950/10 backdrop-blur-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                {stat.icon}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                <span className="text-lg font-bold text-cyan-400">{stat.suffix}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{stat.label}</h3>
              <p className="mt-1 text-sm text-slate-300">{stat.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
