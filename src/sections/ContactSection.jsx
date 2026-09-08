/**
 * ContactSection — Public contact form + social contact links.
 * Purpose: Collect visitor messages via POST /api/v1/contact (with reCAPTCHA).
 * Used by: HomePage.
 */

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { isValidEmail } from '../utils/authValidation';
import { API_BASE_URL, getMailtoHref, siteConfig } from '../data/site';

const initialForm = { name: '', email: '', message: '' };

const contactLinks = [
  {
    href: getMailtoHref(),
    label: siteConfig.contact.email,
    Icon: FaEnvelope,
    external: false,
  },
  {
    href: siteConfig.social.github,
    label: 'GitHub',
    Icon: FaGithub,
    external: true,
  },
  {
    href: siteConfig.social.linkedin,
    label: 'LinkedIn',
    Icon: FaLinkedin,
    external: true,
  },
  {
    href: siteConfig.social.whatsapp,
    label: 'WhatsApp',
    Icon: FaWhatsapp,
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
    <section id="contact" className="site-section">
      <div className="site-wrap contact-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
        >
          <p className="ui-kicker">Contact</p>
          <h2 className="ui-heading">
            Let's build something memorable together.
          </h2>
          <span className="ui-rule" />
          <p className="ui-lead" style={{ marginLeft: 0, marginRight: 0 }}>
            Have a project in mind or want to discuss your next website? Send a quick note and
            I'll get back to you with next steps.
          </p>

          <div className="contact-links">
            {contactLinks.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="contact-link"
              >
                <Icon /> {label}
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
          className="ui-card contact-form"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </label>
          </div>

          <label className="mt-4">
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows="6"
              placeholder="Tell me about your project..."
            />
            {errors.message && <p className="field-error">{errors.message}</p>}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-6"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
