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
      'Crafting intelligent digital solutions, business systems, and AI-powered web applications.',
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
  /**
   * Learning / development start date (GitHub account created).
   * Experience years are calculated from this date at runtime.
   */
  learningStartDate: '2023-01-15',
  /**
   * Header labels mapped to existing section DOM ids.
   * Solutions → services, Process → skills, Testimonials → stats.
   */
  navItems: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'stats', label: 'Stats' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
  /**
   * Footer quick links — same labels and order as the header.
   */
  footerLinks: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'stats', label: 'Stats' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
  /** Public landing-page section IDs in page order (used by useActiveSection). */
  navSections: ['home', 'about', 'skills', 'stats', 'services', 'projects', 'contact'],
};

export const API_BASE_URL = '/api/v1';

export function getMailtoHref() {
  return `mailto:${siteConfig.contact.email}`;
}

export function getGithubUsername() {
  try {
    const { pathname } = new URL(siteConfig.social.github);
    const username = pathname.replace(/^\/+|\/+$/g, '').split('/')[0];
    return username || 'AliAhmad-Web';
  } catch {
    return 'AliAhmad-Web';
  }
}
