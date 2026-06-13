// ProjectModal: A full-screen overlay (modal) that displays detailed information
// about a project when its card is clicked.
//
// Props:
//   project - The project object to display, or null (modal closed).
//   onClose - Callback to close the modal.
//
// Features:
// - Shows larger image, full description, technology tags, GitHub link, and live demo link.
// - Animated open/close with Framer Motion (AnimatePresence + scale/fade).
// - Click outside the modal or press the close button to dismiss.

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-90 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose} // Click on backdrop closes modal.
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it.
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl sm:p-8"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
              aria-label="Close modal"
            >
              Close
            </button>

            {/* Project image */}
            <img
              src={project.image}
              alt={project.title}
              className="mb-6 w-full rounded-2xl object-cover"
            />

            {/* Category badge */}
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300">{project.category}</p>

            {/* Title */}
            <h3 className="mb-4 text-3xl font-semibold text-white">{project.title}</h3>

            {/* Full description */}
            <p className="mb-6 text-base leading-relaxed text-slate-300">{project.description}</p>

            {/* Technology tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100">{tech}</span>
              ))}
            </div>

            {/* Action links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/20"
              >
                <FaGithub /> View on GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}