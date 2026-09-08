/**
 * ProjectCard — Image-first project preview card.
 * Purpose: Show the real project UI screenshot, stack tags, and live-project action.
 * Used by: ProjectsSection. Clicking the screenshot opens the detail route; the button opens the live app.
 */

import { Link } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2';
import { getProjectSlug } from '../utils/projectSlug';

export default function ProjectCard({ project }) {
  const slug = getProjectSlug(project);

  return (
    <article className={`project-card is-${project.tone || 'cyan'}`}>
      <Link to={`/projects/${slug}`} className="project-card-media" aria-label={`${project.title} details`}>
        <img src={project.image} alt={project.title} loading="lazy" />
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
              rel="noreferrer"
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
}
