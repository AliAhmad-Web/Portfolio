/**
 * Skills data for the portfolio Skills section.
 * Purpose: Single source of truth for skill cards (name, icon, description, tech line).
 * Used by: SkillsSection.
 */

import {
  IconBrain,
  IconCloud,
  IconCode,
  IconPhone,
  IconRobot,
  IconServer,
  IconShieldLock,
  IconTools,
} from '../components/skills/SkillIcons';

const skills = [
  {
    name: 'Frontend Development',
    description:
      'Building responsive, fast, and interactive user interfaces with modern frontend technologies.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'Next.js'],
    tone: 'cyan',
    Icon: IconCode,
  },
  {
    name: 'Backend Development',
    description:
      'Building secure, scalable, and high-performance server-side applications and RESTful APIs.',
    tags: ['Node.js', 'Express.js', 'REST APIs'],
    tone: 'purple',
    Icon: IconServer,
  },
  {
    name: 'Database & Storage',
    description:
      'Designing reliable databases and managing data securely for high availability and performance.',
    tags: ['Supabase', 'Prisma', 'Database Design', 'Migrations'],
    tone: 'teal',
    Icon: IconCloud,
  },
  {
    name: 'AI Integration',
    description:
      'Integrating AI models and APIs to add intelligent features and automate complex workflows.',
    tags: ['OpenAI API', 'AI Features', 'Chatbots', 'Smart AI Solutions'],
    tone: 'gold',
    Icon: IconBrain,
  },
  {
    name: 'AI Automation',
    description: 'Creating smart automations and workflows that save time and boost productivity.',
    tags: ['n8n', 'Automation Workflows', 'AI Agents', 'Task Automation', 'Integrations'],
    tone: 'green',
    Icon: IconRobot,
  },
  {
    name: 'Authentication & Security',
    description:
      'Implementing secure authentication, authorization, and best practices to protect applications and data.',
    tags: ['JWT', 'RBAC', 'Argon2', 'Rate Limiting', 'Data Validation'],
    tone: 'amber',
    Icon: IconShieldLock,
  },
  {
    name: 'Responsive & UI/UX',
    description:
      'Building clean, modern, and user-friendly interfaces that work perfectly across all devices and screen sizes.',
    tags: ['Responsive Design', 'UI/UX', 'Web Best Practices'],
    tone: 'violet',
    Icon: IconPhone,
  },
  {
    name: 'Tools & DevOps',
    description:
      'Using modern tools and DevOps practices to build, deploy, and manage applications efficiently.',
    tags: ['Git & GitHub', 'Vercel', 'VS Code', 'Cursor'],
    tone: 'blue',
    Icon: IconTools,
  },
];

export default skills;
