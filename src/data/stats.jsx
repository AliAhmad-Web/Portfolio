/**
 * Stats data for the GitHub Stats section.
 * Purpose: Single source of truth for development journey metrics.
 * Used by: GitHubStatsSection.
 */

import {
  FaCode,
  FaFolderOpen,
  FaGitAlt,
  FaLaptopCode,
  FaGraduationCap,
} from 'react-icons/fa';

const stats = [
  {
    label: 'Projects Completed',
    value: 15,
    suffix: '+',
    icon: <FaFolderOpen />,
    description: 'Web applications and landing pages built from scratch.',
  },
  {
    label: 'GitHub Repositories',
    value: 20,
    suffix: '+',
    icon: <FaGitAlt />,
    description: 'Public repos showcasing my work and open-source contributions.',
  },
  {
    label: 'Total Commits',
    value: 500,
    suffix: '+',
    icon: <FaCode />,
    description: 'Code contributions across personal and collaborative projects.',
  },
  {
    label: 'Technologies Used',
    value: 12,
    suffix: '+',
    icon: <FaLaptopCode />,
    description: 'Modern tools, frameworks, and libraries in my tech stack.',
  },
  {
    label: 'Years of Learning & Development',
    value: 1,
    suffix: '+',
    icon: <FaGraduationCap />,
    description: 'Continuous growth in frontend development and UI engineering.',
  },
];

export default stats;
