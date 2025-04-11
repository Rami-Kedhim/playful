
import React, { lazy, Suspense } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Auth page
import AuthPage from './pages/AuthPage';

// Use lazy loading for route components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const MetaversePage = lazy(() => import('./pages/MetaversePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Escorts = lazy(() => import('./pages/Escorts'));
const EscortDetail = lazy(() => import('./pages/EscortDetail'));
const EscortLiveStreams = lazy(() => import('./pages/EscortLiveStreams'));
const EscortLiveStreamDetail = lazy(() => import('./pages/EscortLiveStreamDetail'));
const Creators = lazy(() => import('./pages/Creators'));
const CreatorDetail = lazy(() => import('./pages/CreatorDetail'));
const AIProfiles = lazy(() => import("./pages/AIProfiles"));
const Livecams = lazy(() => import('./pages/Livecams'));
const LivecamDetail = lazy(() => import('./pages/LivecamDetail'));
const BrainHubPage = lazy(() => import('./pages/BrainHubPage'));
const NSFWImageGeneratorPage = lazy(() => import('./pages/NSFWImageGeneratorPage'));
const AICompanionPage = lazy(() => import('./pages/ai-companion'));
const ServiceTypeDemo = lazy(() => import('./pages/ServiceTypeDemo'));
const WalletPage = lazy(() => import('./pages/Wallet')); // Import Wallet page
const UpdatedWalletPage = lazy(() => import('./pages/UpdatedWallet')); // Import UpdatedWallet page

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
  </div>
);

// Main routes component
const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Routes using AppLayout */}
        <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
        
        {/* Protected routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout><ProfilePage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <AppLayout><FavoritesPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <AppLayout><MessagesPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/wallet" element={
          <ProtectedRoute>
            <AppLayout><WalletPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/updated-wallet" element={
          <ProtectedRoute>
            <AppLayout><UpdatedWalletPage /></AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Public routes */}
        <Route path="/metaverse" element={<AppLayout><MetaversePage /></AppLayout>} />
        <Route path="/search" element={<AppLayout><SearchPage /></AppLayout>} />
        <Route path="/escorts" element={<AppLayout><Escorts /></AppLayout>} />
        <Route path="/escorts/:id" element={<AppLayout><EscortDetail /></AppLayout>} />
        <Route path="/escorts/live" element={<AppLayout><EscortLiveStreams /></AppLayout>} />
        <Route path="/escorts/live/:id" element={<AppLayout><EscortLiveStreamDetail /></AppLayout>} />
        <Route path="/creators" element={<AppLayout><Creators /></AppLayout>} />
        <Route path="/creators/:id" element={<AppLayout><CreatorDetail /></AppLayout>} />
        <Route path="/ai-profiles" element={<AppLayout><AIProfiles /></AppLayout>} />
        <Route path="/livecams" element={<AppLayout><Livecams /></AppLayout>} />
        <Route path="/livecams/:id" element={<AppLayout><LivecamDetail /></AppLayout>} />
        
        {/* Admin routes */}
        <Route path="/brain-hub" element={
          <ProtectedRoute>
            <AppLayout><BrainHubPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/nsfw-image-generator" element={
          <ProtectedRoute>
            <AppLayout><NSFWImageGeneratorPage /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/ai-companion" element={<AppLayout><AICompanionPage /></AppLayout>} />
        <Route path="/service-type-demo" element={<AppLayout><ServiceTypeDemo /></AppLayout>} />
        
        {/* 404 route */}
        <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
      </RouterRoutes>
    </Suspense>
  );
};

export default AppRoutes;
