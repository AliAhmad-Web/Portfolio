// ProjectsSection: Displays portfolio projects in a responsive grid with filtering and "load more".
// Clicking a card opens the project detail page (product-style), not a popup.

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

  const handleFilterChange = (tech) => {
    setActiveFilter(tech);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  return (
    <section id="projects" className="site-section">
      <div className="site-wrap">
        <div className="section-head">
          <p className="ui-kicker">Projects</p>
          <h2 className="ui-heading">Selected work with real-world impact.</h2>
          <p className="ui-lead">
            Browse recent projects and use the technology filters to focus on your preferred stack.
          </p>
        </div>

        <div className="filter-row">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilterChange(filter)}
              className={`filter-chip ${activeFilter === filter ? 'is-active' : ''}`}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={handleShowMore} className="btn-ghost">
              See More Projects →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
