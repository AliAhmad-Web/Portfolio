/**
 * HomePage — Public portfolio landing page.
 * Purpose: Compose header, hero, lazy-loaded sections, footer, and toast.
 * Route: /
 */

import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import SeoHead from '../components/seo/SeoHead';
import { homeSeo } from '../data/seo';
import { buildHomeGraph } from '../lib/schema';
import { scrollToSection } from '../utils/scrollToSection';

const AboutSection = lazy(() => import('../sections/AboutSection'));
const SkillsSection = lazy(() => import('../sections/SkillsSection'));
const GitHubStatsSection = lazy(() => import('../sections/GitHubStatsSection'));
const ServicesSection = lazy(() => import('../sections/ServicesSection'));
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const FaqSection = lazy(() => import('../sections/FaqSection'));
const ContactSection = lazy(() => import('../sections/ContactSection'));
const FooterSection = lazy(() => import('../sections/FooterSection'));
const Toast = lazy(() => import('../components/Toast'));

const SectionFallback = () => <div className="h-32" />;
const homeGraph = buildHomeGraph();

export default function HomePage() {
  const location = useLocation();
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!location.hash) return undefined;

    const id = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      scrollToSection(id);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <>
      <SeoHead
        title={homeSeo.title}
        description={homeSeo.description}
        path={homeSeo.path}
        jsonLd={homeGraph}
      />

      <div className="site-shell min-h-screen text-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />

        <main id="main-content">
          <HeroSection />
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
            <FaqSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection showToast={showToast} />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <FooterSection />
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
