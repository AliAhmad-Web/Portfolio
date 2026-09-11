/**
 * TeamSection — Compact homepage banner CTA for the dedicated Team page.
 * Purpose: Real HTML overlay on a cropped team photo; only the CTA navigates to /team.
 * Used by: HomePage. Anchor: #team. Placed between Contact and Customer Reviews.
 */

import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineCodeBracket, HiOutlineStar, HiOutlineUserGroup } from 'react-icons/hi2';
import AnimatedCounter from '../components/AnimatedCounter';
import OptimizedImage from '../components/ui/OptimizedImage';
import SectionBadge from '../components/SectionBadge';
import { getProjectsCount } from '../data/projects';
import { TEAM_BANNER, getTeamMembersCount, teamHome } from '../data/team';
import { useInView } from '../hooks/useInView';

const TEAM_STATS = [
  {
    key: 'members',
    label: teamHome.stats[0].label,
    Icon: HiOutlineUserGroup,
    getValue: () => `${getTeamMembersCount()}+`,
  },
  {
    key: 'projects',
    label: teamHome.stats[1].label,
    Icon: HiOutlineCodeBracket,
    getValue: () => `${getProjectsCount()}+`,
  },
  {
    key: 'satisfaction',
    label: teamHome.stats[2].label,
    Icon: HiOutlineStar,
    getValue: () => '100%',
  },
];

export default function TeamSection() {
  const [sectionRef, inView] = useInView(0.3);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="team-screen px-4 sm:px-6 lg:px-8"
      aria-labelledby="team-heading"
    >
      <div className="team-ambient" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="team-banner">
          <div className="team-banner-media" aria-hidden="true">
            <OptimizedImage
              className="team-banner-photo"
              src={TEAM_BANNER.src}
              alt=""
              width={TEAM_BANNER.width}
              height={TEAM_BANNER.height}
              sizes="(min-width: 1024px) 70vw, 100vw"
              decoding="async"
              loading="lazy"
              fetchPriority="low"
            />
            <div className="team-banner-overlay" />
          </div>

          <div className="anim-in team-banner-copy">
            <SectionBadge icon={HiOutlineUserGroup}>{teamHome.badge}</SectionBadge>

            <h2 id="team-heading">
              {teamHome.titleLead}
              <br />
              <span className="team-heading-accent">{teamHome.titleAccent}</span>
            </h2>

            <p>{teamHome.description}</p>

            <ul className="team-banner-stats">
              {TEAM_STATS.map((stat) => {
                const value = stat.getValue();
                return (
                  <li key={stat.key} className="team-banner-stat">
                    <span className="team-banner-stat-icon">
                      <stat.Icon aria-hidden="true" />
                    </span>
                    <span>
                      <AnimatedCounter
                        className="team-banner-stat-value"
                        value={value}
                        active={inView}
                        replay
                      />
                      <span className="team-banner-stat-label">{stat.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <Link
              to={teamHome.ctaTo}
              className="team-banner-cta"
              onMouseEnter={() => {
                void import('../pages/TeamPage')
              }}
              onFocus={() => {
                void import('../pages/TeamPage')
              }}
            >
              {teamHome.cta}
              <HiOutlineArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
