/**
 * SkillsSection — Grid of core technical skills.
 * Purpose: Present skill cards with icons and short descriptions.
 * Used by: HomePage. Data: src/data/skills.jsx.
 */

import { motion } from 'framer-motion';
import skills from '../data/skills.jsx';

export default function SkillsSection() {
  return (
    <section id="skills" className="site-section">
      <div className="site-wrap">
        <div className="section-head">
          <p className="ui-kicker">Skills</p>
          <h2 className="ui-heading">
            Core tools & technologies I use to build modern digital solutions.
          </h2>
          <p className="ui-lead">
            End-to-end skills across frontend, backend, databases, AI, automation, and tools that
            help me build scalable, smart, and efficient solutions.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="ui-card skill-card"
            >
              <div className="ui-icon">{skill.icon}</div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
              {skill.tags?.length ? (
                <p className="tags">{skill.tags.join(' • ')}</p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
