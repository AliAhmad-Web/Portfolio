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

import { useState, useCallback, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

// ---- Critical Components (loaded eagerly above the fold) ----
import Header from './components/Header';
import HeroSection from './sections/HeroSection';

// ---- Below-fold Sections (lazy loaded for faster initial render) ----
const AboutSection = lazy(() => import('./sections/AboutSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const GitHubStatsSection = lazy(() => import('./sections/GitHubStatsSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const FooterSection = lazy(() => import('./sections/FooterSection'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const Toast = lazy(() => import('./components/Toast'));

// Simple fallback with no animation overhead
const SectionFallback = () => <div className="h-32" />;

export default function App() {
  const [toast, setToast] = useState(null);

  // Memoized toast handler - prevents unnecessary re-creations
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const closeToast = useCallback(() => setToast(null), []);

  return (
    <>
      <Helmet>
        <title>Ali Ahmad | React Portfolio</title>
        <meta name="description" content="Modern, responsive React portfolio website with projects, skills, and a working contact form." />
        <meta name="theme-color" content="#020617" />
        {/* Preconnect to origins we'll need */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      {/* Main app wrapper - simplified gradient to reduce paint cost */}
      <div className="min-h-screen bg-slate-950 text-white antialiased">
        <Header />

        {/* Hero loads immediately - it's above the fold */}
        <HeroSection />

        {/* Below-fold sections load lazily so they don't block initial paint */}
        <main>
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <SkillsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <GitHubStatsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection showToast={showToast} />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <FooterSection />
        </Suspense>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>

        {toast && (
          <Suspense fallback={null}>
            <Toast message={toast.message} type={toast.type} onClose={closeToast} />
          </Suspense>
        )}
      </div>
    </>
  );
}
