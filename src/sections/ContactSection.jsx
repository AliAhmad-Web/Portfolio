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
    <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Contact</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Let's build something memorable together.
          </h2>
          <p className="mt-4 text-slate-300">
            Have a project in mind or want to discuss your next website? Send a quick note and
            I'll get back to you with next steps.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {contactLinks.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 hover:border-cyan-400 hover:text-cyan-100"
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
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-200">
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}
            </label>
            <label className="text-sm text-slate-200">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
            </label>
          </div>

          <label className="mt-4 block text-sm text-slate-200">
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows="6"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
              placeholder="Tell me about your project..."
            />
            {errors.message && <p className="mt-1 text-xs text-rose-300">{errors.message}</p>}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
