import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthField from '../../components/auth/AuthField';
import AuthAlert from '../../components/auth/AuthAlert';
import { authApi, storeSession } from '../../lib/api';
import {
  getAuthErrorMessage,
  parseAuthHashParams,
  validatePassword,
} from '../../utils/authValidation';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = parseAuthHashParams();

    if (params.error) {
      setFormError(
        params.errorDescription?.replace(/\+/g, ' ') ||
          'This reset link is invalid or has expired.',
      );
      return;
    }

    if (params.accessToken) {
      setAccessToken(params.accessToken);
      storeSession({
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError('');
  };

  const validate = () => {
    const nextErrors = {};
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

    if (!accessToken) {
      setFormError(
        'Missing recovery token. Open the reset link from your email again.',
      );
      return;
    }

    setSubmitting(true);
    setFormError('');
    setSuccess('');

    try {
      await authApi.resetPassword({
        password: form.password,
        accessToken,
      });
      setSuccess('Password updated successfully. You can now sign in.');
      setTimeout(() => navigate('/auth/login', { replace: true }), 1500);
    } catch (error) {
      setFormError(getAuthErrorMessage(error, 'Unable to reset password.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Choose a strong new password for your account."
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
          id="password"
          label="New password"
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
          label="Confirm new password"
          type="password"
          value={form.confirmPassword}
          onChange={updateField('confirmPassword')}
          error={errors.confirmPassword}
          autoComplete="new-password"
          placeholder="Repeat your new password"
          disabled={submitting}
        />

        <button
          type="submit"
          disabled={submitting || !accessToken}
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </AuthLayout>
  );
}
