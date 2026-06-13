// ProjectCard: An interactive card that displays a single project's details.
// Used inside the ProjectsSection grid.
//
// Props:
//   project - Object containing id, title, description, technologies, github, live, image, category.
//   onOpen  - Callback function. Called with the project object when the card is clicked, which opens the ProjectModal.
//
// Features:
// - Shows project image, category badge, title, description, and technology tags.
// - Hover effect: lifts card up (y: -6) and scales the image (scale: 105%).
// - Framer Motion: animates in when it enters the viewport.
// - Description area uses flex-1 so all cards in a grid row have equal height.

import { motion } from 'framer-motion';

export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}                                                  // Lift up on hover.
      initial={{ opacity: 0, y: 18 }}                                         // Start hidden and slightly below.
      whileInView={{ opacity: 1, y: 0 }}                                      // Animate in when visible.
      viewport={{ once: true, amount: 0.2 }}                                  // Animate only once.
      transition={{ duration: 0.35 }}
      onClick={() => onOpen(project)}                                         // Click anywhere on the card to open the modal.
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl"
    >
      {/* Project screenshot image */}
      <div className="w-full overflow-hidden">
        <img src={project.image} alt={project.title} loading="lazy" className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>

      {/* Card content - uses flex col so description expands to equalize heights */}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300">{project.category}</p>
        <h3 className="mb-3 text-2xl font-semibold text-white">{project.title}</h3>
        <p className="mb-5 flex-1 text-sm text-slate-300">{project.description}</p>
        {/* Technology tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">{tech}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}