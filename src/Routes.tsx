
import React from 'react';
import { Routes as RouterRoutes, Route, Navigate, useParams } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Index from './pages/Index';
import SEODashboard from './pages/SEODashboard';
import Escorts from './pages/Escorts';
import Creators from './pages/Creators';
import CreatorDetail from './pages/CreatorDetail';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import { useAuth } from './hooks/auth/useAuth';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import MessagesPage from './pages/MessagesPage';
import MetaversePage from './pages/MetaversePage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import { useLanguage } from './contexts/LanguageContext';
import { languages } from './i18n/i18n';
import AIProfiles from "./pages/AIProfiles";
import EscortDetail from './pages/EscortDetail';
import EscortLiveStreams from './pages/EscortLiveStreams';
import EscortLiveStreamDetail from './pages/EscortLiveStreamDetail';
import HomePage from './pages/HomePage';
import AICompanionPage from './pages/ai-companion';
import Livecams from './pages/Livecams';
import LivecamDetail from './pages/LivecamDetail';
import CreatorDashboard from './components/creators/dashboard/Dashboard';
import VerificationContainer from './components/verification/VerificationContainer';

// Language route wrapper to handle language parameter
const LanguageRoute = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { changeLanguage } = useLanguage();
  
  React.useEffect(() => {
    if (lang && Object.keys(languages).includes(lang)) {
      changeLanguage(lang as keyof typeof languages);
    }
  }, [lang, changeLanguage]);
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isLoading } = useAuth();
  const { currentLanguage } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <RouterRoutes>
      {/* Language root redirect */}
      <Route path="/" element={<Navigate to={`/${currentLanguage}`} replace />} />
      
      {/* Root path for each language */}
      <Route path="/:lang" element={
        <LanguageRoute>
          <AppLayout />
        </LanguageRoute>
      }>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="escorts" element={<Escorts />} />
        <Route path="escorts/:id" element={<EscortDetail />} />
        <Route path="escort-streams" element={<EscortLiveStreams />} />
        <Route path="escort/:id/live" element={<EscortLiveStreamDetail />} />
        <Route path="creators" element={<Creators />} />
        <Route path="creators/:username" element={<CreatorDetail />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />
        <Route path="ai-profiles" element={<AIProfiles />} />
        <Route path="livecams" element={<Livecams />} />
        <Route path="livecams/:id" element={<LivecamDetail />} />
        <Route path="creator-application" element={<CreatorDashboard />} />
        <Route path="creator-dashboard" element={<CreatorDashboard />} />
        <Route path="verification" element={<VerificationContainer />} />
        <Route path="ai-companion" element={<AICompanionPage />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="favorites" element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        } />
        <Route path="messages" element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        } />
        <Route path="metaverse" element={
          <ProtectedRoute>
            <MetaversePage />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        {/* Protected SEO Routes - Require Admin/Moderator roles */}
        <Route path="seo/*" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />

        {/* Add a 404 catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Route>
      
      {/* Catch-all redirect to language route */}
      <Route path="*" element={<Navigate to={`/${currentLanguage}`} replace />} />
    </RouterRoutes>
  );
};

export default AppRoutes;
