import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthField from '../../components/auth/AuthField';
import AuthAlert from '../../components/auth/AuthAlert';
import { useAuth } from '../../context/AuthContext';
import { useRecaptcha } from '../../hooks/useRecaptcha';
import {
  getAuthErrorMessage,
  isValidEmail,
} from '../../utils/authValidation';

export default function LoginPage() {
  const { login } = useAuth();
  const { getToken } = useRecaptcha();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError('');
  };

  const validate = () => {
    const nextErrors = {};
    if (!isValidEmail(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setFormError('');

    try {
      const recaptchaToken = await getToken('login');

      const result = await login({
        email: form.email.trim(),
        password: form.password,
        ...(recaptchaToken ? { recaptchaToken } : {}),
      });

      const role = result?.data?.user?.role;
      const redirectTo =
        location.state?.from ||
        (role === 'admin' ? '/dashboard' : '/');

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFormError(getAuthErrorMessage(error, 'Unable to sign in.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your account."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/auth/signup" className="font-medium text-cyan-300 hover:text-cyan-200">
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthAlert message={formError} />

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
          autoComplete="current-password"
          placeholder="••••••••"
          disabled={submitting}
        />

        <div className="flex justify-end">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-cyan-300 transition hover:text-cyan-200"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  );
}
