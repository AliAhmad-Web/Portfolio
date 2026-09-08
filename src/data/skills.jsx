/**
 * Skills data for the portfolio Skills section.
 * Purpose: Single source of truth for skill cards (name, icon, description, tech line).
 * Used by: SkillsSection.
 */

import {
  FaCode,
  FaDatabase,
  FaGitAlt,
  FaMobileAlt,
  FaReact,
  FaRobot,
  FaServer,
  FaShieldAlt,
} from 'react-icons/fa';

const skills = [
  {
    name: 'Frontend Development',
    icon: <FaReact />,
    description:
      'Building responsive, fast, and interactive user interfaces with modern frontend technologies.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'Next.js'],
  },
  {
    name: 'Backend Development',
    icon: <FaServer />,
    description:
      'Building secure, scalable, and high-performance server-side applications and RESTful APIs.',
    tags: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    name: 'Database & Storage',
    icon: <FaDatabase />,
    description:
      'Designing reliable databases and managing data securely for high availability and performance.',
    tags: ['Supabase', 'Prisma', 'Database Design', 'Migrations'],
  },
  {
    name: 'AI Integration',
    icon: <FaCode />,
    description:
      'Integrating AI models and APIs to add intelligent features and automate complex workflows.',
    tags: ['OpenAI API', 'AI Features', 'Chatbots', 'Smart AI Solutions'],
  },
  {
    name: 'AI Automation',
    icon: <FaRobot />,
    description: 'Creating smart automations and workflows that save time and boost productivity.',
    tags: ['n8n', 'Automation Workflows', 'AI Agents', 'Task Automation', 'Integrations'],
  },
  {
    name: 'Authentication & Security',
    icon: <FaShieldAlt />,
    description:
      'Implementing secure authentication, authorization, and best practices to protect applications and data.',
    tags: ['JWT', 'RBAC', 'Argon2', 'Rate Limiting', 'Data Validation'],
  },
  {
    name: 'Responsive & UI/UX',
    icon: <FaMobileAlt />,
    description:
      'Building clean, modern, and user-friendly interfaces that work perfectly across all devices and screen sizes.',
    tags: ['Responsive Design', 'UI/UX', 'Web Best Practices'],
  },
  {
    name: 'Tools & DevOps',
    icon: <FaGitAlt />,
    description:
      'Using modern tools and DevOps practices to build, deploy, and manage applications efficiently.',
    tags: ['Git & GitHub', 'Vercel', 'VS Code', 'Cursor'],
  },
];

export default skills;
