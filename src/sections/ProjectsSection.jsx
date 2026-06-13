// ProjectsSection: Displays portfolio projects in a responsive grid with filtering and "load more" functionality.
//
// Features:
// - Filter buttons: Filter projects by technology (All, HTML5, CSS3, JavaScript, React.js, Tailwind CSS).
// - Pagination: Shows 3 projects at a time. Click "See More Projects" to load 3 more.
// - Modal: Clicking a project card opens a detailed modal view.
// - Smooth animations: Cards animate in/out using Framer Motion's AnimatePresence.

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projects, techFilters } from '../data/projects';

const ITEMS_PER_LOAD = 3; // Number of projects to show per "load more" click.

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');    // Currently selected technology filter.
  const [selectedProject, setSelectedProject] = useState(null); // Project to display in the modal (null = closed).
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD); // How many projects are currently visible.

  // Memoized: Filter projects based on the active technology filter.
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.technologies.includes(activeFilter));
  }, [activeFilter]);

  // Only show a slice of the filtered projects up to visibleCount.
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length; // Whether there are more projects to show.

  // Increase visible count by ITEMS_PER_LOAD to reveal more projects.
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  // When filter changes, reset to show the first batch of projects.
  const handleFilterChange = (tech) => {
    setActiveFilter(tech);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Projects</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Selected work with real-world impact.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Browse recent projects and use the technology filters to focus on your preferred stack.</p>
        </div>

        {/* Filter buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {techFilters.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => handleFilterChange(tech)}
              className={`rounded-full border px-4 py-2 text-sm transition ${activeFilter === tech ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400 hover:text-cyan-100'}`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Project cards grid - animated with AnimatePresence for smooth add/remove */}
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
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* "See More" button - only shown when there are more projects to load */}
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

      {/* Project detail modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}