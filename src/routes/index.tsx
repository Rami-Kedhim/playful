
import React from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AICompanionPage from '@/pages/AICompanionPage';
import NeuralAnalyticsPage from '@/pages/NeuralAnalyticsPage';
import NeuralMonitoringPage from '@/pages/NeuralMonitoringPage';
import BrainHubPage from '@/pages/BrainHubPage';
import EscortsPage from '@/pages/EscortsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';
import MessagesPage from '@/pages/MessagesPage';

// Define our unified routes
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/escorts',
    element: <EscortsPage />
  },
  {
    path: '/ai-companions',
    element: <AICompanionPage />
  },
  {
    path: '/neural/analytics',
    element: <NeuralAnalyticsPage />
  },
  {
    path: '/neural/monitor',
    element: <NeuralMonitoringPage />
  },
  {
    path: '/brain-hub',
    element: <BrainHubPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/messages',
    element: <MessagesPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

// Export constants for route paths to avoid hardcoding
export const AppPaths = {
  HOME: '/',
  ESCORTS: '/escorts',
  AI_COMPANION: '/ai-companions',
  NEURAL_ANALYTICS: '/neural/analytics',
  NEURAL_MONITOR: '/neural/monitor',
  BRAIN_HUB: '/brain-hub',
  PROFILE: '/profile',
  MESSAGES: '/messages'
};
