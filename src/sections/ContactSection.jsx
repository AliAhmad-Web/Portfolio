import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const initialForm = { name: '', email: '', message: '' };

export default function ContactSection({ showToast }) {
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 12) nextErrors.message = 'Message should be at least 12 characters.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const serviceId = 'service_91voyhu';
      const templateId = 'template_go8vwsh';
      const publicKey = 'sAcGLdIrcLGOLyYIj';

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are not configured.');
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setForm(initialForm);
      setErrors({});
      showToast('Message sent successfully. I will reply soon!', 'success');
    } catch (error) {
      showToast(error.message || 'Unable to send message right now. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 }}>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Contact</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Let’s build something memorable together.</h2>
          <p className="mt-4 text-slate-300">Have a project in mind or want to discuss your next website? Send a quick note and I’ll get back to you with next steps.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:alikhan234ali@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 hover:border-cyan-400 hover:text-cyan-100"><FaEnvelope /> alikhan234ali@gmail.com</a>
            <a href="https://github.com/alikhan234ali" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 hover:border-cyan-400 hover:text-cyan-100"><FaGithub /> GitHub</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 hover:border-cyan-400 hover:text-cyan-100"><FaLinkedin /> LinkedIn</a>
          </div>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-200">Name
              <input type="text" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400" placeholder="Your name" />
              {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}
            </label>
            <label className="text-sm text-slate-200">Email
              <input type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400" placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
            </label>
          </div>
          <label className="mt-4 block text-sm text-slate-200">Message
            <textarea name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="6" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400" placeholder="Tell me about your project..." />
            {errors.message && <p className="mt-1 text-xs text-rose-300">{errors.message}</p>}
          </label>
          <button type="submit" disabled={submitting} className="mt-6 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70">{submitting ? 'Sending...' : 'Send Message'}</button>
        </motion.form>
      </div>
    </section>
  );
}
