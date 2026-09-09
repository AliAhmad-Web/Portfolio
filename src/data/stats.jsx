/**
 * Stats card metadata for the GitHub Stats section.
 * Purpose: Labels, descriptions, icons, and tones. Live values come from GitHub.
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
    key: 'projects',
    label: 'Projects Completed',
    description: 'Web applications and landing pages built from scratch.',
    tone: 'blue',
    Icon: HiOutlineFolder,
  },
  {
    key: 'repositories',
    label: 'GitHub Repositories',
    description: 'Public repos showcasing my work and open-source contributions.',
    tone: 'purple',
    Icon: FaGithub,
  },
  {
    key: 'commits',
    label: 'Total Commits',
    description: 'Code contributions across personal and collaborative projects.',
    tone: 'cyan',
    Icon: HiOutlineCodeBracket,
  },
  {
    key: 'technologies',
    label: 'Technologies Used',
    description: 'Modern tools, frameworks, and libraries in my tech stack.',
    tone: 'gold',
    Icon: HiOutlineComputerDesktop,
  },
  {
    key: 'experience',
    label: 'Years of Learning & Development',
    description: 'Continuous growth in frontend development and UI engineering.',
    tone: 'royal',
    Icon: HiOutlineAcademicCap,
  },
];

export default stats;
