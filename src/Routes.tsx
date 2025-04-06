
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Index from './pages/Index';
import SEODashboard from './pages/SEODashboard';
import Escorts from './pages/Escorts';
import Creators from './pages/Creators';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import { useAuth } from './hooks/auth/useAuth';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import MessagesPage from './pages/MessagesPage';
import MetaversePage from './pages/MetaversePage';
import SearchPage from './pages/SearchPage';

const AppRoutes = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* App Layout Routes */}
      <Route element={<AppLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/escorts" element={<Escorts />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/search" element={<SearchPage />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/favorites" element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        } />
        <Route path="/metaverse" element={
          <ProtectedRoute>
            <MetaversePage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        {/* Protected SEO Routes - Require Admin/Moderator roles */}
        <Route path="/seo/*" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin', 'moderator']}>
              <SEODashboard />
            </RoleGuard>
          </ProtectedRoute>
        } />

        {/* Add a 404 catch-all route */}
        <Route path="*" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Page Not Found</h1></div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
