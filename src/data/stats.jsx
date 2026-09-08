/**
 * Stats data for the GitHub Stats section.
 * Purpose: Single source of truth for development journey metrics.
 * Used by: GitHubStatsSection.
 */

import { FaGithub } from 'react-icons/fa';
import {
  HiOutlineAcademicCap,
  HiOutlineCodeBracket,
  HiOutlineComputerDesktop,
  HiOutlineFolder,
} from 'react-icons/hi2';

const stats = [
  {
    label: 'Projects Completed',
    value: '15+',
    description: 'Web applications and landing pages built from scratch.',
    tone: 'blue',
    Icon: HiOutlineFolder,
  },
  {
    label: 'GitHub Repositories',
    value: '20+',
    description: 'Public repos showcasing my work and open-source contributions.',
    tone: 'purple',
    Icon: FaGithub,
  },
  {
    label: 'Total Commits',
    value: '500+',
    description: 'Code contributions across personal and collaborative projects.',
    tone: 'cyan',
    Icon: HiOutlineCodeBracket,
  },
  {
    label: 'Technologies Used',
    value: '12+',
    description: 'Modern tools, frameworks, and libraries in my tech stack.',
    tone: 'gold',
    Icon: HiOutlineComputerDesktop,
  },
  {
    label: 'Years of Learning & Development',
    value: '1+',
    description: 'Continuous growth in frontend development and UI engineering.',
    tone: 'royal',
    Icon: HiOutlineAcademicCap,
  },
];

export default stats;
