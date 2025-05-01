
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MainLayout from '@/components/layout/MainLayout';
import { AppRoutes as AppRoutePaths } from '@/utils/navigation';
import MetaversePage from '@/pages/MetaversePage';
import WalletPage from '@/pages/WalletPage';
import AICompanionsPage from '@/pages/AICompanionsPage';
import PulseBoostPage from '@/pages/PulseBoostPage';
import MessagesPage from '@/pages/MessagesPage';
import SearchPage from '@/pages/SearchPage';
import EscortsPage from '@/pages/EscortsPage';
import ProfilePage from '@/pages/ProfilePage';
import { logInteraction } from '@/utils/uberCore';

// UberCore initialization
import { lucie } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { orus } from '@/core/Orus';
import { uberCore } from '@/core/UberCore';

/**
 * Main application routes component with UberCore integration
 */
const AppRoutes = () => {
  const location = useLocation();
  
  // Initialize UberCore modules
  useEffect(() => {
    const initCore = async () => {
      console.log('Initializing UberCore modules...');
      
      // Initialize core modules
      await Promise.all([
        lucie.initialize(),
        hermes.initialize(), 
        uberCore.initialize()
      ]);
      
      // Check system integrity
      const integrityResult = orus.checkIntegrity();
      
      if (!integrityResult.isValid) {
        console.error('System integrity check failed:', integrityResult.message);
      } else {
        console.log('System integrity verified:', integrityResult.message);
      }
    };
    
    initCore();
  }, []);

  // Log route changes with Hermes for flow analysis
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Connect to Hermes
    hermes.connect({
      system: 'Router',
      connectionId: `route-${Date.now()}`,
      metadata: {
        path: currentPath,
        timestamp: new Date().toISOString()
      }
    });
    
    // Also log through uberCore utils
    logInteraction('Router', 'route-change', { path: currentPath });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
      <Route path="/pulse-boost" element={
        <MainLayout>
          <PulseBoostPage />
        </MainLayout>
      } />
      <Route path="/ai-companions" element={
        <MainLayout>
          <AICompanionsPage />
        </MainLayout>
      } />
      <Route path="/messages" element={
        <MainLayout>
          <MessagesPage />
        </MainLayout>
      } />
      <Route path="/search" element={
        <MainLayout>
          <SearchPage />
        </MainLayout>
      } />
      <Route path="/escorts" element={
        <MainLayout>
          <EscortsPage />
        </MainLayout>
      } />
      <Route path="/profile" element={
        <MainLayout>
          <ProfilePage />
        </MainLayout>
      } />
      <Route path="/persona/:id" element={
        <MainLayout>
          <ProfilePage />
        </MainLayout>
      } />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
