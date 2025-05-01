
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
import PulseBoostPage from '@/pages/PulseBoostPage';
import MessagesPage from '@/pages/MessagesPage';
import SearchPage from '@/pages/SearchPage';
import EscortsPage from '@/pages/EscortsPage';
import { logInteraction } from '@/utils/uberCore';

/**
 * Main application routes component
 */
const AppRoutes = () => {
  // Log route changes with Hermes for flow analysis
  const logRouteChange = (path: string) => {
    logInteraction('Router', 'route-change', { path });
  };

  React.useEffect(() => {
    // Log initial route
    logRouteChange(window.location.pathname);
    
    // Set up listener for route changes
    const handleRouteChange = () => {
      logRouteChange(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

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
      
      {/* Previously placeholder routes, now implemented */}
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
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  );
};

export default AppRoutes;
