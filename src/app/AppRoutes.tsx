
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { APP_PATHS } from '@/routes/routeConfig';
import { UnifiedRoutes } from '@/routes/unifiedRoutes';
import AuthGuard from '@/components/auth/AuthGuard';
import UnifiedLayout from '@/layouts/UnifiedLayout';

// Page imports
import HomePage from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';
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
import BookPage from '@/pages/BookPage';
import CreatorsPage from '@/pages/CreatorsPage';
import CreatorDetailPage from '@/pages/CreatorDetailPage';
import LivecamsPage from '@/pages/LivecamsPage';
import LivecamDetailPage from '@/pages/LivecamDetailPage';
import SettingsPage from '@/pages/SettingsPage';
import MediaGenerationPage from '@/pages/MediaGenerationPage';
import NSFWImageGeneratorPage from '@/pages/NSFWImageGeneratorPage';
import LuciePage from '@/pages/LuciePage';
import LucieTalkPage from '@/pages/lucie/LucieTalkPage';
import LucieGuidePage from '@/pages/lucie/LucieGuidePage';
import LucieBoostPage from '@/pages/lucie/LucieBoostPage';
import GuidelinesPage from '@/pages/GuidelinesPage';
import WalletRechargePage from '@/pages/wallet/WalletRechargePage';
import WalletHistoryPage from '@/pages/wallet/WalletHistoryPage';
import BookingsPage from '@/pages/bookings/BookingsPage';
import BookingsNewPage from '@/pages/bookings/BookingsNewPage';
import BookingsHistoryPage from '@/pages/bookings/BookingsHistoryPage';
import EscortMapPage from '@/pages/escorts/EscortMapPage';
import EscortVerifiedPage from '@/pages/escorts/EscortVerifiedPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminReportsPage from '@/pages/admin/AdminReportsPage';

/**
 * Main application routes component
 * Implements the unified UberEscorts route structure
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth page with dedicated route */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Home page */}
      <Route path={UnifiedRoutes.home} element={<HomePage />} />
      
      {/* Main application routes */}
      <Route element={<UnifiedLayout />}>
        {/* Escort routes */}
        <Route path={UnifiedRoutes.escorts.base} element={<EscortsPage />} />
        <Route path={UnifiedRoutes.escorts.profile} element={<EscortDetailPage />} />
        <Route path={UnifiedRoutes.escorts.map} element={<EscortMapPage />} />
        <Route path={UnifiedRoutes.escorts.verified} element={<EscortVerifiedPage />} />
        
        {/* Creator routes */}
        <Route path={UnifiedRoutes.creators.base} element={<CreatorsPage />} />
        <Route path={UnifiedRoutes.creators.profile} element={<CreatorDetailPage />} />
        
        {/* Livecam routes */}
        <Route path={UnifiedRoutes.livecams.base} element={<LivecamsPage />} />
        <Route path={UnifiedRoutes.livecams.room} element={<LivecamDetailPage />} />
        
        {/* Wallet routes */}
        <Route path={UnifiedRoutes.wallet.base} element={<WalletPage />} />
        <Route path={UnifiedRoutes.wallet.recharge} element={<WalletRechargePage />} />
        <Route path={UnifiedRoutes.wallet.history} element={<WalletHistoryPage />} />
        
        {/* Bookings routes */}
        <Route path={UnifiedRoutes.bookings.base} element={<BookingsPage />} />
        <Route path={UnifiedRoutes.bookings.new} element={<BookingsNewPage />} />
        <Route path={UnifiedRoutes.bookings.history} element={<BookingsHistoryPage />} />
        
        {/* Lucie routes */}
        <Route path={UnifiedRoutes.lucie.base} element={<LuciePage />} />
        <Route path={UnifiedRoutes.lucie.talk} element={<LucieTalkPage />} />
        <Route path={UnifiedRoutes.lucie.guide} element={<LucieGuidePage />} />
        <Route path={UnifiedRoutes.lucie.boost} element={<LucieBoostPage />} />
        
        {/* Admin routes */}
        <Route path={UnifiedRoutes.admin.base} element={
          <AuthGuard requiredRoles={['admin']}>
            <AdminPage />
          </AuthGuard>
        } />
        <Route path={UnifiedRoutes.admin.users} element={
          <AuthGuard requiredRoles={['admin']}>
            <AdminUsersPage />
          </AuthGuard>
        } />
        <Route path={UnifiedRoutes.admin.reports} element={
          <AuthGuard requiredRoles={['admin']}>
            <AdminReportsPage />
          </AuthGuard>
        } />
        
        {/* Legacy routes - maintain for backward compatibility */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path={APP_PATHS.GUIDELINES} element={<GuidelinesPage />} />
        <Route path="/media-generation" element={<MediaGenerationPage />} />
        <Route path="/nsfw-generator" element={<NSFWImageGeneratorPage />} />
        <Route path={APP_PATHS.NEURAL_MONITOR} element={<NeuralMonitorPage />} />
        <Route path={APP_PATHS.NEURAL_ANALYTICS} element={<NeuralAnalyticsPage />} />
        <Route path={APP_PATHS.SEO} element={<SEODashboard />} />
        <Route path={APP_PATHS.SAFETY} element={<SafetyPage />} />
        <Route path="/safety/route-share" element={<RouteSharePage />} />
        <Route path={UnifiedRoutes.clients.favorites} element={<FavoritesPage />} />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
