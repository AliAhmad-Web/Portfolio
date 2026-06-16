// AboutSection: A brief "About Me" section that introduces Ali Ahmad, his expertise,
// and key strengths as a developer. Uses Framer Motion for entrance animations.
// Layout: Two columns on desktop (text left, highlights right), stacked on mobile.

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Introduction text - vertically centered to balance with right column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">About Me</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">A self-taught developer focused on frontend excellence.</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              I am a self-taught Frontend Developer passionate about creating modern and responsive web experiences. I enjoy turning ideas into clean, user-friendly interfaces using React.js, JavaScript, HTML, CSS, and Tailwind CSS. I continuously improve my skills through hands-on development and real-world practice.
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
              { number: '1+', label: 'Years Learning Frontend Development', desc: 'Dedicated self-study and hands-on practice in React.js, JavaScript, and Tailwind CSS.' },
              { number: '15+', label: 'Personal & Practice Projects', desc: 'Web apps, landing pages, and interactive tools built through learning and experimentation.' },
              { number: '100%', label: 'Commitment To Learning', desc: 'Consistent daily effort to improve skills, explore new tools, and grow as a developer.' },
              { number: '24/7', label: 'Daily Coding & Skill Development', desc: 'Spending time every day writing code, solving problems, and refining frontend expertise.' },
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