/**
 * Services data for the portfolio Services section.
 * Purpose: Single source of truth for offered services (title, description, icon, tech line).
 * Used by: ServicesSection.
 */

import {
  FaChartBar,
  FaCloudUploadAlt,
  FaDatabase,
  FaFolderOpen,
  FaHeadset,
  FaLaptopCode,
  FaRobot,
  FaServer,
  FaShieldAlt,
  FaCogs,
} from 'react-icons/fa';

const services = [
  {
    title: 'Professional Websites & Web Apps',
    description:
      'I build fast, responsive, and modern websites and web applications that deliver seamless user experiences.',
    icon: <FaLaptopCode />,
    tags: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Powerful Business Systems',
    description:
      'I develop secure, scalable, and high-performance backend systems and APIs to power your business.',
    icon: <FaServer />,
    tags: ['Node.js', 'Express.js', 'REST APIs', 'Prisma ORM', 'JWT', 'PostgreSQL'],
  },
  {
    title: 'Data & Business Management',
    description:
      'I design and manage reliable databases and systems to store, organize, and protect your important data.',
    icon: <FaDatabase />,
    tags: ['PostgreSQL', 'Supabase', 'MySQL', 'Database Design', 'Migrations'],
  },
  {
    title: 'AI-Powered Features',
    description:
      'I integrate AI models and APIs to add smart features that improve user experience and business efficiency.',
    icon: <FaCogs />,
    tags: ['OpenAI API', 'Gemini', 'Chatbots', 'AI Features', 'AI Tools'],
  },
  {
    title: 'AI Automation & Smart Workflows',
    description:
      'I automate repetitive tasks and create intelligent workflows using AI and advanced automation tools to save time and reduce manual work.',
    icon: <FaRobot />,
    tags: ['n8n', 'AI Agents', 'Workflows', 'Task Automation', 'Integrations'],
  },
  {
    title: 'Fast & Reliable Deployment',
    description:
      'I deploy your applications and services using modern cloud platforms for high availability and performance.',
    icon: <FaCloudUploadAlt />,
    tags: ['Vercel', 'Render', 'Railway', 'AWS', 'Docker', 'CI/CD'],
  },
  {
    title: 'Secure Login & Data Protection',
    description:
      'I implement secure authentication, authorization, and best security practices to protect your business and users.',
    icon: <FaShieldAlt />,
    tags: ['JWT', 'RBAC', 'Argon2', 'Rate Limiting', 'Data Validation'],
  },
  {
    title: 'Digital Files & Document Systems',
    description:
      'I create secure file upload, storage, sharing, and management systems with proper access control.',
    icon: <FaFolderOpen />,
    tags: ['File Uploads', 'Access Control', 'Secure Storage', 'File Handling'],
  },
  {
    title: 'Business Analytics & Dashboards',
    description:
      'I create interactive dashboards and analytics to help you track performance and make data-driven decisions.',
    icon: <FaChartBar />,
    tags: ['Charts', 'Analytics', 'Reporting', 'Data Visualization'],
  },
  {
    title: 'Ongoing Support & Maintenance',
    description:
      'I provide ongoing maintenance, performance optimization, bug fixing, and technical support to keep your system running smoothly.',
    icon: <FaHeadset />,
    tags: ['Bug Fixing', 'Optimization', 'Updates', 'Monitoring', '24/7 Support'],
  },
];

export default services;
