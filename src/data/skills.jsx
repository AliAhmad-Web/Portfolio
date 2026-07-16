/**
 * Skills data for the portfolio Skills section.
 * Purpose: Single source of truth for skill cards (name, icon, description).
 * Used by: SkillsSection.
 */

import {
  FaCode,
  FaReact,
  FaPalette,
  FaGitAlt,
  FaLayerGroup,
  FaUniversalAccess,
  FaMobileAlt,
  FaStar,
} from 'react-icons/fa';

const skills = [
  {
    name: 'JavaScript',
    icon: <FaCode />,
    description: 'Interactive logic, DOM control, and modern frontend behavior.',
  },
  {
    name: 'React',
    icon: <FaReact />,
    description: 'Reusable components, state handling, and smooth UI flows.',
  },
  {
    name: 'Tailwind CSS',
    icon: <FaPalette />,
    description: 'Clean utility-first styling with flexible responsive design.',
  },
  {
    name: 'Framer Motion',
    icon: <FaStar />,
    description: 'Subtle motion, polished transitions, and better user engagement.',
  },
  {
    name: 'Git',
    icon: <FaGitAlt />,
    description: 'Version control for clean collaboration and reliable updates.',
  },
  {
    name: 'Accessibility',
    icon: <FaUniversalAccess />,
    description: 'Inclusive interfaces with better keyboard and screen-reader support.',
  },
  {
    name: 'Responsive Design',
    icon: <FaMobileAlt />,
    description: 'Layouts that adapt beautifully across mobile, tablet, and desktop.',
  },
  {
    name: 'UI Development',
    icon: <FaLayerGroup />,
    description:
      'Creating clean, responsive, and user-friendly interfaces with modern frontend technologies.',
  },
];

export default skills;
