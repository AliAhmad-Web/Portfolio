/**
 * GitHubStatsSection — Development journey metrics grid.
 * Purpose: Display key stats (projects, commits, etc.) on the landing page.
 * Used by: HomePage. Data: src/data/stats.jsx.
 */

import { motion } from 'framer-motion';
import { HiOutlineChartBar } from 'react-icons/hi2';
import stats from '../data/stats.jsx';
import AnimatedCounter from '../components/AnimatedCounter';
import SectionBadge from '../components/SectionBadge';
import { useInView } from '../hooks/useInView';

export default function GitHubStatsSection() {
  const [sectionRef, inView] = useInView(0.3);

  return (
    <section ref={sectionRef} id="stats" className="stats-screen px-4 sm:px-6 lg:px-8">
      <div className="stats-ambient" aria-hidden="true" />
      <svg
        className="stats-constellation"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="rgba(56,189,248,0.32)" strokeWidth="1" fill="none">
          <path d="M18 168 L92 228 L42 312 L128 372 L54 458 L140 528 L70 612" />
          <path d="M1298 132 L1382 198 L1312 286 L1404 352 L1332 448 L1418 528 L1350 612" />
        </g>
        <g stroke="rgba(168,85,247,0.24)" strokeWidth="0.9" fill="none">
          <path d="M78 140 L148 204 L98 286 L176 346 L112 430 L188 510" />
          <path d="M1328 168 L1408 236 L1350 324 L1430 398 L1372 486 L1440 560" />
        </g>
        <g stroke="rgba(251,146,60,0.22)" strokeWidth="0.9" fill="none">
          <path d="M48 560 L160 610 L280 575 L420 640 L560 600 L720 655 L880 605 L1040 650 L1180 600 L1320 640 L1420 590" />
          <path d="M110 640 L230 680 L370 650 L520 695 L690 660 L850 700 L1010 665 L1160 698 L1300 670" />
        </g>
        {[
          [18, 168], [92, 228], [42, 312], [128, 372], [54, 458], [140, 528], [70, 612],
          [1298, 132], [1382, 198], [1312, 286], [1404, 352], [1332, 448], [1418, 528], [1350, 612],
          [78, 140], [148, 204], [176, 346], [188, 510],
          [160, 610], [280, 575], [420, 640], [560, 600], [720, 655], [880, 605],
          [1040, 650], [1180, 600], [1320, 640], [230, 680], [520, 695], [1010, 665],
        ].map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}-${index}`}
            cx={cx}
            cy={cy}
            r={index % 4 === 0 ? 2.5 : 1.55}
            fill={index % 3 === 0 ? 'rgba(251,146,60,0.62)' : 'rgba(56,189,248,0.78)'}
          />
        ))}
      </svg>

      <div className="stats-main relative z-10 mx-auto max-w-7xl text-center">
        <div className="section-badge-row">
          <SectionBadge icon={HiOutlineChartBar}>GITHUB STATS</SectionBadge>
        </div>
        <h2>
          GitHub Stats &amp;{' '}
          <span className="stats-heading-accent">Development Journey</span>
        </h2>
        <p className="stats-lead">
          A snapshot of my continuous learning, coding activity, and project-building experience.
        </p>
        <span className="stats-divider" />

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className={`stats-card is-${stat.tone}`}
            >
              <span className="stats-card-icon">
                <stat.Icon />
              </span>
              <p className="stats-card-value">
                <AnimatedCounter value={stat.value} active={inView} />
              </p>
              <h3>{stat.label}</h3>
              <p className="stats-card-desc">{stat.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
