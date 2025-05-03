
import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { AppPaths } from './routeConfig';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const SafetyPage = lazy(() => import('@/pages/SafetyPage'));
const AICompanionDemo = lazy(() => import('@/pages/ai-companion-demo'));
const RouteSharePage = lazy(() => import('@/pages/RouteSharePage'));

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
