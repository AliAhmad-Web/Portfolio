/**
 * ContactSection — Two-column contact layout matching the Contact reference.
 * Purpose: Collect visitor messages via POST /api/v1/contact (with reCAPTCHA).
 * Used by: HomePage. Anchor: #contact.
 */

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineEnvelope,
  HiOutlineUser,
  HiPaperAirplane,
} from 'react-icons/hi2';
import ContactFormWave from '../components/contact/ContactFormWave';
import CustomerReviews from '../components/contact/CustomerReviews';
import SectionBadge from '../components/SectionBadge';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { isValidEmail } from '../utils/authValidation';
import { API_BASE_URL, getMailtoHref, siteConfig } from '../data/site';
import { notifyPublicStatsUpdated } from '../hooks/useClientSocialProof';

const initialForm = { name: '', email: '', message: '' };

const contactLinks = [
  {
    href: getMailtoHref(),
    label: siteConfig.contact.email,
    Icon: FaEnvelope,
    tone: 'email',
    external: false,
  },
  {
    href: siteConfig.social.github,
    label: 'GitHub',
    Icon: FaGithub,
    tone: 'github',
    external: true,
  },
  {
    href: siteConfig.social.linkedin,
    label: 'LinkedIn',
    Icon: FaLinkedin,
    tone: 'linkedin',
    external: true,
  },
  {
    href: siteConfig.social.whatsapp,
    label: 'WhatsApp',
    Icon: FaWhatsapp,
    tone: 'whatsapp',
    external: true,
  },
];

export default function ContactSection({ showToast }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { getToken } = useRecaptcha();

  const validate = useCallback(() => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!isValidEmail(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 12) {
      nextErrors.message = 'Message should be at least 12 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const recaptchaToken = await getToken('contact');

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          ...(recaptchaToken ? { recaptchaToken } : {}),
        }),
      });

      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        await response.text();
        throw new Error(
          'Server error. Please ensure environment variables are set in Vercel dashboard.',
        );
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      setForm(initialForm);
      setErrors({});
      notifyPublicStatsUpdated();
      showToast('Message sent successfully. I will reply soon!', 'success');
    } catch (error) {
      showToast(
        error.message || 'Unable to send message right now. Please try again.',
        'error',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-screen px-4 sm:px-6 lg:px-8">
      <div className="contact-fx" aria-hidden="true">
        <div className="contact-ambient" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="contact-main">
          <motion.div
          className="contact-copy"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
        >
          <SectionBadge icon={HiOutlineEnvelope}>CONTACT</SectionBadge>
          <h2>
            Let&apos;s build something
            <br />
            <span className="contact-heading-accent">memorable together.</span>
          </h2>
          <p className="contact-lead">
            Have a website, AI feature, or automation workflow in mind? I&apos;m based in Lahore,
            Pakistan and work with local and remote clients. Send a quick note and I&apos;ll get
            back to you with next steps.
          </p>
          <span className="stats-divider stats-divider--start" aria-hidden="true" />

          <div className="contact-links">
            {contactLinks.map(({ href, label, Icon, tone, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={`contact-link is-${tone}`}
              >
                <Icon />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="contact-form"
          noValidate
        >
          <ContactFormWave />

          <div className="contact-fields-row">
            <label className="contact-field">
              <span className="contact-field-label is-purple">
                <HiOutlineUser />
                Name
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <p className="contact-error">{errors.name}</p> : null}
            </label>

            <label className="contact-field">
              <span className="contact-field-label is-purple">
                <HiOutlineEnvelope />
                Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <p className="contact-error">{errors.email}</p> : null}
            </label>
          </div>

          <label className="contact-field">
            <span className="contact-field-label is-purple">
              <HiOutlineChatBubbleLeftRight />
              Message
            </span>
            <textarea
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows="7"
              placeholder="Tell me about your project..."
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? <p className="contact-error">{errors.message}</p> : null}
          </label>

          <button type="submit" className="contact-submit" disabled={submitting}>
            <HiPaperAirplane />
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
        </div>

        <CustomerReviews showToast={showToast} />
      </div>
    </section>
  );
}
