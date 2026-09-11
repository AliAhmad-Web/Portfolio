/**
 * App — Root React router for the portfolio SPA.
 * Purpose: Declare public, auth, and admin routes; wrap with AuthProvider.
 * Used by: main.jsx entry point.
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';

const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const DashboardHomePage = lazy(() => import('./pages/admin/DashboardHomePage'));
const ContactsPage = lazy(() => import('./pages/admin/ContactsPage'));
const ProfilePage = lazy(() => import('./pages/admin/ProfilePage'));

function RouteFallback() {
  return <div className="site-shell min-h-screen bg-[#020617]" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHomePage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
