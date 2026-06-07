import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projects, techFilters } from '../data/projects';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.technologies.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Projects</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Selected work with real-world impact.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Browse recent projects and use the technology filters to focus on your preferred stack.</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {techFilters.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setActiveFilter(tech)}
              className={`rounded-full border px-4 py-2 text-sm transition ${activeFilter === tech ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400 hover:text-cyan-100'}`}
            >
              {tech}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
