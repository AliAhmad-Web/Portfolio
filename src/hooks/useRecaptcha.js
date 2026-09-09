/**
 * useRecaptcha — Loads reCAPTCHA v3 and returns a token getter.
 * Purpose: Shared client-side bot protection for Contact + Login forms.
 * Used by: ContactSection, LoginPage.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  executeRecaptcha,
  getRecaptchaSiteKey,
  isRecaptchaConfigured,
  loadRecaptchaScript,
} from '../lib/recaptcha';

export function useRecaptcha() {
  const configured = isRecaptchaConfigured();
  const [ready, setReady] = useState(!configured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!configured) {
      setReady(true);
      return undefined;
    }

    let cancelled = false;
    const idle = window.requestIdleCallback
      ? (callback) => window.requestIdleCallback(callback, { timeout: 4000 })
      : (callback) => window.setTimeout(callback, 3500);
    const cancelIdle = window.cancelIdleCallback
      ? window.cancelIdleCallback
      : window.clearTimeout;

    const idleId = idle(() => {
      loadRecaptchaScript(getRecaptchaSiteKey())
        .catch((err) => {
          if (!cancelled) {
            setError(err.message || 'Failed to load reCAPTCHA.');
          }
        })
        .finally(() => {
          if (!cancelled) {
            setReady(true);
          }
        });
    });

    return () => {
      cancelled = true;
      cancelIdle(idleId);
    };
  }, [configured]);

  const getToken = useCallback(async (action) => {
    setError(null);

    try {
      return await executeRecaptcha(action);
    } catch (err) {
      const message = err.message || 'reCAPTCHA verification failed.';
      setError(message);
      throw err;
    }
  }, []);

  return {
    configured,
    ready,
    error,
    getToken,
  };
}
