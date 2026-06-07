import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import LoadingScreen from './components/LoadingScreen';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  return (
    <>
      <Helmet>
        <title>Ali Ahmad | React Portfolio</title>
        <meta name="description" content="Modern, responsive React portfolio website with projects, skills, and a working contact form." />
        <meta name="theme-color" content="#020617" />
      </Helmet>

      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <div className="min-h-screen bg-[linear-gradient(135deg,#020617_0%,#111827_45%,#020617_100%)] text-white antialiased">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection showToast={showToast} />
        </main>
        <FooterSection />
        <ScrollToTop />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}
