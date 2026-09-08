/**
 * GitHubStatsSection — Development journey metrics grid.
 * Purpose: Display key stats (projects, commits, etc.) on the landing page.
 * Used by: HomePage. Data: src/data/stats.jsx.
 */

import { motion } from 'framer-motion';
import stats from '../data/stats.jsx';

export default function GitHubStatsSection() {
  return (
    <section id="stats" className="site-section">
      <div className="site-wrap">
        <div className="section-head">
          <p className="ui-kicker">GitHub Stats</p>
          <h2 className="ui-heading">GitHub Stats & Development Journey</h2>
          <p className="ui-lead">
            A snapshot of my continuous learning, coding activity, and project-building experience.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="ui-card stat-card"
            >
              <div className="ui-icon">{stat.icon}</div>
              <div className="num">
                <b>{stat.value}</b>
                <em>{stat.suffix}</em>
              </div>
              <h3>{stat.label}</h3>
              <p>{stat.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
