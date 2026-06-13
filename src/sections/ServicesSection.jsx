// ServicesSection: Displays the services offered by the developer in a responsive card grid.
// Each service card features an icon, title, and description.
// Uses Framer Motion for staggered entrance animations and lift-on-hover.
// Layout: 1 column (mobile) → 2 (tablet/sm) → 3 (desktop/lg).

import { motion } from 'framer-motion';
import { FaReact, FaMobileAlt, FaRocket, FaShoppingCart, FaRedo, FaLaptopCode } from 'react-icons/fa';

// Services data: title, description, and corresponding icon for each service offered.
const services = [
  {
    title: 'Frontend Development',
    description: 'Building modern and responsive web applications using React.js and JavaScript.',
    icon: <FaLaptopCode />,
  },
  {
    title: 'React.js Development',
    description: 'Creating fast, scalable, and maintainable React applications.',
    icon: <FaReact />,
  },
  {
    title: 'Responsive Web Design',
    description: 'Ensuring websites look perfect on desktop, tablet, and mobile devices.',
    icon: <FaMobileAlt />,
  },
  {
    title: 'Landing Page Development',
    description: 'Designing high-converting and professional landing pages.',
    icon: <FaRocket />,
  },
  {
    title: 'E-Commerce Development',
    description: 'Building modern online store interfaces and shopping experiences.',
    icon: <FaShoppingCart />,
  },
  {
    title: 'Website Redesign',
    description: 'Improving existing websites with modern UI/UX and better performance.',
    icon: <FaRedo />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">
        {/* Section header */}
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Services</p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Services</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          I provide modern web development solutions focused on performance, responsiveness, and user experience.
        </p>

        {/* Services card grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}  // Staggered entrance.
              whileHover={{ y: -6, scale: 1.02 }}                   // Lift up on hover.
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-cyan-950/10 backdrop-blur-xl"
            >
              {/* Service icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                {service.icon}
              </div>
              {/* Title and description */}
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}