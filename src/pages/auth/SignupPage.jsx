import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthField from '../../components/auth/AuthField';
import AuthAlert from '../../components/auth/AuthAlert';
import { useAuth } from '../../context/AuthContext';
import {
  getAuthErrorMessage,
  isValidEmail,
  validatePassword,
} from '../../utils/authValidation';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError('');
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Full name must be at least 2 characters.';
    }
    if (!isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) nextErrors.password = passwordError;

    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setFormError('');
    setFormSuccess('');

    try {
      const result = await signup({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (result?.data?.needsEmailVerification || !result?.data?.session) {
        setFormSuccess(
          'Account created. Please check your email to verify your account before signing in.',
        );
        setForm(initialForm);
        return;
      }

      navigate(result?.data?.user?.role === 'admin' ? '/dashboard' : '/', {
        replace: true,
      });
    } catch (error) {
      setFormError(getAuthErrorMessage(error, 'Unable to create account.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join with email verification enabled for secure access."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/auth/login" className="font-medium text-cyan-300 hover:text-cyan-200">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthAlert type="success" message={formSuccess} />
        <AuthAlert message={formError} />

        <AuthField
          id="fullName"
          label="Full name"
          value={form.fullName}
          onChange={updateField('fullName')}
          error={errors.fullName}
          autoComplete="name"
          placeholder="Ali Ahmad"
          disabled={submitting}
        />

        <AuthField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={updateField('email')}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={submitting}
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={updateField('password')}
          error={errors.password}
          autoComplete="new-password"
          placeholder="At least 8 chars, 1 uppercase, 1 number"
          disabled={submitting}
        />

        <AuthField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={form.confirmPassword}
          onChange={updateField('confirmPassword')}
          error={errors.confirmPassword}
          autoComplete="new-password"
          placeholder="Repeat your password"
          disabled={submitting}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
}
