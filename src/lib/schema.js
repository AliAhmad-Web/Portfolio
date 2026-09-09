/**
 * JSON-LD builders for Google-valid Schema.org graphs.
 * Purpose: Describe Ali Ahmad, the website, services, projects, and FAQs without fake reviews.
 * Used by: SeoHead on public pages.
 */

import { faqs } from '../data/faq';
import { projects } from '../data/projects';
import { seoConfig, getSameAs, getSiteUrl, absUrl, homeSeo } from '../data/seo';
import { siteConfig } from '../data/site';
import skills from '../data/skills';
import services from '../data/services';
import { getProjectSlug } from '../utils/projectSlug';

function personId() {
  return `${getSiteUrl()}/#person`;
}

function websiteId() {
  return `${getSiteUrl()}/#website`;
}

function serviceId() {
  return `${getSiteUrl()}/#professional-service`;
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': personId(),
    name: siteConfig.brand.fullName,
    alternateName: [seoConfig.siteName, 'Ali Ahmad Web', 'AliAhmad-Web'],
    url: absUrl('/'),
    image: {
      '@type': 'ImageObject',
      url: absUrl(seoConfig.image.path),
      caption: seoConfig.image.alt,
      width: seoConfig.image.width,
      height: seoConfig.image.height,
    },
    jobTitle: seoConfig.jobTitle,
    description: seoConfig.entityDescription,
    email: siteConfig.contact.email,
    telephone: `+${siteConfig.contact.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: seoConfig.location.city,
      addressRegion: seoConfig.location.region,
      addressCountry: seoConfig.location.countryCode,
    },
    knowsAbout: [
      'Web development',
      'Full-stack development',
      'AI-powered web applications',
      'Business process automation',
      'React.js',
      'Node.js',
      ...skills.map((skill) => skill.name),
    ],
    knowsLanguage: ['English', 'Urdu'],
    sameAs: getSameAs(),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.contact.email,
      telephone: `+${siteConfig.contact.whatsapp}`,
      areaServed: seoConfig.location.areaServed,
      availableLanguage: ['English', 'Urdu'],
    },
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    url: absUrl('/'),
    name: seoConfig.siteName,
    alternateName: siteConfig.brand.fullName,
    description: homeSeo.description,
    inLanguage: seoConfig.language,
    publisher: { '@id': personId() },
    copyrightHolder: { '@id': personId() },
  };
}

export function professionalServiceSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': serviceId(),
    name: `${siteConfig.brand.fullName} — Digital Solutions`,
    url: absUrl('/#services'),
    image: absUrl(seoConfig.image.path),
    description:
      'Professional web development, AI features, automation, and business systems from Lahore, Pakistan, available remotely worldwide.',
    provider: { '@id': personId() },
    founder: { '@id': personId() },
    areaServed: [
      {
        '@type': 'City',
        name: seoConfig.location.city,
        containedInPlace: {
          '@type': 'Country',
          name: seoConfig.location.country,
        },
      },
      {
        '@type': 'Country',
        name: seoConfig.location.country,
      },
    ],
    serviceType: services.map((service) => service.title),
    knowsAbout: skills.map((skill) => skill.name),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital product and engineering services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: { '@id': personId() },
          areaServed: seoConfig.location.areaServed,
        },
      })),
    },
  };
}

export function faqPageSchema() {
  return {
    '@type': 'FAQPage',
    '@id': `${getSiteUrl()}/#faq-schema`,
    url: absUrl('/#faq'),
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function projectListSchema() {
  return {
    '@type': 'ItemList',
    '@id': `${getSiteUrl()}/#projects-list`,
    name: 'Selected work by Ali Ahmad',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absUrl(`/projects/${getProjectSlug(project)}`),
      name: project.title,
    })),
  };
}

export function homeWebPageSchema() {
  return {
    '@type': 'WebPage',
    '@id': `${getSiteUrl()}/#webpage`,
    url: absUrl('/'),
    name: homeSeo.title,
    description: homeSeo.description,
    inLanguage: seoConfig.language,
    isPartOf: { '@id': websiteId() },
    about: { '@id': personId() },
    primaryImageOfPage: absUrl(seoConfig.image.path),
    breadcrumb: {
      '@id': `${getSiteUrl()}/#breadcrumb`,
    },
  };
}

export function homeBreadcrumbSchema() {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${getSiteUrl()}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absUrl('/'),
      },
    ],
  };
}

export function buildHomeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      websiteSchema(),
      professionalServiceSchema(),
      homeWebPageSchema(),
      homeBreadcrumbSchema(),
      faqPageSchema(),
      projectListSchema(),
    ],
  };
}

export function buildProjectGraph(project) {
  const slug = getProjectSlug(project);
  const url = absUrl(`/projects/${slug}`);
  const image = absUrl(project.image);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      websiteSchema(),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${project.title} | ${siteConfig.brand.fullName}`,
        description: project.description,
        inLanguage: seoConfig.language,
        isPartOf: { '@id': websiteId() },
        about: { '@id': personId() },
        primaryImageOfPage: image,
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: absUrl('/#projects'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: url,
          },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: project.title,
        description: project.description,
        url,
        image,
        creator: { '@id': personId() },
        author: { '@id': personId() },
        keywords: project.technologies.join(', '),
        genre: project.category,
        inLanguage: seoConfig.language,
        isPartOf: { '@id': websiteId() },
        mainEntityOfPage: `${url}#webpage`,
      },
    ],
  };
}
