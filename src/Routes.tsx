import React, { lazy, Suspense } from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Use lazy loading for route components
const HomePage = lazy(() => import('./pages/HomePage'));
const Auth = lazy(() => import('./pages/Auth'));
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
const CreatorDashboard = lazy(() => import('./components/creators/dashboard/Dashboard'));
const VerificationContainer = lazy(() => import('./components/verification/VerificationContainer'));
const AICompanionPage = lazy(() => import('./pages/AICompanionPage'));
const SEODashboard = lazy(() => import('./pages/SEODashboard'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
  </div>
);

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        } />
        
        <Route path="auth" element={
          <Suspense fallback={<PageLoader />}>
            <Auth />
          </Suspense>
        } />
        
        <Route path="escorts" element={
          <Suspense fallback={<PageLoader />}>
            <Escorts />
          </Suspense>
        } />
        
        <Route path="escorts/:id" element={
          <Suspense fallback={<PageLoader />}>
            <EscortDetail />
          </Suspense>
        } />
        
        <Route path="escort-streams" element={
          <Suspense fallback={<PageLoader />}>
            <EscortLiveStreams />
          </Suspense>
        } />
        
        <Route path="escort/:id/live" element={
          <Suspense fallback={<PageLoader />}>
            <EscortLiveStreamDetail />
          </Suspense>
        } />
        
        <Route path="creators" element={
          <Suspense fallback={<PageLoader />}>
            <Creators />
          </Suspense>
        } />
        
        <Route path="creators/:username" element={
          <Suspense fallback={<PageLoader />}>
            <CreatorDetail />
          </Suspense>
        } />
        
        <Route path="search" element={
          <Suspense fallback={<PageLoader />}>
            <SearchPage />
          </Suspense>
        } />
        
        <Route path="ai-profiles" element={
          <Suspense fallback={<PageLoader />}>
            <AIProfiles />
          </Suspense>
        } />
        
        <Route path="livecams" element={
          <Suspense fallback={<PageLoader />}>
            <Livecams />
          </Suspense>
        } />
        
        <Route path="livecams/:id" element={
          <Suspense fallback={<PageLoader />}>
            <LivecamDetail />
          </Suspense>
        } />
        
        <Route path="ai-companions" element={<AICompanionPage />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="favorites" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <FavoritesPage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="messages" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <MessagesPage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="metaverse" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <MetaversePage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="creator-application" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <CreatorDashboard />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="creator-dashboard" element={
          <ProtectedRoute requiredRoles={["creator"]}>
            <Suspense fallback={<PageLoader />}>
              <CreatorDashboard />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="verification" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <VerificationContainer />
            </Suspense>
          </ProtectedRoute>
        } />
        
        {/* Protected SEO Routes - Require Admin/Moderator roles */}
        <Route path="seo/*" element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Suspense fallback={<PageLoader />}>
              <SEODashboard />
            </Suspense>
          </ProtectedRoute>
        } />
        
        {/* Add a 404 catch-all route */}
        <Route path="*" element={
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </RouterRoutes>
  );
}

export default Routes;
