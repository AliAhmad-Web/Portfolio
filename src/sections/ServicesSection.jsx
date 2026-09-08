/**
 * ServicesSection — Grid of services offered.
 * Purpose: Present service cards with icons and short descriptions.
 * Used by: HomePage. Data: src/data/services.jsx.
 */

import { motion } from 'framer-motion';
import services from '../data/services.jsx';

export default function ServicesSection() {
  return (
    <section id="services" className="site-section">
      <div className="site-wrap">
        <div className="section-head">
          <p className="ui-kicker">Services</p>
          <h2 className="ui-heading">Services</h2>
          <p className="ui-lead">
            I provide end-to-end digital solutions to help businesses and individuals build, automate,
            and scale with modern technology.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="ui-card service-card"
            >
              <div className="ui-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.tags?.length ? (
                <p className="tags">{service.tags.join(' • ')}</p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
