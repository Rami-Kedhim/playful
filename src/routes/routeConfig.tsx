
import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoadingSpinner from '@/components/ui/loading-spinner';

// App paths
export const AppPaths = {
  HOME: '/',
  ESCORTS: '/escorts',
  NEURAL_MONITOR: '/neural/monitor',
  NEURAL_ANALYTICS: '/neural/analytics',
  BRAIN_HUB: '/brain-hub',
  MESSAGES: '/messages',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  WALLET: '/wallet',
  SETTINGS: '/settings',
  ADMIN: '/admin',
  MODERATION: '/moderation',
  SAFETY: '/safety',
  AI_COMPANION: '/ai-companion',
  PERSONAS: '/personas',
  PULSE_BOOST: '/pulse/boost',
  SEARCH: '/search',
  ROUTE_SHARE: '/share'
};

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const SafetyPage = lazy(() => import('@/pages/SafetyPage'));
const AICompanionDemo = lazy(() => import('@/pages/ai-companion-demo'));
const RouteSharePage = lazy(() => import('@/pages/RouteSharePage'));

// Route categories for navigation grouping
export interface RouteCategory {
  name: string;
  routes: string[];
}

// Define route configuration
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: AppPaths.SAFETY,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SafetyPage />
          </Suspense>
        ),
      },
      {
        path: AppPaths.AI_COMPANION,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AICompanionDemo />
          </Suspense>
        ),
      },
      {
        path: AppPaths.ROUTE_SHARE,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RouteSharePage />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
