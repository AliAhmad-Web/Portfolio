/**
 * ServicesSection — Customer-facing service cards for the landing page.
 * Purpose: Present 10 digital-solution services in the same premium visual system as Skills/Stats.
 * Used by: HomePage. Data: src/data/services.jsx. Anchor: #services (Solutions nav).
 */

import { motion } from 'framer-motion';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import services from '../data/services.jsx';
import SectionBadge from '../components/SectionBadge';

export default function ServicesSection() {
  return (
    <section id="services" className="services-screen px-4 sm:px-6 lg:px-8">
      <div className="services-ambient" aria-hidden="true" />
      <svg
        className="services-constellation"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="rgba(56,189,248,0.32)" strokeWidth="1" fill="none">
          <path d="M22 150 L98 214 L48 298 L132 360 L60 448 L148 522 L78 608" />
        </g>
        <g stroke="rgba(34,211,238,0.22)" strokeWidth="0.9" fill="none">
          <path d="M86 128 L156 196 L104 278 L184 338 L118 424 L196 508" />
        </g>
        <g stroke="rgba(251,146,60,0.28)" strokeWidth="1" fill="none">
          <path d="M1418 142 L1340 208 L1394 294 L1310 358 L1382 448 L1296 526 L1368 610" />
        </g>
        <g stroke="rgba(232,121,249,0.22)" strokeWidth="0.9" fill="none">
          <path d="M1354 122 L1284 188 L1338 272 L1258 338 L1324 426 L1246 512" />
        </g>
        {[
          [22, 150], [98, 214], [48, 298], [132, 360], [60, 448], [148, 522], [78, 608],
          [86, 128], [156, 196], [184, 338], [196, 508],
          [1418, 142], [1340, 208], [1394, 294], [1310, 358], [1382, 448], [1296, 526], [1368, 610],
          [1354, 122], [1284, 188], [1258, 338], [1246, 512],
        ].map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}-${index}`}
            cx={cx}
            cy={cy}
            r={index % 4 === 0 ? 2.5 : 1.55}
            fill={index < 12 ? 'rgba(56,189,248,0.78)' : 'rgba(251,146,60,0.7)'}
          />
        ))}
      </svg>

      <div className="services-main relative z-10 mx-auto max-w-7xl text-center">
        <div className="section-badge-row">
          <SectionBadge icon={HiOutlineBriefcase}>SERVICES</SectionBadge>
        </div>
        <h2>Services</h2>
        <p className="services-lead">
          I provide end-to-end digital solutions to help businesses and individuals build, automate,
          and scale with modern technology.
        </p>
        <span className="stats-divider" aria-hidden="true" />

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: index * 0.03 }}
              className={`services-card is-${service.tone}`}
            >
              <span className="services-card-icon">
                <service.Icon />
              </span>
              <h3>{service.title}</h3>
              <p className="services-card-desc">{service.description}</p>
              <p className="services-card-tags">
                {service.tags.map((tag, tagIndex) => (
                  <span key={tag}>
                    {tagIndex > 0 ? <span className="services-tag-dot"> • </span> : null}
                    {tag}
                  </span>
                ))}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
