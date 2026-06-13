/* ============================================
   Portfolio Projects Data
   ============================================
   This is the single source of truth for all project entries.
   To add/edit/remove a project, modify the array below.
   Each project object contains: id, title, description, technologies, github link, live link, image path, and category.
   ============================================ */

export const projects = [
  {
    id: 1,                                                          // Unique identifier for the project (used as React key).
    title: 'Student Course Registration System',                    // Display title of the project.
    description: 'A modern and responsive student course registration system built with frontend technologies. Allows students to browse available courses, register, manage selections, and navigate through a clean user-friendly interface with responsive design across all devices.',
    technologies: ['HTML5', 'JavaScript', 'React.js', 'Tailwind CSS'], // Tech stack tags shown on the card.
    github: 'https://github.com/alikhan234ali/Portfolio',          // Link to GitHub repository.
    live: 'https://student-course-registration-gules.vercel.app/login', // Live demo URL.
    image: '/project-scrs.png',                                     // Path to project screenshot image in /public.
    category: 'Frontend Web Application'                            // Category badge displayed on the card.
  },
  {
    id: 2,
    title: 'Fresh Bite Food Website',
    description: 'A modern and responsive restaurant website designed to showcase delicious food items, featured menus, special offers, and restaurant services. Provides an engaging user experience with an attractive layout, smooth navigation, and mobile-friendly design with modern UI and visual presentation.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://fresh-bite-food-website.vercel.app/',
    image: '/project-fresh-bite.jpg',
    category: 'Restaurant & Food Landing Page'
  },
  {
    id: 3,
    title: 'FoodZone Website',
    description: 'A modern and responsive food website developed using HTML, CSS, and JavaScript. Designed to showcase food items, featured dishes, restaurant services, and special offers through an attractive and user-friendly interface with smooth browsing experience and interactive design elements.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://foodzone-vert.vercel.app/',
    image: '/project-foodzone.jpg',
    category: 'Restaurant & Food Ordering Website'
  },
  {
    id: 4,
    title: 'Quiz App',
    description: 'An interactive quiz application where users answer multiple-choice questions and get their final score at the end.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://quizapp-vert-omega.vercel.app/',
    image: '/project-quizapp.jpg',
    category: 'Interactive Quiz Application'
  },
  {
    id: 5,
    title: 'To-Do List App',
    description: 'A simple and interactive task management application where users can add, delete, and mark tasks as completed. It helps users organize daily tasks efficiently.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://to-do-list-eta-navy-28.vercel.app/',
    image: '/project-todo.jpg',
    category: 'Task Management Application'
  },
  {
    id: 6,
    title: 'Rate List Web App',
    description: 'A web application that displays and manages a rate list of items/services in a structured format. Users can view updated rates in an organized and easy-to-read interface.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://rate-list-web-app.vercel.app/',
    image: '/project-ratelist.jpg',
    category: 'Rate Management Application'
  },
  {
    id: 7,
    title: 'Tic Tac Toe Game',
    description: 'A classic interactive Tic Tac Toe game where two players can play against each other. The game includes win detection, draw detection, and smooth user interactions with a clean UI.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://tic-tac-toe-game-seven-jade.vercel.app/',
    image: '/project-tictactoe.jpg',
    category: 'Interactive Game'
  },
  {
    id: 8,
    title: 'SaaS Tool App',
    description: 'A modern and responsive SaaS-based web application designed to provide scalable online tools with a clean and intuitive user experience. It focuses on performance, usability, and modern UI design.',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'React.js'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://saa-s-tool-app.vercel.app/',
    image: '/project-saas.jpg',
    category: 'SaaS Web Application'
  }
];

// Extract unique technologies from all projects and sort them in a preferred order for filter buttons.
const uniqueTechs = [...new Set(projects.flatMap((project) => project.technologies))];
const preferredOrder = ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'];

// Export filter options: "All" (show everything) + preferred technologies that actually exist in projects.
export const techFilters = ['All', ...preferredOrder.filter(t => uniqueTechs.includes(t))];