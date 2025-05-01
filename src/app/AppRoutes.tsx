
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MainLayout from '@/components/layout/MainLayout';
import { AppRoutes as Routes } from '@/utils/navigation';

/**
 * Main application routes component
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <MainLayout hideNavbar hideFooter>
          <HomePage />
        </MainLayout>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Core system routes */}
      <Route path="/metaverse" element={<div>Metaverse Page (Coming Soon)</div>} />
      <Route path="/wallet" element={<div>Wallet Page (Coming Soon)</div>} />
      <Route path="/pulse-boost" element={<div>Pulse Boost Page (Coming Soon)</div>} />
      <Route path="/ai-companions" element={<div>AI Companions Page (Coming Soon)</div>} />
      <Route path="/messages" element={<div>Messages Page (Coming Soon)</div>} />
      <Route path="/search" element={<div>Search Page (Coming Soon)</div>} />
      <Route path="/escorts" element={<div>Escorts Page (Coming Soon)</div>} />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
