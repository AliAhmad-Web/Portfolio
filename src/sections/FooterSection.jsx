import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function FooterSection() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-slate-300 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p>© 2026 Ali Ahmad. Crafted with React, Tailwind CSS, and care.</p>
        <div className="flex items-center justify-center gap-3 md:justify-end">
          <a href="https://github.com/alikhan234ali" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 hover:border-cyan-400 hover:text-cyan-200" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 hover:border-cyan-400 hover:text-cyan-200" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="mailto:alikhan234ali@gmail.com" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 hover:border-cyan-400 hover:text-cyan-200" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
}
