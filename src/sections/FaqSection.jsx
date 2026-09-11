/**
 * FaqSection — Search- and AI-crawler-friendly questions about Ali Ahmad.
 * Purpose: GEO + FAQ schema support without changing existing section visuals.
 * Used by: HomePage. Anchor: #faq.
 */

import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import SectionBadge from '../components/SectionBadge';
import SectionLink from '../components/SectionLink';
import { faqs } from '../data/faq';

export default function FaqSection() {
  return (
    <section id="faq" className="faq-screen px-4 sm:px-6 lg:px-8">
      <div className="faq-ambient" aria-hidden="true" />

      <div className="faq-main relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <div className="section-badge-row">
            <SectionBadge icon={HiOutlineQuestionMarkCircle}>FAQ</SectionBadge>
          </div>
          <h2>
            Questions about working with{' '}
            <span className="skills-heading-accent">Ali Ahmad</span>
          </h2>
          <p className="faq-lead">
            Clear answers on services, location, stack, and how to start a web, AI, or automation
            project.
          </p>
          <span className="stats-divider" aria-hidden="true" />
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <details
              key={item.question}
              name="portfolio-faq"
              className="anim-in faq-item"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <summary>
                <h3>{item.question}</h3>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>

        <p className="faq-cta">
          Still deciding?{' '}
          <SectionLink id="services" className="faq-inline">
            Review services
          </SectionLink>
          ,{' '}
          <SectionLink id="projects" className="faq-inline">
            browse selected projects
          </SectionLink>
          , or{' '}
          <SectionLink id="contact" className="faq-inline">
            send a project brief
          </SectionLink>
          .
        </p>
      </div>
    </section>
  );
}
