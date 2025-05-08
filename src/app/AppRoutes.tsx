
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';
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
import RouteSharePage from '@/pages/safety/RouteSharePage';
import ProfilePage from '@/pages/ProfilePage';
import MessagesPage from '@/pages/MessagesPage';
import WalletPage from '@/pages/WalletPage';
import FavoritesPage from '@/pages/FavoritesPage';
import EscortsPage from '@/pages/EscortsPage';
import EscortDetailPage from '@/pages/EscortDetailPage';
import HomePage from '@/pages/HomePage';
import BookPage from '@/pages/BookPage';

/**
 * Main application routes component
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth page with dedicated route */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Home redirects to dashboard */}
      <Route path="/" element={<HomePage />} />
      
      {/* Main application routes */}
      <Route element={<Layout />}>
        {/* Core routes */}
        <Route path={AppPaths.PROFILE} element={<ProfilePage />} />
        <Route path={AppPaths.MESSAGES} element={<MessagesPage />} />
        <Route path={AppPaths.WALLET} element={<WalletPage />} />
        <Route path={AppPaths.FAVORITES} element={<FavoritesPage />} />
        <Route path={AppPaths.DASHBOARD} element={<DashboardPage />} />
        <Route path="/book" element={<BookPage />} />
        
        {/* Escort routes */}
        <Route path={AppPaths.ESCORTS} element={<EscortsPage />} />
        <Route path={AppPaths.ESCORT_DETAIL} element={<EscortDetailPage />} />
        
        {/* Neural routes */}
        <Route path={AppPaths.NEURAL_MONITOR} element={<NeuralMonitorPage />} />
        <Route path={AppPaths.NEURAL_ANALYTICS} element={<NeuralAnalyticsPage />} />
        
        {/* Admin routes */}
        <Route 
          path={AppPaths.ADMIN} 
          element={
            <AuthGuard requiredRoles={['admin']}>
              <AdminPage />
            </AuthGuard>
          } 
        />
        
        {/* SEO Dashboard */}
        <Route path={AppPaths.SEO} element={<SEODashboard />} />
        
        {/* Safety routes */}
        <Route path={AppPaths.SAFETY} element={<SafetyPage />} />
        <Route path="/safety/route-share" element={<RouteSharePage />} />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
