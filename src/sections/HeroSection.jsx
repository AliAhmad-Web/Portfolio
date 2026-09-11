/**
 * HeroSection — Above-the-fold introduction for the portfolio.
 * Purpose: Position Ali Ahmad as a builder of complete digital solutions.
 * Used by: HomePage.
 */

import {
  HiOutlineArrowRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCpuChip,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import HeroOrbit from '../components/hero/HeroOrbit';
import AnimatedCounter from '../components/AnimatedCounter';
import OptimizedImage from '../components/ui/OptimizedImage';
import { useInView } from '../hooks/useInView';
import { useClientSocialProof } from '../hooks/useClientSocialProof';
import { CLIENT_AVATAR_SLOTS, PLACEHOLDER_AVATARS } from '../data/clientAvatars';
import { getProjectsCount } from '../data/projects';
import SectionLink from '../components/SectionLink';
import { siteConfig } from '../data/site';

const VALUE_PROPS = [
  { title: 'AI-Driven', subtitle: 'Smarter Solutions', Icon: HiOutlineCpuChip },
  { title: 'End-to-End', subtitle: 'From Idea to Launch', Icon: HiOutlineRocketLaunch },
  { title: 'Reliable & Secure', subtitle: 'Built to Scale', Icon: HiOutlineShieldCheck },
  { title: 'Business Focused', subtitle: 'Real-World Results', Icon: HiOutlineChartBar },
];

export default function HeroSection() {
  const [sectionRef, inView] = useInView(0.35);
  const { satisfiedClients, recentClients } = useClientSocialProof();

  const heroMetrics = [
    {
      value: `${satisfiedClients}+`,
      label: 'Satisfied Clients',
      tone: 'gold',
      active: inView,
    },
    {
      value: `${getProjectsCount()}+`,
      label: 'Projects Delivered',
      tone: 'blue',
      active: inView,
    },
    {
      value: '100%',
      label: 'Client Satisfaction',
      tone: 'green',
      active: inView,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-screen relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-aurora" aria-hidden="true" />

      <div className="hero-main relative z-10 mx-auto grid max-w-7xl items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-3 xl:gap-5">
        <div className="anim-in max-w-2xl text-center lg:max-w-none lg:text-left">
          <span className="hero-badge">
            <HiOutlineSparkles className="text-amber-300" />
            AI • Automation • Full-Stack Solutions
          </span>

          <h1 className="font-sora mt-3 font-extrabold leading-[1.12] tracking-tight text-white">
            Crafting Intelligent
            <br />
            <span className="hero-text-gold">Digital Solutions</span> with{' '}
            <span className="hero-text-gold">AI</span>
          </h1>

          <p className="hero-script mt-1.5 text-amber-100">
            Beyond Code. Real Impact.
          </p>

          <p className="hero-copy mx-auto mt-2.5 max-w-xl text-slate-300 lg:mx-0">
            I&apos;m {siteConfig.brand.fullName}, a full-stack web developer and AI solutions
            specialist in Lahore, Pakistan. I build complete, modern, and scalable digital systems
            that automate processes, enhance productivity, and{' '}
            <span className="font-medium text-amber-300">accelerate growth</span> for businesses and
            startups.
          </p>

          <div className="hero-values">
            {VALUE_PROPS.map((item) => (
              <article key={item.title} className="hero-value">
                <item.Icon className="hero-value-icon" />
                <div>
                  <p className="hero-value-title">{item.title}</p>
                  <p className="hero-value-sub">{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-2.5 sm:flex-row lg:justify-start">
            <SectionLink id="projects" className="hero-cta-primary">
              Explore My Work
              <HiOutlineArrowRight className="text-base" />
            </SectionLink>
            <SectionLink id="contact" className="hero-cta-secondary">
              <HiOutlineChatBubbleLeftRight className="text-base" />
              Discuss Your Project
            </SectionLink>
          </div>
        </div>

        <div className="anim-in-scale relative mx-auto w-full overflow-hidden">
          <HeroOrbit />
        </div>
      </div>

      <div className="anim-in-delayed hero-metrics relative z-10 mx-auto max-w-7xl">
        <div className="hero-metrics-row">
          <div className="hero-proof" aria-hidden="true">
            {CLIENT_AVATAR_SLOTS.map((slot, index) => (
              <span key={slot} className={slot}>
                <OptimizedImage
                  src={recentClients[index]?.src || PLACEHOLDER_AVATARS[index].src}
                  alt=""
                  width="40"
                  height="40"
                  loading="eager"
                  decoding="async"
                />
              </span>
            ))}
            <span className="hero-proof-plus">+</span>
          </div>

          {heroMetrics.map((metric) => (
            <div key={metric.label} className="hero-metric">
              <p className={`hero-metric-value is-${metric.tone}`}>
                <AnimatedCounter value={metric.value} active={metric.active} />
              </p>
              <p className="hero-metric-label">{metric.label}</p>
            </div>
          ))}

          <div className="hero-quote">
            <blockquote>
              <span className="hero-quote-mark" aria-hidden="true">
                “
              </span>
              <p>
                Turning complex ideas into
                <br />
                simple, powerful solutions.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
