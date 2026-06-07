import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-130 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-cyan-950/30"
        >
          <img src={project.image} alt={project.title} className="h-64 w-full rounded-t-3xl object-cover" />
          <div className="p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{project.category}</p>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200 hover:border-cyan-400 hover:text-cyan-200"
                aria-label="Close project details"
              >
                Close
              </button>
            </div>
            <p className="mb-6 text-slate-300">{project.description}</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">{tech}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 hover:border-cyan-400 hover:text-cyan-200">
                <FaGithub /> GitHub
              </a>
              <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
