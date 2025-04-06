
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import SEODashboard from './pages/SEODashboard';
import Escorts from './pages/Escorts';
import Creators from './pages/Creators';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/escorts" element={<Escorts />} />
        <Route path="/creators" element={<Creators />} />
        
        {/* Protected SEO Routes - Require authentication and appropriate roles */}
        <Route path="/seo" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/seo/history" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/seo/analytics" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/seo/optimize/:contentId" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/seo/new-optimization" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/seo/optimize-profile" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/seo/optimize-content" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/seo/optimize-live" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/seo/tools" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />

        {/* Add routes for other pages */}
        <Route path="/messages" element={
          <ProtectedRoute>
            <div>Messages Page (Coming Soon)</div>
          </ProtectedRoute>
        } />
        <Route path="/metaverse" element={
          <ProtectedRoute>
            <div>Metaverse Page (Coming Soon)</div>
          </ProtectedRoute>
        } />

        {/* Add a 404 catch-all route */}
        <Route path="*" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Page Not Found</h1></div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
