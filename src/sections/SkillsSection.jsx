/**
 * SkillsSection — End-to-end capability cards for the landing page.
 * Purpose: Present Full-Stack & AI skills in the same premium visual system as Home/About.
 * Used by: HomePage. Data: src/data/skills.jsx.
 */

import { motion } from 'framer-motion';
import { HiOutlineCodeBracket } from 'react-icons/hi2';
import skills from '../data/skills.jsx';
import SectionBadge from '../components/SectionBadge';

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-screen px-4 sm:px-6 lg:px-8">
      <div className="skills-ambient" aria-hidden="true" />
      <svg className="skills-constellation" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="rgba(56,189,248,0.28)" strokeWidth="1" fill="none">
          <path d="M40 180 L120 240 L70 330 L160 390 L90 480 L170 560" />
          <path d="M1280 140 L1360 210 L1290 300 L1380 370 L1310 470 L1390 560" />
        </g>
        <g stroke="rgba(251,191,36,0.2)" strokeWidth="0.9" fill="none">
          <path d="M90 150 L150 220 L110 300 L190 360" />
          <path d="M1320 190 L1388 260 L1334 340 L1410 410" />
        </g>
        {[
          [40, 180], [120, 240], [70, 330], [160, 390], [90, 480], [170, 560],
          [1280, 140], [1360, 210], [1290, 300], [1380, 370], [1310, 470], [1390, 560],
        ].map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={index % 3 === 0 ? 2.4 : 1.6}
            fill={index % 2 === 0 ? 'rgba(56,189,248,0.75)' : 'rgba(251,191,36,0.55)'}
          />
        ))}
      </svg>

      <div className="skills-main relative z-10 mx-auto max-w-7xl text-center">
        <div className="section-badge-row">
          <SectionBadge icon={HiOutlineCodeBracket}>SKILLS</SectionBadge>
        </div>
        <h2>
          Core tools &amp; technologies I use to build{' '}
          <span className="skills-heading-accent">modern digital solutions.</span>
        </h2>
        <p className="skills-lead">
          End-to-end skills across frontend, backend, databases, AI, automation, and tools that help
          me build scalable, smart, and efficient solutions.
        </p>
        <span className="stats-divider" aria-hidden="true" />

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className={`skills-card is-${skill.tone}`}
            >
              <span className="skills-card-icon">
                <skill.Icon />
              </span>
              <h3>{skill.name}</h3>
              <p className="skills-card-desc">{skill.description}</p>
              <p className="skills-card-tags">
                {skill.tags.map((tag, tagIndex) => (
                  <span key={tag}>
                    {tagIndex > 0 ? <span className="skills-tag-dot"> • </span> : null}
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
