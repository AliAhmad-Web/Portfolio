/* ============================================
   Root Application Component
   ============================================
   This is the main App component that:
   - Manages global state (loading screen, toast notifications).
   - Renders all sections in order: Hero → About → Skills → Stats → Services → Projects → Contact.
   - Wraps content with Header (sticky nav) and Footer.
   - Uses Framer Motion's AnimatePresence for the loading screen exit animation.
   - Uses react-helmet-async for dynamic SEO meta tags.
   ============================================ */

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// ---- Components ----
import LoadingScreen from './components/LoadingScreen';  // Full-screen loading spinner on initial load.
import Toast from './components/Toast';                    // Bottom-right notification toast.
import ScrollToTop from './components/ScrollToTop';        // Button to scroll back to top.
import Header from './components/Header';                  // Sticky navigation bar.

// ---- Page Sections ----
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import GitHubStatsSection from './sections/GitHubStatsSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

export default function App() {
  const [loading, setLoading] = useState(true);  // Controls the loading screen visibility.
  const [toast, setToast] = useState(null);       // Stores the current toast message (null = hidden).

  // Show loading screen for 700ms on initial page load, then fade out.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // showToast: Called by ContactSection after form submission.
  // Displays a success or error message at the bottom-right for 3.2 seconds.
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  return (
    <>
      {/* SEO Meta Tags - Injected into <head> by react-helmet-async */}
      <Helmet>
        <title>Ali Ahmad | React Portfolio</title>
        <meta name="description" content="Modern, responsive React portfolio website with projects, skills, and a working contact form." />
        <meta name="theme-color" content="#020617" />
      </Helmet>

      {/* Loading screen: visible while loading === true, exits with fade animation */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Main app wrapper with dark gradient background */}
      <div className="min-h-screen bg-[linear-gradient(135deg,#020617_0%,#111827_45%,#020617_100%)] text-white antialiased">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <GitHubStatsSection />
          <ServicesSection />
          <ProjectsSection />
          <ContactSection showToast={showToast} />
        </main>
        <FooterSection />
        <ScrollToTop />
        {/* Show toast notification if one exists */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}