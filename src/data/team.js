/**
 * Central team roster for the homepage banner CTA and /team page.
 * Purpose: Single source of truth for member profiles — edit this file to update the Team page.
 * Keep bios factual: no invented employers, awards, clients, or inflated achievements.
 */

import { siteConfig, getMailtoHref } from './site';

export const TEAM_BANNER = {
  src: '/team-banner.jpg',
  width: 2560,
  height: 1440,
  alt: 'Ali Ahmad’s creative team working together in a studio workspace.',
};

export const teamHome = {
  badge: 'OUR TEAM',
  titleLead: 'Meet Our',
  titleAccent: 'Creative Team',
  description:
    'A passionate team of developers, designers, AI specialists and digital professionals working together to build innovative and reliable digital solutions.',
  cta: 'Meet the Team',
  ctaTo: '/team',
  stats: [
    { key: 'members', label: 'Team Members' },
    { key: 'projects', label: 'Projects Completed' },
    { key: 'satisfaction', label: 'Client Satisfaction' },
  ],
};

export const teamPage = {
  badge: 'OUR TEAM',
  title: 'Meet Our Team',
  titleAccent: 'Team',
  description:
    'A small group of developers, designers, and digital specialists working with Ali Ahmad on websites, web apps, AI features, and automation. Profiles below are kept easy to update as the roster grows.',
};

export const teamMembers = [
  {
    id: 'ali-ahmad',
    name: siteConfig.brand.fullName,
    role: 'Lead Full-Stack Developer',
    bio: 'Self-taught full-stack developer based in Lahore, Pakistan. Builds websites, web apps, business systems, AI-powered features, and automation workflows for local and remote clients.',
    skills: ['Full-stack delivery', 'Product architecture', 'AI integration', 'Client communication'],
    technologies: ['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'n8n'],
    projects: [
      'EliteFlow Enterprise ERP',
      'Student Course Registration System',
      'Portfolio websites and practice web apps',
    ],
    specialty: 'End-to-end web delivery from UI to APIs, auth, databases, and practical AI features.',
    image: '/ali-ahmad-team.jpg',
    tone: 'cyan',
    socials: [
      { label: 'GitHub', href: siteConfig.social.github, type: 'github' },
      { label: 'LinkedIn', href: siteConfig.social.linkedin, type: 'linkedin' },
      { label: 'Email', href: getMailtoHref(), type: 'email' },
    ],
  },
  {
    id: 'muhammad-mustansar-riaz',
    name: 'Muhammad Mustansar Riaz',
    role: 'CEO — ATechSole & ATechSkills · AI, Agentic AI & Generative AI Expert · Cyber Security',
    bio: 'CEO of ATechSole and ATechSkills. Focuses on Artificial Intelligence, Agentic AI, Generative AI, and Cyber Security, with a leadership role across product direction and practical AI-driven solutions.',
    skills: [
      'Artificial Intelligence',
      'Agentic AI',
      'Generative AI',
      'Cyber Security',
      'Leadership',
    ],
    technologies: ['OpenAI API', 'Gemini', 'n8n', 'Node.js', 'Webhooks'],
    projects: [
      'ATechSole leadership',
      'ATechSkills leadership',
      'AI, agentic AI, and generative AI solutions',
      'Cyber security practices',
    ],
    specialty: 'AI, Agentic AI, Generative AI, and Cyber Security, with CEO leadership at ATechSole and ATechSkills.',
    image: '/muhammad-mustansar-riaz.jpg',
    tone: 'gold',
    socials: [],
  },
  {
    id: 'shahzaib-akram',
    name: 'Shahzaib Akram',
    role: 'Full Stack Developer',
    bio: 'Full-stack developer working on building, integrating, and maintaining modern web applications. Focuses on connecting frontend interfaces with backend APIs, databases, and authentication so features stay reliable in production.',
    skills: [
      'Full-stack web development',
      'Backend API development',
      'Database management',
      'Authentication & authorization',
      'Frontend & backend integration',
    ],
    technologies: ['JavaScript', 'React.js', 'Next.js', 'Node.js', 'REST APIs'],
    projects: [
      'REST API integration',
      'Feature development',
      'Bug fixing and performance optimization',
      'Deployment and application maintenance',
    ],
    specialty: 'Server-side logic, API integration, and full-stack feature work that keeps web applications running smoothly.',
    image: '/shahzaib-akram.jpg',
    tone: 'teal',
    socials: [],
  },
  {
    id: 'allah-rakha',
    name: 'Muhammad Waqas',
    role: 'CEO, Dafi Labs · Database Developer / Database Specialist',
    bio: 'Database specialist focused on designing, managing, and optimizing reliable database systems. Experienced in SQL-based databases, data management, database integration, and maintaining efficient data structures for modern web applications.',
    skills: [
      'SQL',
      'MySQL',
      'PostgreSQL',
      'Supabase',
      'Database Design',
      'Data Modeling',
      'Query Optimization',
      'Database Management',
      'REST API Database Integration',
      'Authentication Data Management',
    ],
    technologies: ['SQL', 'MySQL', 'PostgreSQL', 'Supabase'],
    projects: [
      'Database Design & Architecture',
      'Database Management',
      'SQL Query Development',
      'MySQL / PostgreSQL Development',
      'Supabase Database Management',
      'Database Integration with Web Applications',
      'Data Modeling',
      'Database Optimization',
      'Data Security & Access Management',
      'Backup & Data Maintenance',
      'Troubleshooting Database Issues',
      'Supporting Backend Developers with Database Operations',
    ],
    specialty: 'Database design, management, and optimization for reliable web application data layers.',
    image: '/muhammad-waqas.jpg',
    tone: 'purple',
    socials: [],
  },
  {
    id: 'muhammad-arsalan',
    name: 'Muhammad Farooq Latif',
    role: 'Backend Developer & SEO/GEO Specialist',
    bio: 'Backend Developer responsible for reliable backend systems and the complete SEO/GEO strategy of the website.',
    skills: ['JavaScript', 'Node.js', 'REST APIs', 'SQL', 'SEO', 'Technical SEO', 'GEO'],
    technologies: ['JavaScript', 'Node.js', 'REST APIs', 'SQL'],
    projects: [
      'Backend Development',
      'API & Database Integration',
      'Technical SEO',
      'On-Page SEO',
      'SEO Strategy',
      'GEO / AI Search Optimization',
    ],
    specialty: 'Reliable backend systems with complete SEO and GEO strategy.',
    image: '/muhammad-farooq-latif.jpg',
    tone: 'teal',
    socials: [],
  },
  {
    id: 'digital-specialist',
    name: 'Muhammad Nasar Farid',
    role: 'Content / Digital Specialist',
    bio: 'Supports site copy, content structure, and digital presentation so pages stay clear for visitors and easier to maintain over time.',
    skills: ['Content structure', 'Page copy', 'Asset organization'],
    technologies: ['Notion', 'Canva', 'Google Docs', 'SEO basics'],
    projects: ['Website copy drafts', 'Project write-ups', 'Content and media organization'],
    specialty: 'Clear written content and organized digital assets for web projects.',
    image: '/muhammad-nasar-farid.jpg',
    tone: 'green',
    socials: [],
  },
];

export function getTeamMembersCount() {
  return teamMembers.length;
}

export function getTeamInitials(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
