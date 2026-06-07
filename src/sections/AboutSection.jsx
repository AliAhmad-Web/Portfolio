import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">About Me</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">I craft thoughtful interfaces that feel as great as they look.</h2>
          <p className="mt-6 text-slate-300">I am a front-end developer focused on building reliable React applications with strong UX, responsive design, and maintainable architecture. I combine visual polish with practical implementation to turn ideas into real, production-ready products.</p>
          <p className="mt-4 text-slate-300">From landing pages to data-rich dashboards, I create experiences that are fast, accessible, and easy to scale.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <div className="grid gap-4">
            {[
              ['Experience', '1+ years building polished React interfaces'],
              ['Specialization', 'Responsive design, accessibility, animations'],
              ['Location', 'Pakistan'],
              ['Focus', 'Performance, SEO, and clean architecture'],
            ].map(([label, value]) => (
              <article key={label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
