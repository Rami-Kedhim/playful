
import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MainLayout from '@/components/layout/MainLayout';
import { AppRoutes as AppRoutePaths } from '@/utils/navigation';
import MetaversePage from '@/pages/MetaversePage';
import WalletPage from '@/pages/WalletPage';
import AICompanionsPage from '@/pages/AICompanionsPage';

/**
 * Main application routes component
 */
const AppRoutes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={
        <MainLayout hideNavbar hideFooter>
          <HomePage />
        </MainLayout>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Core system routes */}
      <Route path="/metaverse" element={
        <MainLayout>
          <MetaversePage />
        </MainLayout>
      } />
      <Route path="/wallet" element={
        <MainLayout>
          <WalletPage />
        </MainLayout>
      } />
      <Route path="/pulse-boost" element={<div>Pulse Boost Page (Coming Soon)</div>} />
      <Route path="/ai-companions" element={
        <MainLayout>
          <AICompanionsPage />
        </MainLayout>
      } />
      <Route path="/messages" element={<div>Messages Page (Coming Soon)</div>} />
      <Route path="/search" element={<div>Search Page (Coming Soon)</div>} />
      <Route path="/escorts" element={<div>Escorts Page (Coming Soon)</div>} />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  );
};

export default AppRoutes;
