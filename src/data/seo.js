/**
 * Production SEO / GEO configuration.
 * Purpose: Canonical domain, titles, descriptions, and social image paths.
 * Used by: SeoHead, JSON-LD, sitemap, robots, index.html fallbacks.
 *
 * Always emit the production HTTPS origin in metadata — never localhost.
 */

import { projects } from './projects';
import { siteConfig } from './site';
import { getProjectSlug } from '../utils/projectSlug';

export const PRODUCTION_SITE_URL = 'https://aliahmadportfolio.vercel.app';

function isProductionHttpsUrl(value) {
  try {
    const url = new URL(String(value || ''));
    return url.protocol === 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1';
  } catch {
    return false;
  }
}

export function getSiteUrl() {
  const configured = import.meta.env?.VITE_SITE_URL;
  if (isProductionHttpsUrl(configured)) {
    return String(configured).replace(/\/$/, '');
  }
  return PRODUCTION_SITE_URL;
}

export function absUrl(pathname = '/') {
  const origin = getSiteUrl();
  if (!pathname || pathname === '/') return `${origin}/`;
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${origin}${path}`;
}

export function toMetaDescription(text, max = 158) {
  const clean = String(text || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const clipped = (lastSpace > 90 ? sliced.slice(0, lastSpace) : sliced).replace(/[,.;:]+$/, '');
  return `${clipped}…`;
}

export function isIndexableProfileUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('linkedin.com')) {
      return /\/in\/|\/company\//i.test(parsed.pathname);
    }
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const seoConfig = {
  siteName: `${siteConfig.brand.name}${siteConfig.brand.suffix}`,
  locale: 'en_US',
  language: 'en',
  themeColor: '#020617',
  twitterCard: 'summary_large_image',
  ogTypeHome: 'website',
  ogTypeProject: 'article',
  image: {
    path: '/ali-ahmad.png',
    alt: 'Ali Ahmad, full-stack web developer and AI solutions specialist in Lahore, Pakistan',
    width: 612,
    height: 408,
    type: 'image/png',
  },
  location: {
    city: 'Lahore',
    region: 'Punjab',
    country: 'Pakistan',
    countryCode: 'PK',
    geoRegion: 'PK-PB',
    areaServed: ['Lahore', 'Pakistan', 'Remote'],
  },
  jobTitle: 'Full-Stack Web Developer & AI Solutions Specialist',
  entityDescription:
    'Ali Ahmad is a self-taught full-stack web developer and AI solutions specialist based in Lahore, Pakistan. He builds professional websites, web apps, business systems, AI-powered features, and automation workflows for startups and companies in Pakistan and worldwide.',
};

export const homeSeo = {
  title: 'Ali Ahmad | Full-Stack Web Developer & AI Solutions in Lahore',
  description:
    'Ali Ahmad is a Lahore-based full-stack web developer building AI-powered apps, automation, and business systems for startups and companies in Pakistan and worldwide.',
  path: '/',
};

export const notFoundSeo = {
  title: 'Page not found | Ali Ahmad',
  description:
    'This page is missing. Return to Ali Ahmad’s portfolio to view web development, AI, and automation work.',
  path: '/404',
  robots: 'noindex, follow',
};

export function getSameAs() {
  return [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.whatsapp].filter(
    isIndexableProfileUrl,
  );
}

export function getIndexablePaths() {
  return ['/', ...projects.map((project) => `/projects/${getProjectSlug(project)}`)];
}

export function getProjectSeo(project) {
  const slug = getProjectSlug(project);
  return {
    title: `${project.title} | Ali Ahmad Portfolio`,
    description: toMetaDescription(project.description),
    path: `/projects/${slug}`,
    image: project.image,
    imageAlt: `${project.title} — ${project.category} by Ali Ahmad`,
  };
}
