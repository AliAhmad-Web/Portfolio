/**
 * ProjectDetailPage — Full-page project case study view.
 * Purpose: Show project image, description, tech stack, and external links.
 * Route: /projects/:slug
 */

import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { findProjectBySlug } from '../utils/projectSlug';
import { siteConfig } from '../data/site';
import BrandMark from '../components/ui/BrandMark';

const linkButtonBase =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-all duration-300';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = findProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  return (
    <>
      <Helmet>
        <title>
          {project.title} | {siteConfig.brand.fullName}
        </title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-white">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.08),transparent_36%)]" />

        <div className="relative">
          <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors duration-300 hover:text-cyan-200"
              >
                <FaArrowLeft />
                Back to Projects
              </Link>
              <BrandMark
                to="/"
                className="text-lg font-black tracking-[0.2em] text-white transition-colors duration-300 hover:text-cyan-100"
              />
            </div>
          </header>

          {/* Hero — ~20–25% shorter visual height via constrained width, still 16:9 */}
          <section className="px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pt-12">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-[0_20px_50px_rgba(2,6,23,0.55)] sm:rounded-3xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-video w-full object-cover"
                />
              </motion.div>
            </div>
          </section>

          {/* Details */}
          <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.7fr)] lg:gap-16 lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="min-w-0"
              >
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300 sm:text-sm">
                  {project.category}
                </p>

                <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                  {project.title}
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:mt-10 sm:text-lg sm:leading-8">
                  {project.description}
                </p>

                <div className="mt-12 sm:mt-14">
                  <h2 className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400 sm:text-sm">
                    Tech stack
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="h-fit rounded-3xl border border-white/10 'bg-white/[0.04]' p-6 shadow-[0_16px_40px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-7 lg:sticky lg:top-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-300 sm:text-sm">
                  Project links
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Explore the live demo or review the source code on GitHub.
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className={`${linkButtonBase} bg-cyan-400 text-slate-950 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_10px_24px_rgba(34,211,238,0.25)]`}
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`${linkButtonBase} border border-cyan-400/40 bg-cyan-400/10 font-medium text-cyan-100 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-400/20`}
                  >
                    <FaGithub />
                    View on GitHub
                  </a>
                  <Link
                    to="/#projects"
                    className={`${linkButtonBase} border border-white/10 bg-white/5 font-medium text-slate-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-100`}
                  >
                    <FaArrowLeft className="text-xs" />
                    Back to Projects
                  </Link>
                </div>
              </motion.aside>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
