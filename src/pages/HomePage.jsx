/**
 * HomePage — Public portfolio landing page.
 * Purpose: Compose header, hero, lazy-loaded sections, footer, and toast.
 * Route: /
 */

import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import { siteConfig } from '../data/site';

const AboutSection = lazy(() => import('../sections/AboutSection'));
const SkillsSection = lazy(() => import('../sections/SkillsSection'));
const GitHubStatsSection = lazy(() => import('../sections/GitHubStatsSection'));
const ServicesSection = lazy(() => import('../sections/ServicesSection'));
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const ContactSection = lazy(() => import('../sections/ContactSection'));
const FooterSection = lazy(() => import('../sections/FooterSection'));
const ScrollToTop = lazy(() => import('../components/ScrollToTop'));
const Toast = lazy(() => import('../components/Toast'));

const SectionFallback = () => <div className="h-32" />;

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
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>
          {siteConfig.brand.fullName} | React Portfolio
        </title>
        <meta
          name="description"
          content="Modern, responsive React portfolio website with projects, skills, and a working contact form."
        />
        <meta name="theme-color" content="#020617" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-white antialiased">
        <Header />
        <HeroSection />

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
