/**
 * Central site configuration for the public portfolio.
 * Purpose: Single source of truth for brand, contact, socials, and navigation.
 * Used by: Header, Footer, Contact, Hero, Auth/Admin brand marks, useActiveSection.
 */

export const siteConfig = {
  brand: {
    name: 'AliAhmad',
    suffix: '-Web',
    fullName: 'Ali Ahmad',
    role: 'Frontend Developer',
    tagline:
      'React Developer crafting modern, responsive, and high-performance web experiences.',
  },
  contact: {
    email: 'alikhan234ali@gmail.com',
    whatsapp: '923064382254',
  },
  social: {
    github: 'https://github.com/AliAhmad-Web',
    linkedin: 'https://www.linkedin.com/',
    whatsapp: 'https://wa.me/923064382254',
  },
  /** Public landing-page section IDs (order matches scroll navigation). */
  navSections: ['home', 'about', 'skills', 'stats', 'services', 'projects', 'contact'],
};

export const API_BASE_URL = '/api/v1';

export function getMailtoHref() {
  return `mailto:${siteConfig.contact.email}`;
}
