/**
 * ProjectsSection — Featured project grid with category filters.
 * Purpose: Show selected work with real UI previews, matching the Projects reference.
 * Used by: HomePage. Data: src/data/projects.js. Anchor: #projects.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects, projectFilters } from '../data/projects';

const ITEMS_PER_LOAD = 3;

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.groups?.includes(activeFilter));
  }, [activeFilter]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  return (
    <section id="projects" className="projects-screen px-4 sm:px-6 lg:px-8">
      <div className="projects-fx" aria-hidden="true">
        <div className="projects-ambient" />
        <svg
          className="projects-constellation"
          viewBox="0 0 1440 720"
          preserveAspectRatio="xMidYMid slice"
        >
        <g stroke="rgba(56,189,248,0.3)" strokeWidth="1" fill="none">
          <path d="M20 140 L96 208 L46 292 L128 358 L58 446 L144 528 L72 612" />
        </g>
        <g stroke="rgba(34,211,238,0.2)" strokeWidth="0.9" fill="none">
          <path d="M88 118 L158 188 L108 272 L186 336 L122 422 L198 510" />
        </g>
        <g stroke="rgba(56,189,248,0.26)" strokeWidth="1" fill="none">
          <path d="M1420 138 L1342 206 L1396 292 L1312 356 L1384 444 L1298 528 L1370 612" />
        </g>
        <g stroke="rgba(125,211,252,0.18)" strokeWidth="0.9" fill="none">
          <path d="M1356 116 L1286 184 L1340 270 L1260 336 L1326 424 L1248 514" />
        </g>
        {[
          [20, 140], [96, 208], [46, 292], [128, 358], [58, 446], [144, 528], [72, 612],
          [88, 118], [158, 188], [186, 336], [198, 510],
          [1420, 138], [1342, 206], [1396, 292], [1312, 356], [1384, 444], [1298, 528], [1370, 612],
          [1356, 116], [1286, 184], [1260, 336], [1248, 514],
        ].map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}-${index}`}
            cx={cx}
            cy={cy}
            r={index % 4 === 0 ? 2.4 : 1.5}
            fill="rgba(34,211,238,0.78)"
          />
        ))}
        </svg>
      </div>

      <div className="projects-main relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="projects-kicker">PROJECTS</p>
          <h2>
            Selected work with{' '}
            <span className="projects-heading-accent">real-world impact.</span>
          </h2>
          <p className="projects-lead">
            Browse recent projects and use the technology filters to focus on your preferred stack.
          </p>
        </div>

        <div className="projects-filters">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilterChange(filter)}
              className={activeFilter === filter ? 'is-active' : ''}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 ? (
          <p className="projects-empty">No projects in this category yet.</p>
        ) : null}

        {hasMore ? (
          <div className="projects-more">
            <button type="button" onClick={handleShowMore}>
              See More Projects →
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
