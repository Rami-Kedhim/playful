
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { UnifiedLayout } from '@/components/layout';
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
import BrainHubPage from '@/pages/BrainHubPage';
import LuciePage from '@/pages/LuciePage';
import OxumPage from '@/pages/OxumPage';
import HermesPage from '@/pages/HermesPage';
import OrusPage from '@/pages/OrusPage';
import PersonaListingPage from '@/pages/PersonaListingPage';
import PersonaDetailPage from '@/pages/PersonaDetailPage';
import AdminPage from '@/pages/AdminPage';
import AdminApiPage from '@/pages/AdminApiPage';
import ModerationPage from '@/pages/ModerationPage';
import VerificationPage from '@/pages/VerificationPage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import NeuralAnalyticsPage from '@/pages/NeuralAnalyticsPage';
import NeuralMonitoringPage from '@/pages/NeuralMonitoringPage';

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
        <UnifiedLayout>
          <MetaversePage />
        </UnifiedLayout>
      } />
      <Route path="/wallet" element={
        <UnifiedLayout>
          <WalletPage />
        </UnifiedLayout>
      } />
      <Route path="/pulse-boost" element={
        <UnifiedLayout>
          <PulseBoostPage />
        </UnifiedLayout>
      } />
      <Route path="/ai-companions" element={
        <UnifiedLayout>
          <AICompanionsPage />
        </UnifiedLayout>
      } />
      <Route path="/messages" element={
        <UnifiedLayout>
          <MessagesPage />
        </UnifiedLayout>
      } />
      <Route path="/search" element={
        <UnifiedLayout>
          <SearchPage />
        </UnifiedLayout>
      } />
      <Route path="/escorts" element={
        <UnifiedLayout>
          <EscortsPage />
        </UnifiedLayout>
      } />
      <Route path="/profile" element={
        <UnifiedLayout>
          <ProfilePage />
        </UnifiedLayout>
      } />
      <Route path="/persona/:id" element={
        <UnifiedLayout>
          <PersonaDetailPage />
        </UnifiedLayout>
      } />
      <Route path="/personas" element={
        <UnifiedLayout>
          <PersonaListingPage />
        </UnifiedLayout>
      } />
      
      {/* UberCore system pages */}
      <Route path="/brain-hub" element={
        <UnifiedLayout>
          <BrainHubPage />
        </UnifiedLayout>
      } />
      <Route path="/lucie" element={
        <UnifiedLayout>
          <LuciePage />
        </UnifiedLayout>
      } />
      <Route path="/oxum" element={
        <UnifiedLayout>
          <OxumPage />
        </UnifiedLayout>
      } />
      <Route path="/hermes" element={
        <UnifiedLayout>
          <HermesPage />
        </UnifiedLayout>
      } />
      <Route path="/orus" element={
        <UnifiedLayout>
          <OrusPage />
        </UnifiedLayout>
      } />
      
      {/* Neural monitoring and analytics */}
      <Route path="/neural/monitor" element={
        <UnifiedLayout title="Neural Monitoring" showBreadcrumbs>
          <NeuralMonitoringPage />
        </UnifiedLayout>
      } />
      <Route path="/neural-monitoring" element={
        <UnifiedLayout title="Neural Monitoring" showBreadcrumbs>
          <NeuralMonitoringPage />
        </UnifiedLayout>
      } />
      <Route path="/neural-analytics" element={
        <UnifiedLayout title="Neural Analytics" showBreadcrumbs>
          <NeuralAnalyticsPage />
        </UnifiedLayout>
      } />
      
      {/* Admin routes */}
      <Route path="/admin" element={
        <UnifiedLayout requireAuth>
          <AdminPage />
        </UnifiedLayout>
      } />
      <Route path="/admin/apis" element={
        <UnifiedLayout requireAuth>
          <AdminApiPage />
        </UnifiedLayout>
      } />
      <Route path="/moderation" element={
        <UnifiedLayout requireAuth>
          <ModerationPage />
        </UnifiedLayout>
      } />
      <Route path="/verification" element={
        <UnifiedLayout>
          <VerificationPage />
        </UnifiedLayout>
      } />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
