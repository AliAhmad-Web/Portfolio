// SkillsSection: Displays a grid of core technical skills and tools the developer uses.
// Each skill card shows an icon, skill name, and brief description.
// Uses Framer Motion for staggered entrance animations and hover effects.
// Layout: 1 column (mobile) → 2 (tablet) → 4 (desktop xl).

import { motion } from 'framer-motion';
// Icons for each skill - imported individually from react-icons/fa.
import { FaCode, FaReact, FaServer, FaPalette, FaRocket, FaGitAlt, FaLayerGroup, FaUniversalAccess, FaMobileAlt, FaStar } from 'react-icons/fa';

// Skills data array: name, icon component, and description for each skill.
const skills = [
  { name: 'JavaScript', icon: <FaCode />, description: 'Interactive logic, DOM control, and modern frontend behavior.' },
  { name: 'React', icon: <FaReact />, description: 'Reusable components, state handling, and smooth UI flows.' },
  { name: 'Next.js', icon: <FaRocket />, description: 'Fast routing, SEO-ready pages, and scalable app structure.' },
  { name: 'Tailwind CSS', icon: <FaPalette />, description: 'Clean utility-first styling with flexible responsive design.' },
  { name: 'Framer Motion', icon: <FaStar />, description: 'Subtle motion, polished transitions, and better user engagement.' },
  { name: 'Git', icon: <FaGitAlt />, description: 'Version control for clean collaboration and reliable updates.' },
  { name: 'REST APIs', icon: <FaServer />, description: 'Data fetching, integration, and structured app communication.' },
  { name: 'Accessibility', icon: <FaUniversalAccess />, description: 'Inclusive interfaces with better keyboard and screen-reader support.' },
  { name: 'Responsive Design', icon: <FaMobileAlt />, description: 'Layouts that adapt beautifully across mobile, tablet, and desktop.' },
  { name: 'vibe coding', icon: <FaLayerGroup />, description: 'Fast prototyping, creative iteration, and idea-to-ui execution.' },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">
        {/* Section header */}
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Skills</p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Core tools I use to build modern products.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">A mix of UI, frontend, and workflow skills that helps me ship high-quality work across devices and teams.</p>

        {/* Skills grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}  // Staggered delay for each card.
              whileHover={{ y: -6, scale: 1.02 }}                   // Lift up slightly on hover.
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-cyan-950/10 backdrop-blur-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{skill.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}