/**
 * AuthContext — Global authentication state for the SPA.
 * Purpose: Persist session tokens, load current user, expose login/signup/logout.
 * Used by: App (AuthProvider), Header, ProtectedRoute, auth pages, AdminLayout.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  authApi,
  clearStoredSession,
  getStoredAccessToken,
  getStoredRefreshToken,
  storeSession,
} from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const applyAuthResult = useCallback((payload) => {
    const nextUser = payload?.data?.user ?? null;
    const session = payload?.data?.session ?? null;

    if (session) {
      storeSession(session);
    }

    setUser(nextUser);
    return payload;
  }, []);

  const refreshSession = useCallback(async () => {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const result = await authApi.refreshSession(refreshToken);
    return applyAuthResult(result);
  }, [applyAuthResult]);

  const loadUser = useCallback(async () => {
    setLoading(true);

    try {
      if (!getStoredAccessToken() && !getStoredRefreshToken()) {
        setUser(null);
        return;
      }

      try {
        const result = await authApi.me();
        setUser(result?.data?.user ?? null);
      } catch (error) {
        if (error.status === 401 && getStoredRefreshToken()) {
          await refreshSession();
          return;
        }

        clearStoredSession();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [refreshSession]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(
    async (credentials) => {
      const result = await authApi.login(credentials);
      return applyAuthResult(result);
    },
    [applyAuthResult],
  );

  const signup = useCallback(
    async (payload) => {
      const result = await authApi.signup(payload);
      return applyAuthResult(result);
    },
    [applyAuthResult],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Clear local session even if the API call fails
    } finally {
      clearStoredSession();
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      signup,
      logout,
      refreshSession,
      reloadUser: loadUser,
      setUser,
    }),
    [user, loading, login, signup, logout, refreshSession, loadUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
