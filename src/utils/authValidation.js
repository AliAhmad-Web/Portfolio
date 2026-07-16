/**
 * Auth form validation helpers.
 * Purpose: Shared email/password checks and auth error messaging for auth pages + contact.
 * Used by: auth pages, ContactSection.
 */

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export function validatePassword(password) {
  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must include at least one number.';
  }
  return null;
}

export function getAuthErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error) return fallback;

  if (Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors.map((item) => item.message).join(' ');
  }

  return error.message || fallback;
}

export function parseAuthHashParams() {
  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;

  const params = new URLSearchParams(hash);
  const query = new URLSearchParams(window.location.search);

  return {
    accessToken: params.get('access_token') || query.get('access_token'),
    refreshToken: params.get('refresh_token') || query.get('refresh_token'),
    type: params.get('type') || query.get('type'),
    error: params.get('error') || query.get('error'),
    errorDescription:
      params.get('error_description') || query.get('error_description'),
  };
}
