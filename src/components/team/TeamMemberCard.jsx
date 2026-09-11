/**
 * TeamMemberCard — Glass profile card for a single team member.
 * Purpose: Render roster fields from src/data/team.js without extra invented claims.
 * Used by: TeamPage.
 */

import { FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import OptimizedImage from '../ui/OptimizedImage';
import { getTeamInitials } from '../../data/team';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
};

export default function TeamMemberCard({ member, index = 0 }) {
  const initials = getTeamInitials(member.name);

  return (
    <article
      className={`team-card is-${member.tone || 'cyan'}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="team-card-photo">
        {member.image ? (
          <OptimizedImage
            src={member.image}
            alt={member.name}
            width="320"
            height="320"
            sizes="(min-width: 1024px) 320px, 80vw"
            loading={index < 2 ? 'eager' : 'lazy'}
            fetchPriority={index < 2 ? 'high' : 'low'}
            decoding="async"
          />
        ) : (
          <span className="team-card-initials" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>

      <div className="team-card-body">
        <h2>{member.name}</h2>
        <p className="team-card-role">{member.role}</p>
        <p className="team-card-bio">{member.bio}</p>

        <div className="team-card-block">
          <h3>Skills</h3>
          <div className="team-card-tags">
            {member.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="team-card-block">
          <h3>Technologies</h3>
          <div className="team-card-tags">
            {member.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>

        <div className="team-card-block">
          <h3>Projects / work</h3>
          <ul>
            {member.projects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="team-card-block">
          <h3>Specialty</h3>
          <p>{member.specialty}</p>
        </div>

        {member.socials?.length ? (
          <div className="team-card-socials" aria-label={`${member.name} profile links`}>
            {member.socials.map((social) => {
              const Icon = socialIcons[social.type] || FaGlobe;
              const external = social.href.startsWith('http');
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}
