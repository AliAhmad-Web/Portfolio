/**
 * ProjectCard — Image-first project preview card.
 * Purpose: Show the real project UI screenshot, stack tags, and live-project action.
 * Used by: ProjectsSection. Clicking the screenshot opens the detail route; the button opens the live app.
 */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2';
import OptimizedImage from './ui/OptimizedImage';
import { getProjectSlug } from '../utils/projectSlug';

export default memo(function ProjectCard({ project }) {
  const slug = getProjectSlug(project);

  return (
    <article className={`project-card is-${project.tone || 'cyan'}`}>
      <Link
        to={`/projects/${slug}`}
        className="project-card-media"
        aria-label={`${project.title} project details`}
        onMouseEnter={() => {
          void import('../pages/ProjectDetailPage')
        }}
        onFocus={() => {
          void import('../pages/ProjectDetailPage')
        }}
      >
        <OptimizedImage
          src={project.image}
          alt={`${project.title} — ${project.category} by Ali Ahmad`}
          width="1440"
          height="900"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
          fetchPriority="low"
          decoding="async"
        />
      </Link>

      <div className="project-card-body">
        <div className="project-card-copy">
          <p className="project-card-category">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="project-card-desc">{project.description}</p>
        </div>
        <div className="project-card-footer">
          <div className="project-card-tags">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-live"
            >
              <HiOutlineEye />
              View Live Project
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
});
