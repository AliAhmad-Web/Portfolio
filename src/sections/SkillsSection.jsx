/**
 * SkillsSection — Grid of core technical skills.
 * Purpose: Present skill cards with icons and short descriptions.
 * Used by: HomePage. Data: src/data/skills.jsx.
 */

import { motion } from 'framer-motion';
import skills from '../data/skills.jsx';

export default function SkillsSection() {
  return (
    <section id="skills" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Skills</p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Core tools I use to build modern products.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          A mix of UI, frontend, and workflow skills that helps me ship high-quality work across
          devices and teams.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-cyan-950/10 backdrop-blur-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{skill.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
