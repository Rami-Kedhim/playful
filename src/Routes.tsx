
import React, { lazy, Suspense } from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Loader2 } from 'lucide-react';
import HomePage from './pages/HomePage';
import Escorts from './pages/Escorts';
import Creators from './pages/Creators';

// Use lazy loading for additional route components
const Auth = lazy(() => import('./pages/Auth'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const MetaversePage = lazy(() => import('./pages/MetaversePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const EscortDetail = lazy(() => import('./pages/EscortDetail'));
const EscortLiveStreams = lazy(() => import('./pages/EscortLiveStreams'));
const EscortLiveStreamDetail = lazy(() => import('./pages/EscortLiveStreamDetail'));
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
      {/* Home route - use HomePage component */}
      <Route path="/" element={<HomePage />} />
      <Route path="/escorts" element={<Escorts />} />
      <Route path="/creators" element={<Creators />} />
      <Route path="/assessment" element={
        <Suspense fallback={<PageLoader />}>
          <AppLayout>
            <div className="container mx-auto p-6">
              <h1 className="text-2xl font-bold mb-6">Assessment Dashboard</h1>
            </div>
          </AppLayout>
        </Suspense>
      } />
      
      <Route path="auth" element={
        <Suspense fallback={<PageLoader />}>
          <Auth />
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
        
      <Route path="ai-companions" element={
        <Suspense fallback={<PageLoader />}>
          <AICompanionPage />
        </Suspense>
      } />
        
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
    </RouterRoutes>
  );
}

export default Routes;
