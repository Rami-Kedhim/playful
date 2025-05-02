
import React from 'react';
import { RouteObject } from 'react-router-dom';
import NeuralAnalyticsPage from './pages/NeuralAnalyticsPage';
import NeuralMonitoringPage from './pages/NeuralMonitoringPage';
import BrainHubPage from './pages/BrainHubPage';

// Define our routes
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <NeuralAnalyticsPage />
  },
  {
    path: '/neural-analytics',
    element: <NeuralAnalyticsPage />
  },
  {
    path: '/neural-monitoring',
    element: <NeuralMonitoringPage />
  },
  {
    path: '/brain-hub',
    element: <BrainHubPage />
  }
];
