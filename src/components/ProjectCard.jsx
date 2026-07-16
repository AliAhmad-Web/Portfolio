// ProjectCard: An interactive card that displays a single project's details.
// Used inside the ProjectsSection grid.
//
// Props:
//   project - Object containing id, title, description, technologies, github, live, image, category.
//
// Clicking the card navigates to the full project detail page.

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectSlug } from '../utils/projectSlug';

export default function ProjectCard({ project }) {
  const slug = getProjectSlug(project);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl"
    >
      <Link to={`/projects/${slug}`} className="flex h-full flex-col">
        <div className="w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
            {project.category}
          </p>
          <h3 className="mb-3 text-2xl font-semibold text-white">{project.title}</h3>
          <p className="mb-5 flex-1 text-sm text-slate-300">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
