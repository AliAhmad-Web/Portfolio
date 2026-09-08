/**
 * Services data for the portfolio Services section.
 * Purpose: Single source of truth for offered services (title, description, icon, tech line).
 * Used by: ServicesSection.
 */

import {
  IconBrain,
  IconChart,
  IconCloudUpload,
  IconCodeMonitor,
  IconDatabase,
  IconFolder,
  IconHeadset,
  IconRobot,
  IconServer,
  IconShieldLock,
} from '../components/services/ServiceIcons';

const services = [
  {
    title: 'Professional Websites & Web Apps',
    description:
      'I build fast, responsive, and modern websites and web applications that deliver seamless user experiences.',
    tags: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'TypeScript'],
    tone: 'cyan',
    Icon: IconCodeMonitor,
  },
  {
    title: 'Powerful Business Systems',
    description:
      'I develop secure, scalable, and high-performance backend systems and APIs to power your business.',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'Prisma ORM', 'JWT', 'PostgreSQL'],
    tone: 'purple',
    Icon: IconServer,
  },
  {
    title: 'Data & Business Management',
    description:
      'I design and manage reliable databases and systems to store, organize, and protect your important data.',
    tags: ['PostgreSQL', 'Supabase', 'MySQL', 'Database Design', 'Migrations'],
    tone: 'teal',
    Icon: IconDatabase,
  },
  {
    title: 'AI-Powered Features',
    description:
      'I integrate AI models and APIs to add smart features that improve user experience and business efficiency.',
    tags: ['OpenAI API', 'Gemini', 'Chatbots', 'AI Features', 'AI Tools'],
    tone: 'gold',
    Icon: IconBrain,
  },
  {
    title: 'AI Automation & Smart Workflows',
    description:
      'I automate repetitive tasks and create intelligent workflows using AI and advanced automation tools to save time and reduce manual work.',
    tags: ['n8n', 'AI Agents', 'Workflows', 'Task Automation', 'Integrations'],
    tone: 'violet',
    Icon: IconRobot,
  },
  {
    title: 'Fast & Reliable Deployment',
    description:
      'I deploy your applications and services using modern cloud platforms for high availability and performance.',
    tags: ['Vercel', 'Render', 'Railway', 'AWS', 'Docker', 'CI/CD'],
    tone: 'teal',
    Icon: IconCloudUpload,
  },
  {
    title: 'Secure Login & Data Protection',
    description:
      'I implement secure authentication, authorization, and best security practices to protect your business and users.',
    tags: ['JWT', 'RBAC', 'Argon2', 'Rate Limiting', 'Data Validation'],
    tone: 'gold',
    Icon: IconShieldLock,
  },
  {
    title: 'Digital Files & Document Systems',
    description:
      'I create secure file upload, storage, sharing, and management systems with proper access control.',
    tags: ['File Uploads', 'Access Control', 'Secure Storage', 'File Handling'],
    tone: 'purple',
    Icon: IconFolder,
  },
  {
    title: 'Business Analytics & Dashboards',
    description:
      'I create interactive dashboards and analytics to help you track performance and make data-driven decisions.',
    tags: ['Charts', 'Analytics', 'Reporting', 'Data Visualization'],
    tone: 'blue',
    Icon: IconChart,
  },
  {
    title: 'Ongoing Support & Maintenance',
    description:
      'I provide ongoing maintenance, performance optimization, bug fixing, and technical support to keep your system running smoothly.',
    tags: ['Bug Fixing', 'Optimization', 'Updates', 'Monitoring', '24/7 Support'],
    tone: 'green',
    Icon: IconHeadset,
  },
];

export default services;
