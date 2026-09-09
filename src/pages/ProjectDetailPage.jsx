/**
 * ProjectDetailPage — Full-page project case study view.
 * Purpose: Show project image, description, tech stack, and external links.
 * Route: /projects/:slug
 */

import { useLayoutEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { findProjectBySlug, getProjectSlug, getRelatedProjects } from '../utils/projectSlug';
import BrandMark from '../components/ui/BrandMark';
import SeoHead from '../components/seo/SeoHead';
import { getProjectSeo } from '../data/seo';
import { buildProjectGraph } from '../lib/schema';
import NotFoundPage from './NotFoundPage';

const linkButtonBase =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-all duration-300';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = findProjectBySlug(slug);
  const related = useMemo(
    () => (project ? getRelatedProjects(project) : []),
    [project],
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <NotFoundPage />;
  }

  const pageSeo = getProjectSeo(project);

  return (
    <>
      <SeoHead
        title={pageSeo.title}
        description={pageSeo.description}
        path={pageSeo.path}
        image={pageSeo.image}
        imageAlt={pageSeo.imageAlt}
        type="article"
        jsonLd={buildProjectGraph(project)}
      />

      <div className="site-shell min-h-screen text-white">
        <div className="relative z-10">
          <header className="site-header">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors duration-300 hover:text-cyan-200"
              >
                <FaArrowLeft />
                Back to Projects
              </Link>
              <BrandMark
                to="/"
                className="text-lg font-black tracking-[0.14em] text-white transition-colors duration-300 hover:text-cyan-100"
              />
            </div>
          </header>

          <main>
            <section className="px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pt-12">
              <div className="mx-auto max-w-6xl">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel mx-auto max-w-4xl overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={pageSeo.imageAlt}
                    width="1440"
                    height="900"
                    decoding="async"
                    className="aspect-video w-full object-cover"
                  />
                </motion.div>
              </div>
            </section>

            <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.7fr)] lg:gap-16 lg:items-start">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="min-w-0"
                >
                  <nav aria-label="Breadcrumb">
                    <ol className="project-breadcrumb">
                      <li>
                        <Link to="/">Home</Link>
                        <span aria-hidden="true"> / </span>
                      </li>
                      <li>
                        <Link to="/#projects">Projects</Link>
                        <span aria-hidden="true"> / </span>
                      </li>
                      <li aria-current="page">{project.title}</li>
                    </ol>
                  </nav>

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
                  className="glass-panel h-fit p-6 sm:p-7 lg:sticky lg:top-8"
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
                      rel="noopener noreferrer"
                      className={`${linkButtonBase} btn-primary`}
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkButtonBase} btn-ghost`}
                    >
                      <FaGithub />
                      View on GitHub
                    </a>
                    <Link
                      to="/#projects"
                      className={`${linkButtonBase} btn-ghost`}
                    >
                      <FaArrowLeft className="text-xs" />
                      Back to Projects
                    </Link>
                  </div>

                  {related.length ? (
                    <nav className="project-related" aria-label="More projects">
                      <p>More projects</p>
                      {related.map((item) => (
                        <Link key={item.id} to={`/projects/${getProjectSlug(item)}`}>
                          {item.title}
                        </Link>
                      ))}
                      <Link to="/#contact">Discuss a similar project</Link>
                    </nav>
                  ) : null}
                </motion.aside>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
