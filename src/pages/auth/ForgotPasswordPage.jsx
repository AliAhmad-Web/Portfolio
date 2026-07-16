import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthField from '../../components/auth/AuthField';
import AuthAlert from '../../components/auth/AuthAlert';
import { authApi } from '../../lib/api';
import {
  getAuthErrorMessage,
  isValidEmail,
} from '../../utils/authValidation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setError('');
    setFormError('');
    setSuccess('');

    try {
      await authApi.forgotPassword(email.trim());
      setSuccess(
        'If an account exists with this email, a password reset link has been sent.',
      );
    } catch (err) {
      setFormError(getAuthErrorMessage(err, 'Unable to send reset email.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we'll send a secure reset link."
      footer={
        <Link to="/auth/login" className="font-medium text-cyan-300 hover:text-cyan-200">
          Back to sign in
        </Link>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthAlert type="success" message={success} />
        <AuthAlert message={formError} />

        <AuthField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError('');
            setFormError('');
          }}
          error={error}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={submitting}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Sending link…' : 'Send reset link'}
        </button>
      </form>
    </AuthLayout>
  );
}
