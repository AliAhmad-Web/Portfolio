/**
 * AboutSection — Short bio and highlight stats for the landing page.
 * Purpose: Introduce the developer and key strengths.
 * Used by: HomePage.
 */

import { motion } from 'framer-motion';
import {
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineFolder,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';

const ABOUT_CARDS = [
  {
    number: '1+',
    label: 'Years Learning Frontend Development',
    desc: 'Dedicated self-study and hands-on practice in React.js, JavaScript, and Tailwind CSS.',
    Icon: HiOutlineAcademicCap,
  },
  {
    number: '15+',
    label: 'Personal & Practice Projects',
    desc: 'Web apps, landing pages, and interactive tools built through learning and experimentation.',
    Icon: HiOutlineFolder,
  },
  {
    number: '100%',
    label: 'Commitment To Learning',
    desc: 'Consistent daily effort to improve skills, explore new tools, and grow as a developer.',
    Icon: HiOutlineShieldCheck,
  },
  {
    number: '24/7',
    label: 'Daily Coding & Skill Development',
    desc: 'Spending time every day writing code, solving problems, and refining frontend expertise.',
    Icon: HiOutlineClock,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="site-section">
      <div className="site-wrap">
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <p className="ui-kicker">About Me</p>
            <h2 className="ui-heading">
              A self-taught developer focused on creating intelligent digital solutions.
            </h2>
            <span className="ui-rule" />
            <p className="ui-lead" style={{ marginLeft: 0, marginRight: 0 }}>
              I am a self-taught developer who loves turning ideas into modern, scalable, and user-friendly digital solutions. I focus on building complete web applications, automation systems, and AI-powered tools that help businesses grow and operate smarter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="about-cards"
          >
            {ABOUT_CARDS.map((item) => (
              <article key={item.label} className="ui-card about-card">
                <div className="about-card-top">
                  <p className="stat">{item.number}</p>
                  <span className="ui-icon" aria-hidden="true">
                    <item.Icon />
                  </span>
                </div>
                <h3>{item.label}</h3>
                <p className="desc">{item.desc}</p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
