/**
 * Google reCAPTCHA v3 client helpers.
 * Purpose: Load the script and execute actions using VITE_RECAPTCHA_SITE_KEY.
 * Used by: useRecaptcha hook (Contact + Login).
 */

const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-v3';
const RECAPTCHA_SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js';

let loadPromise = null;

export function getRecaptchaSiteKey() {
  return import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim() || '';
}

export function isRecaptchaConfigured() {
  return Boolean(getRecaptchaSiteKey());
}

export function loadRecaptchaScript(siteKey = getRecaptchaSiteKey()) {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('reCAPTCHA can only run in the browser.'));
  }

  if (!siteKey) {
    return Promise.reject(new Error('reCAPTCHA site key is not configured.'));
  }

  if (window.grecaptcha?.execute) {
    return Promise.resolve(window.grecaptcha);
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(RECAPTCHA_SCRIPT_ID);

    if (existing) {
      existing.addEventListener('load', () => resolve(window.grecaptcha), { once: true });
      existing.addEventListener(
        'error',
        () => {
          loadPromise = null;
          reject(new Error('Failed to load Google reCAPTCHA.'));
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `${RECAPTCHA_SCRIPT_SRC}?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (!window.grecaptcha) {
        loadPromise = null;
        reject(new Error('Google reCAPTCHA failed to initialize.'));
        return;
      }
      resolve(window.grecaptcha);
    };

    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Failed to load Google reCAPTCHA.'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

/**
 * Executes reCAPTCHA v3 for the given action and returns a token.
 * Returns null when the site key is not configured (local/dev without keys).
 */
export async function executeRecaptcha(action) {
  const siteKey = getRecaptchaSiteKey();

  if (!siteKey) {
    console.warn(
      '[recaptcha] VITE_RECAPTCHA_SITE_KEY is not set — skipping client token.',
    );
    return null;
  }

  if (!action || typeof action !== 'string') {
    throw new Error('reCAPTCHA action is required.');
  }

  const grecaptcha = await loadRecaptchaScript(siteKey);

  await new Promise((resolve) => {
    grecaptcha.ready(resolve);
  });

  const token = await grecaptcha.execute(siteKey, { action });

  if (!token) {
    throw new Error('Unable to generate reCAPTCHA token. Please try again.');
  }

  return token;
}
