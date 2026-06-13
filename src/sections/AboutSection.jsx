// AboutSection: A brief "About Me" section that introduces Ali Ahmad, his expertise,
// and key strengths as a developer. Uses Framer Motion for entrance animations.
// Layout: Two columns on desktop (text left, highlights right), stacked on mobile.

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Introduction text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">About Me</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Turning ideas into real, functional digital products.</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              I'm Ali Ahmad, a frontend developer based in Pakistan with a strong focus on React.js, JavaScript, and modern UI development. I started my journey into web development driven by curiosity and a passion for building things that people enjoy using.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Every project I take on is an opportunity to solve real problems, improve user experience, and write clean, scalable code. I believe good design is invisible, but great code makes it possible.
            </p>
          </motion.div>

          {/* Right column: Highlighted points */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {[
              { number: '1+', label: 'Years of Experience', desc: 'Hands-on work with live and personal projects.' },
              { number: '15+', label: 'Projects Delivered', desc: 'Web apps, landing pages, and interactive tools.' },
              { number: '100%', label: 'Client Satisfaction', desc: 'Focused on quality communication and results.' },
              { number: '24/7', label: 'Support & Availability', desc: 'Always approachable for discussions and feedback.' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-950/10 backdrop-blur-xl">
                <p className="text-3xl font-extrabold text-cyan-400">{item.number}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}