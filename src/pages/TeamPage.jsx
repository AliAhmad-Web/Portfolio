/**
 * TeamPage — Dedicated roster page opened from the homepage team banner CTA.
 * Purpose: Show editable team profiles in the existing dark / neon / glass theme.
 * Route: /team
 */

import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import Header from '../components/Header';
import SectionBadge from '../components/SectionBadge';
import SeoHead from '../components/seo/SeoHead';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { teamMembers, teamPage, TEAM_BANNER } from '../data/team';
import { teamSeo } from '../data/seo';
import { buildTeamGraph } from '../lib/schema';
import FooterSection from '../sections/FooterSection';

export default function TeamPage() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SeoHead
        title={teamSeo.title}
        description={teamSeo.description}
        path={teamSeo.path}
        image={TEAM_BANNER.src}
        imageAlt={TEAM_BANNER.alt}
        jsonLd={buildTeamGraph()}
      />

      <div className="site-shell min-h-screen text-white antialiased">
        <a href="#team-main" className="skip-link">
          Skip to content
        </a>
        <Header />

        <main id="team-main">
          <section className="team-page-screen px-4 sm:px-6 lg:px-8">
            <div className="team-ambient" aria-hidden="true" />

            <div className="relative z-10 mx-auto max-w-7xl">
              <motion.div
                className="team-page-hero"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Link to="/#team" className="team-page-back">
                  <FaArrowLeft />
                  Back to portfolio
                </Link>

                <div className="section-badge-row">
                  <SectionBadge icon={HiOutlineUserGroup}>{teamPage.badge}</SectionBadge>
                </div>
                <h1>
                  Meet Our <span className="skills-heading-accent">{teamPage.titleAccent}</span>
                </h1>
                <p>{teamPage.description}</p>
                <span className="stats-divider" aria-hidden="true" />
              </motion.div>

              <div className="team-grid">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard key={member.id} member={member} index={index} />
                ))}
              </div>

              <div className="team-page-cta">
                <p>Have a website, AI feature, or automation idea?</p>
                <Link to="/#contact" className="btn-primary">
                  Start a conversation
                </Link>
              </div>
            </div>
          </section>
        </main>

        <FooterSection />
      </div>
    </>
  );
}
