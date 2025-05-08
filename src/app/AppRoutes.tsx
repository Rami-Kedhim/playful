
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { APP_PATHS } from '@/routes/routeConfig';
import Layout from '@/layouts/Layout';
import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AuthGuard from '@/components/auth/AuthGuard';
import SEODashboard from '@/pages/SEODashboard';
import DashboardPage from '@/pages/DashboardPage';
import AdminPage from '@/pages/AdminPage';
import NeuralMonitorPage from '@/pages/neural/NeuralMonitorPage';
import NeuralAnalyticsPage from '@/pages/neural/NeuralAnalyticsPage';
import SafetyPage from '@/pages/SafetyPage';
import RouteSharePage from '@/pages/RouteSharePage';
import ProfilePage from '@/pages/ProfilePage';
import MessagesPage from '@/pages/MessagesPage';
import WalletPage from '@/pages/WalletPage';
import FavoritesPage from '@/pages/FavoritesPage';
import EscortsPage from '@/pages/EscortsPage';
import EscortDetailPage from '@/pages/EscortDetailPage';
import HomePage from '@/pages/HomePage';
import BookPage from '@/pages/BookPage';
import CreatorsPage from '@/pages/CreatorsPage';
import CreatorDetailPage from '@/pages/CreatorDetailPage';
import LivecamsPage from '@/pages/LivecamsPage';
import LivecamDetailPage from '@/pages/LivecamDetailPage';
import SettingsPage from '@/pages/SettingsPage';
import MediaGenerationPage from '@/pages/MediaGenerationPage';
import NSFWImageGeneratorPage from '@/pages/NSFWImageGeneratorPage';
import LuciePage from '@/pages/LuciePage';
import GuidelinesPage from '@/pages/GuidelinesPage';

/**
 * Main application routes component
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth page with dedicated route */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Home page */}
      <Route path="/" element={<HomePage />} />
      
      {/* Main application routes */}
      <Route path="/" element={<Layout>{/* Fix: Providing children */}<Outlet /></Layout>}>
        {/* Core routes */}
        <Route path={APP_PATHS.PROFILE} element={<ProfilePage />} />
        <Route path={APP_PATHS.MESSAGES} element={<MessagesPage />} />
        <Route path={APP_PATHS.WALLET} element={<WalletPage />} />
        <Route path={APP_PATHS.FAVORITES} element={<FavoritesPage />} />
        <Route path={APP_PATHS.DASHBOARD} element={<DashboardPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/lucie" element={<LuciePage />} />
        <Route path={APP_PATHS.GUIDELINES} element={<GuidelinesPage />} />
        
        {/* Escort routes */}
        <Route path={APP_PATHS.ESCORTS} element={<EscortsPage />} />
        <Route path={APP_PATHS.ESCORT_DETAIL} element={<EscortDetailPage />} />
        
        {/* Creator routes */}
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/creators/:id" element={<CreatorDetailPage />} />
        
        {/* Livecam routes */}
        <Route path="/livecams" element={<LivecamsPage />} />
        <Route path="/livecams/:id" element={<LivecamDetailPage />} />
        
        {/* Media generation routes */}
        <Route path="/media-generation" element={<MediaGenerationPage />} />
        <Route path="/nsfw-generator" element={<NSFWImageGeneratorPage />} />
        
        {/* Neural routes */}
        <Route path={APP_PATHS.NEURAL_MONITOR} element={<NeuralMonitorPage />} />
        <Route path={APP_PATHS.NEURAL_ANALYTICS} element={<NeuralAnalyticsPage />} />
        
        {/* Admin routes */}
        <Route 
          path={APP_PATHS.ADMIN} 
          element={
            <AuthGuard requiredRoles={['admin']}>
              <AdminPage />
            </AuthGuard>
          } 
        />
        
        {/* SEO Dashboard */}
        <Route path={APP_PATHS.SEO} element={<SEODashboard />} />
        
        {/* Safety routes */}
        <Route path={APP_PATHS.SAFETY} element={<SafetyPage />} />
        <Route path="/safety/route-share" element={<RouteSharePage />} />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// Need to import Outlet
import { Outlet } from 'react-router-dom';

export default AppRoutes;
