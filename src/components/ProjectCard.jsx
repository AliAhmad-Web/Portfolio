// ProjectCard: An interactive card that displays a single project's details.
// Used inside the ProjectsSection grid.
//
// Props:
//   project - Object containing id, title, description, technologies, github, live, image, category.
//
// Clicking the card body navigates to the full project detail page.

import { Link } from 'react-router-dom';
import { getProjectSlug } from '../utils/projectSlug';

export default function ProjectCard({ project }) {
  const slug = getProjectSlug(project);

  return (
    <article className="ui-card project-card">
      <Link to={`/projects/${slug}`} className="flex flex-1 flex-col">
        <div className="thumb">
          <img src={project.image} alt={project.title} loading="lazy" />
        </div>

        <div className="project-card-body">
          <p className="cat">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="desc">{project.description}</p>
          <div className="project-tags">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </Link>
      {project.live ? (
        <div className="project-card-cta">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            View Live Project
          </a>
        </div>
      ) : null}
    </article>
  );
}
