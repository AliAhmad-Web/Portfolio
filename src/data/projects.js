/**
 * Portfolio projects catalog.
 * Purpose: Single source of truth for project cards and detail pages.
 * Used by: ProjectsSection, ProjectCard, projectSlug helpers.
 */

// Priority: React projects first, then HTML/JS/CSS projects.
const projectData = [
  // --- React-based projects (Group 1) ---
  {
    id: 1,
    title: 'Student Course Registration System',
    description:
      'A complete student course registration platform with authentication, course management, enrollment system, and admin dashboard. Built for universities to manage students, courses, and registrations efficiently.',
    technologies: ['HTML5', 'JavaScript', 'React.js', 'Tailwind CSS'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://student-course-registration-gules.vercel.app/login',
    image: '/project-scrs.png',
    category: 'Full Stack Web Application',
    groups: ['Frontend', 'Full Stack'],
    tone: 'purple',
  },
  {
    id: 4,
    title: 'Quiz App',
    description:
      'An interactive quiz application where users answer multiple-choice questions, get instant feedback, and see their final score. Built for performance, accuracy, and a seamless user experience.',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'React.js'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://quiz-app-six-iota-27.vercel.app/',
    image: '/quizApp.png',
    category: 'Full Stack Web Application',
    groups: ['Frontend', 'Full Stack'],
    tone: 'blue',
  },
  {
    id: 8,
    title: 'SaaS Tool App',
    description:
      'A full-featured SaaS platform offering powerful tools for productivity, analytics, and management. Includes authentication, role-based access, and a modern dashboard. Built for scalability and a great user experience.',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'React.js'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://saa-s-tool-app.vercel.app/',
    image: '/project-saas.jpg',
    category: 'Full Stack SaaS Application',
    groups: ['Frontend', 'Full Stack'],
    tone: 'cyan',
  },
  // --- HTML / JavaScript / CSS projects (Group 2) ---
  {
    id: 2,
    title: 'Fresh Bite Food Website',
    description:
      'A modern and responsive restaurant website designed to showcase delicious food items, featured menus, special offers, and restaurant services. Provides an engaging user experience with an attractive layout, smooth navigation, and mobile-friendly design with modern UI and visual presentation.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://fresh-bite-food-website-91gg.vercel.app/index.html',
    image: '/project-fresh-bite.jpg',
    category: 'Restaurant & Food Landing Page',
    groups: ['Frontend'],
    tone: 'gold',
  },
  {
    id: 3,
    title: 'FoodZone Website',
    description:
      'A modern and responsive food website developed using HTML, CSS, and JavaScript. Designed to showcase food items, featured dishes, restaurant services, and special offers through an attractive and user-friendly interface with smooth browsing experience and interactive design elements.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://foodzone-vert.vercel.app/',
    image: '/project-foodzone.jpg',
    category: 'Restaurant & Food Ordering Website',
    groups: ['Frontend'],
    tone: 'teal',
  },
  {
    id: 7,
    title: 'Tic Tac Toe Game',
    description:
      'A classic interactive Tic Tac Toe game where two players can play against each other. The game includes win detection, draw detection, and smooth user interactions with a clean UI.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://tic-tac-toe-game-seven-jade.vercel.app/',
    image: '/project-tictactoe.jpg',
    category: 'Interactive Game',
    groups: ['Frontend', 'Other'],
    tone: 'violet',
  },
  {
    id: 5,
    title: 'To-Do List App',
    description:
      'A simple and interactive task management application where users can add, delete, and mark tasks as completed. It helps users organize daily tasks efficiently.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://to-do-list-eta-navy-28.vercel.app/',
    image: '/project-todo.jpg',
    category: 'Task Management Application',
    groups: ['Frontend'],
    tone: 'green',
  },
  {
    id: 6,
    title: 'Rate List Web App',
    description:
      'A web application that displays and manages a rate list of items/services in a structured format. Users can view updated rates in an organized and easy-to-read interface.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://rate-list-web-app.vercel.app/',
    image: '/project-ratelist.jpg',
    category: 'Rate Management Application',
    groups: ['Frontend'],
    tone: 'blue',
  },
];

export const projects = projectData;

export function getProjectsCount() {
  return projectData.length;
}

export const projectFilters = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'AI / ML',
  'Full Stack',
  'Other',
];
