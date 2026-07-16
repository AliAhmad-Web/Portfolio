/**
 * ServicesSection — Grid of services offered.
 * Purpose: Present service cards with icons and short descriptions.
 * Used by: HomePage. Data: src/data/services.jsx.
 */

import { motion } from 'framer-motion';
import services from '../data/services.jsx';

export default function ServicesSection() {
  return (
    <section id="services" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Services</p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Services</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          I provide modern web development solutions focused on performance, responsiveness, and
          user experience.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-cyan-950/10 backdrop-blur-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
