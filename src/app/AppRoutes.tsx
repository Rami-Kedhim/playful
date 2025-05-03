
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AICompanionPage from '@/pages/AICompanionPage';
import NeuralAnalyticsPage from '@/pages/NeuralAnalyticsPage';
import NeuralMonitoringPage from '@/pages/NeuralMonitoringPage';
import BrainHubPage from '@/pages/BrainHubPage';
import EscortsPage from '@/pages/EscortsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ai-companions" element={<AICompanionPage />} />
      <Route path="/neural/analytics" element={<NeuralAnalyticsPage />} />
      <Route path="/neural/monitor" element={<NeuralMonitoringPage />} />
      <Route path="/brain-hub" element={<BrainHubPage />} />
      <Route path="/escorts" element={<EscortsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
