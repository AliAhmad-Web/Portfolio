/**
 * Frontend API client for the Express `/api/v1` backend.
 * Purpose: Auth + admin HTTP helpers with session token storage.
 * Used by: AuthContext, admin pages, auth flows.
 */

import { API_BASE_URL } from '../data/site';

const ACCESS_TOKEN_KEY = 'portfolio_access_token';
const REFRESH_TOKEN_KEY = 'portfolio_refresh_token';

export function getStoredAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken() {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function storeSession(session) {
  if (!session) return;

  if (session.accessToken) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  }
  if (session.refreshToken) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  }
}

export function clearStoredSession() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(payload?.message || 'Request failed');
    error.status = response.status;
    error.errors = payload?.errors || null;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    body,
    token,
    auth = true,
    headers: customHeaders = {},
  } = options;

  const headers = {
    Accept: 'application/json',
    ...customHeaders,
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const accessToken = token ?? (auth ? getStoredAccessToken() : null);
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  return parseResponse(response);
}

export const authApi = {
  signup(payload) {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: payload,
      auth: false,
    });
  },

  login(payload) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: payload,
      auth: false,
    });
  },

  logout() {
    return apiRequest('/auth/logout', { method: 'POST' });
  },

  me() {
    return apiRequest('/auth/me');
  },

  forgotPassword(email) {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: { email },
      auth: false,
    });
  },

  resetPassword({ password, accessToken }) {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: { password, accessToken },
      token: accessToken,
      auth: false,
    });
  },

  refreshSession(refreshToken) {
    return apiRequest('/auth/refresh-session', {
      method: 'POST',
      body: { refreshToken },
      auth: false,
    });
  },

  resendVerification(email) {
    return apiRequest('/auth/resend-verification', {
      method: 'POST',
      body: { email },
      auth: false,
    });
  },

  verifyEmail(accessToken) {
    return apiRequest('/auth/verify-email', {
      method: 'GET',
      token: accessToken,
    });
  },
};

export const adminApi = {
  me() {
    return apiRequest('/admin/me');
  },

  dashboard() {
    return apiRequest('/admin/dashboard');
  },

  listContacts({ search = '', status = '', limit } = {}) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (limit) params.set('limit', String(limit));

    const query = params.toString();
    return apiRequest(`/admin/contacts${query ? `?${query}` : ''}`);
  },

  getContact(id) {
    return apiRequest(`/admin/contacts/${id}`);
  },

  updateContactStatus(id, status) {
    return apiRequest(`/admin/contacts/${id}/status`, {
      method: 'PATCH',
      body: { status },
    });
  },
};
