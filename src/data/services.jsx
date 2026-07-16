/**
 * Services data for the portfolio Services section.
 * Purpose: Single source of truth for offered services (title, description, icon).
 * Used by: ServicesSection.
 */

import {
  FaReact,
  FaMobileAlt,
  FaRocket,
  FaShoppingCart,
  FaRedo,
  FaLaptopCode,
} from 'react-icons/fa';

const services = [
  {
    title: 'Frontend Development',
    description: 'Building modern and responsive web applications using React.js and JavaScript.',
    icon: <FaLaptopCode />,
  },
  {
    title: 'React.js Development',
    description: 'Creating fast, scalable, and maintainable React applications.',
    icon: <FaReact />,
  },
  {
    title: 'Responsive Web Design',
    description: 'Ensuring websites look perfect on desktop, tablet, and mobile devices.',
    icon: <FaMobileAlt />,
  },
  {
    title: 'Landing Page Development',
    description: 'Designing high-converting and professional landing pages.',
    icon: <FaRocket />,
  },
  {
    title: 'E-Commerce Development',
    description: 'Building modern online store interfaces and shopping experiences.',
    icon: <FaShoppingCart />,
  },
  {
    title: 'Website Redesign',
    description: 'Improving existing websites with modern UI/UX and better performance.',
    icon: <FaRedo />,
  },
];

export default services;
