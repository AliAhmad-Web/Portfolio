/**
 * AboutSection — Bio and four highlight cards for the landing page.
 * Purpose: Introduce Ali Ahmad and key learning stats.
 * Used by: HomePage.
 */

import {
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineFolder,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from 'react-icons/hi2';
import AnimatedCounter from '../components/AnimatedCounter';
import SectionBadge from '../components/SectionBadge';
import SectionLink from '../components/SectionLink';
import { useInView } from '../hooks/useInView';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { siteConfig } from '../data/site';

const ABOUT_CARDS = [
  {
    key: 'experience',
    title: 'Years Learning Frontend Development',
    desc: 'Dedicated self-study and hands-on practice in React.js, JavaScript, and Tailwind CSS.',
    tone: 'cyan',
    Icon: HiOutlineAcademicCap,
  },
  {
    key: 'projects',
    title: 'Personal & Practice Projects',
    desc: 'Web apps, landing pages, and interactive tools built through learning and experimentation.',
    tone: 'purple',
    Icon: HiOutlineFolder,
  },
  {
    number: '100%',
    title: 'Commitment To Learning',
    desc: 'Consistent daily effort to improve skills, explore new tools, and grow as a developer.',
    tone: 'teal',
    Icon: HiOutlineShieldCheck,
  },
  {
    number: '24/7',
    title: 'Daily Coding & Skill Development',
    desc: 'Spending time every day writing code, solving problems, and refining frontend expertise.',
    tone: 'gold',
    Icon: HiOutlineClock,
  },
];

export default function AboutSection() {
  const [sectionRef, inView] = useInView(0.3);
  const { stats, status } = useGitHubStats();
  const valuesReady = status !== 'loading';

  const cardValue = (card) => {
    if (card.key === 'experience') return stats.experience;
    if (card.key === 'projects') return String(stats.projects ?? 0);
    return card.number;
  };

  return (
    <section ref={sectionRef} id="about" className="about-screen px-4 sm:px-6 lg:px-8">
      <div className="about-ambient" aria-hidden="true" />
      <div className="about-network" aria-hidden="true">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <g stroke="rgba(56,189,248,0.22)" strokeWidth="1" fill="none">
            <path d="M40 170 L180 120 L320 155 L480 90 L640 140 L820 70 L980 130 L1160 85 L1380 150" />
            <path d="M120 200 L260 150 L420 180 L590 110 L760 165 L940 100 L1120 160 L1300 120" />
            <path d="M200 210 L360 175 L540 195 L720 145 L900 185 L1080 140 L1280 190" />
          </g>
          <g stroke="rgba(251,191,36,0.18)" strokeWidth="0.9" fill="none">
            <path d="M80 190 L240 135 L400 165 L560 100 L740 155 L920 95 L1100 145 L1320 110" />
          </g>
          {[
            [180, 120], [320, 155], [480, 90], [640, 140], [820, 70], [980, 130],
            [260, 150], [590, 110], [940, 100], [1160, 85], [400, 165], [720, 145],
          ].map(([cx, cy], index) => (
            <circle
              key={`${cx}-${cy}-${index}`}
              cx={cx}
              cy={cy}
              r={index % 3 === 0 ? 2.4 : 1.6}
              fill={index % 2 === 0 ? 'rgba(56,189,248,0.7)' : 'rgba(251,191,36,0.55)'}
            />
          ))}
        </svg>
      </div>

      <div className="about-main relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
        <div className="anim-in-left about-copy">
          <SectionBadge icon={HiOutlineUser}>ABOUT ME</SectionBadge>

          <h2>
            A self-taught developer focused on creating{' '}
            <span className="about-text-gold">intelligent</span>{' '}
            <span className="about-text-violet">digital solutions.</span>
          </h2>

          <p>
            I am {siteConfig.brand.fullName}, a self-taught developer based in Lahore, Pakistan, who
            loves turning ideas into modern, scalable, and user-friendly digital solutions. I focus
            on building complete web applications, automation systems, and{' '}
            <span className="about-text-accent">AI-powered tools</span> that help businesses grow
            and operate smarter.
          </p>
          <p className="about-more">
            Explore{' '}
            <SectionLink id="services">web, AI, and automation services</SectionLink>, browse{' '}
            <SectionLink id="projects">selected projects</SectionLink>, or{' '}
            <SectionLink id="contact">start a conversation</SectionLink>.
          </p>
          <span className="stats-divider stats-divider--start" aria-hidden="true" />
        </div>

        <div className="anim-in-right about-cards">
          {ABOUT_CARDS.map((card, index) => (
            <article
              key={card.title}
              className={`about-card is-${card.tone}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="about-card-icon">
                <card.Icon />
              </span>
              <p className="about-card-stat">
                <AnimatedCounter
                  value={cardValue(card)}
                  active={inView && (card.key === 'projects' ? valuesReady : true)}
                />
              </p>
              <h3>{card.title}</h3>
              <p className="about-card-desc">{card.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
