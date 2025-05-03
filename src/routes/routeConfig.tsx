
import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoadingSpinner from '@/components/ui/loading-spinner';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const SafetyPage = lazy(() => import('@/pages/SafetyPage'));
const AICompanionDemo = lazy(() => import('@/pages/ai-companion-demo'));
const RouteSharePage = lazy(() => import('@/pages/RouteSharePage'));
const SEOPage = lazy(() => import('@/pages/SEOPage'));

// Define route configuration with elements
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
        path: 'safety',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SafetyPage />
          </Suspense>
        ),
      },
      {
        path: 'ai-companion',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AICompanionDemo />
          </Suspense>
        ),
      },
      {
        path: 'share',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RouteSharePage />
          </Suspense>
        ),
      },
      {
        path: 'seo',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SEOPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
