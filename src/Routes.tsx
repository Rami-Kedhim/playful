
import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import MessagesPage from './pages/MessagesPage';
import MetaversePage from './pages/MetaversePage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import { useLanguage } from './contexts/LanguageContext';
import Escorts from './pages/Escorts';
import EscortDetail from './pages/EscortDetail';
import EscortLiveStreams from './pages/EscortLiveStreams';
import EscortLiveStreamDetail from './pages/EscortLiveStreamDetail';
import Creators from './pages/Creators';
import CreatorDetail from './pages/CreatorDetail';
import AIProfiles from "./pages/AIProfiles";
import Livecams from './pages/Livecams';
import LivecamDetail from './pages/LivecamDetail';
import CreatorDashboard from './components/creators/dashboard/Dashboard';
import VerificationContainer from './components/verification/VerificationContainer';
import AICompanionPage from './pages/ai-companion';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import SEODashboard from './pages/SEODashboard';

const AppRoutes = () => {
  const { currentLanguage } = useLanguage();

  return (
    <RouterRoutes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="escorts" element={<Escorts />} />
        <Route path="escorts/:id" element={<EscortDetail />} />
        <Route path="escort-streams" element={<EscortLiveStreams />} />
        <Route path="escort/:id/live" element={<EscortLiveStreamDetail />} />
        <Route path="creators" element={<Creators />} />
        <Route path="creators/:username" element={<CreatorDetail />} />
        <Route path="search" element={<SearchPage />} />
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
    </RouterRoutes>
  );
};

export default AppRoutes;
