// Stats configuration for the GitHub Stats & Development Journey section.
// To update any statistic, simply change the value, label, suffix, or description below.
// Each stat object includes:
//   label       - Display title for the stat card.
//   value       - The numeric value to display.
//   suffix      - Text appended after the number (e.g. "+").
//   icon        - React icon component from react-icons/fa.
//   description - Brief explanation of what this stat represents.

import {
  FaCode,          // Used for: Total Commits
  FaFolderOpen,    // Used for: Projects Completed
  FaGitAlt,        // Used for: GitHub Repositories
  FaLaptopCode,    // Used for: Technologies Used
  FaGraduationCap, // Used for: Years of Learning & Development
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