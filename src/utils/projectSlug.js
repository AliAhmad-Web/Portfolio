import { projects } from '../data/projects';

export function slugify(title) {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getProjectSlug(project) {
  return project.slug || slugify(project.title);
}

export function findProjectBySlug(slug) {
  return projects.find((project) => getProjectSlug(project) === slug) ?? null;
}
