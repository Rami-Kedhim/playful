
import React from 'react';
import { RouteObject } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';

// Import all page components individually
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const EscortsPage = React.lazy(() => import('@/pages/EscortsPage'));
const AICompanionPage = React.lazy(() => import('@/pages/AICompanionPage'));
const NeuralAnalyticsPage = React.lazy(() => import('@/pages/NeuralAnalyticsPage'));
const NeuralMonitoringPage = React.lazy(() => import('@/pages/NeuralMonitoringPage'));
const BrainHubPage = React.lazy(() => import('@/pages/BrainHubPage'));
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage'));
const MessagesPage = React.lazy(() => import('@/pages/MessagesPage'));

// Define our unified routes
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <React.Suspense fallback={<div>Loading...</div>}><HomePage /></React.Suspense>
  },
  {
    path: '/escorts',
    element: <React.Suspense fallback={<div>Loading...</div>}><EscortsPage /></React.Suspense>
  },
  {
    path: '/ai-companions',
    element: <React.Suspense fallback={<div>Loading...</div>}><AICompanionPage /></React.Suspense>
  },
  {
    path: '/neural/analytics',
    element: <React.Suspense fallback={<div>Loading...</div>}><NeuralAnalyticsPage /></React.Suspense>
  },
  {
    path: '/neural/monitor',
    element: <React.Suspense fallback={<div>Loading...</div>}><NeuralMonitoringPage /></React.Suspense>
  },
  {
    path: '/brain-hub',
    element: <React.Suspense fallback={<div>Loading...</div>}><BrainHubPage /></React.Suspense>
  },
  {
    path: '/profile',
    element: <React.Suspense fallback={<div>Loading...</div>}><ProfilePage /></React.Suspense>
  },
  {
    path: '/messages',
    element: <React.Suspense fallback={<div>Loading...</div>}><MessagesPage /></React.Suspense>
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
