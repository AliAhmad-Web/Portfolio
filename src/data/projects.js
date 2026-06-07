export const projects = [
  {
    id: 1,
    title: 'FinFlow Analytics',
    description: 'A fintech dashboard with KPI cards, charts, and a responsive table for tracking revenue and cash flow in real time.',
    technologies: ['React', 'Tailwind CSS', 'Chart.js'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://portfolio-five-bay-58.vercel.app/',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    category: 'Dashboard'
  },
  {
    id: 2,
    title: 'ShopSphere Store',
    description: 'An elegant e-commerce front end with product filtering, cart controls, and a mobile-first shopping experience.',
    technologies: ['React', 'Redux', 'Tailwind CSS'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://portfolio-five-bay-58.vercel.app/',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
    category: 'E-commerce'
  },
  {
    id: 3,
    title: 'Pulse Studio Landing',
    description: 'A polished SaaS landing page with animated sections, testimonials, and conversion-focused CTAs.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://portfolio-five-bay-58.vercel.app/',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    category: 'Landing Page'
  },
  {
    id: 4,
    title: 'Atlas Travel Blog',
    description: 'A travel journal site with curated destinations, smooth transitions, and interactive highlight cards.',
    technologies: ['React', 'Tailwind CSS', 'API'],
    github: 'https://github.com/alikhan234ali/Portfolio',
    live: 'https://portfolio-five-bay-58.vercel.app/',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    category: 'Blog'
  }
];

export const techFilters = ['All', ...new Set(projects.flatMap((project) => project.technologies))];
