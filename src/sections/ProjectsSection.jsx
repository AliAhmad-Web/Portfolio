// ProjectsSection: Displays portfolio projects in a responsive grid with filtering and "load more".
// Clicking a card opens the project detail page (product-style), not a popup.

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects, techFilters } from '../data/projects';

const ITEMS_PER_LOAD = 3;

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.technologies.includes(activeFilter));
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
    <section id="projects" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Projects</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Selected work with real-world impact.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Browse recent projects and use the technology filters to focus on your preferred stack.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {techFilters.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => handleFilterChange(tech)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === tech
                  ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100'
                  : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400 hover:text-cyan-100'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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
            <button
              type="button"
              onClick={handleShowMore}
              className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-8 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/20 hover:-translate-y-0.5"
            >
              See More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
