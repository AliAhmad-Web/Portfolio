import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthAlert from '../../components/auth/AuthAlert';
import AuthField from '../../components/auth/AuthField';
import { authApi, storeSession } from '../../lib/api';
import {
  getAuthErrorMessage,
  isValidEmail,
  parseAuthHashParams,
} from '../../utils/authValidation';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Verifying your email…');
  const [email, setEmail] = useState('');
  const [resendError, setResendError] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const params = parseAuthHashParams();

    async function verify() {
      if (params.error) {
        setStatus('error');
        setMessage(
          params.errorDescription?.replace(/\+/g, ' ') ||
            'Email verification failed. The link may have expired.',
        );
        return;
      }

      if (!params.accessToken) {
        setStatus('idle');
        setMessage(
          'Open the verification link from your email, or resend a new one below.',
        );
        return;
      }

      try {
        storeSession({
          accessToken: params.accessToken,
          refreshToken: params.refreshToken,
        });
        window.history.replaceState({}, document.title, window.location.pathname);

        const result = await authApi.verifyEmail(params.accessToken);
        const verified = result?.data?.user?.emailVerified;

        if (verified) {
          setStatus('success');
          setMessage('Your email is verified. You can now sign in.');
        } else {
          setStatus('error');
          setMessage('Email is not verified yet. Please try again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage(getAuthErrorMessage(error, 'Unable to verify email.'));
      }
    }

    verify();
  }, []);

  const handleResend = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setResendError('Enter a valid email address.');
      return;
    }

    setResending(true);
    setResendError('');
    setResendSuccess('');

    try {
      await authApi.resendVerification(email.trim());
      setResendSuccess(
        'If an account exists and is unverified, a verification email has been sent.',
      );
    } catch (error) {
      setResendError(getAuthErrorMessage(error, 'Unable to resend verification.'));
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout
      title="Email verification"
      subtitle="Confirm your email address to activate your account."
      footer={
        <Link to="/auth/login" className="font-medium text-cyan-300 hover:text-cyan-200">
          Back to sign in
        </Link>
      }
    >
      <div className="space-y-5">
        {status === 'checking' ? (
          <p className="text-sm text-slate-300">{message}</p>
        ) : (
          <AuthAlert
            type={status === 'success' ? 'success' : 'error'}
            message={message}
          />
        )}

        {status === 'success' ? (
          <Link
            to="/auth/login"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Continue to sign in
          </Link>
        ) : (
          <form className="space-y-4" onSubmit={handleResend} noValidate>
            <p className="text-sm text-slate-300">
              Need a new verification email? Enter your address below.
            </p>

            <AuthAlert type="success" message={resendSuccess} />
            <AuthAlert message={resendError} />

            <AuthField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setResendError('');
              }}
              autoComplete="email"
              placeholder="you@example.com"
              disabled={resending}
            />

            <button
              type="submit"
              disabled={resending}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resending ? 'Sending…' : 'Resend verification email'}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
