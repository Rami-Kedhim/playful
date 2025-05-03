
import React, { lazy, Suspense } from 'react';
import { RouteDefinition } from './routeConfig';
import MainLayout from '@/layouts/MainLayout';
import LoadingSpinner from '@/components/ui/loading-spinner';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const SafetyPage = lazy(() => import('@/pages/SafetyPage'));
const AICompanionDemo = lazy(() => import('@/pages/ai-companion-demo'));
const RouteSharePage = lazy(() => import('@/pages/RouteSharePage'));
const SEOPage = lazy(() => import('@/pages/SEOPage'));
const NeuralMonitorPage = lazy(() => import('@/pages/neural/NeuralMonitorPage'));
const NeuralAnalyticsPage = lazy(() => import('@/pages/neural/NeuralAnalyticsPage'));
const BrainHubPage = lazy(() => import('@/pages/BrainHubPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const WalletPage = lazy(() => import('@/pages/UpdatedWallet'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const EscortsPage = lazy(() => import('@/pages/EscortsPage'));
const EscortDetailPage = lazy(() => import('@/pages/EscortDetailPage'));
const MessagesPage = lazy(() => import('@/pages/MessagesPage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));

// Define route configuration with elements
export const routes: RouteDefinition[] = [
  {
    path: '/',
    title: 'Main',
    category: 'core',
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: '',
        title: 'Home',
        category: 'core',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'safety',
        title: 'Safety',
        category: 'safety',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SafetyPage />
          </Suspense>
        ),
      },
      {
        path: 'ai-companion',
        title: 'AI Companion',
        category: 'core',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AICompanionDemo />
          </Suspense>
        ),
      },
      {
        path: 'share',
        title: 'Share Route',
        category: 'safety',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RouteSharePage />
          </Suspense>
        ),
      },
      {
        path: 'seo',
        title: 'SEO Tools',
        category: 'core',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SEOPage />
          </Suspense>
        ),
      },
      {
        path: 'neural/monitor',
        title: 'Neural Monitor',
        category: 'neural',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NeuralMonitorPage />
          </Suspense>
        ),
      },
      {
        path: 'neural/analytics',
        title: 'Neural Analytics',
        category: 'neural',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NeuralAnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: 'brain-hub',
        title: 'Brain Hub',
        category: 'neural',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BrainHubPage />
          </Suspense>
        ),
      },
      {
        path: 'wallet',
        title: 'Wallet',
        category: 'wallet',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <WalletPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        title: 'Profile',
        category: 'core',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      // New escort routes
      {
        path: 'escorts',
        title: 'Escorts',
        category: 'escort',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EscortsPage />
          </Suspense>
        ),
      },
      {
        path: 'escorts/:id',
        title: 'Escort Profile',
        category: 'escort',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EscortDetailPage />
          </Suspense>
        ),
      },
      // Messages page
      {
        path: 'messages',
        title: 'Messages',
        category: 'core',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MessagesPage />
          </Suspense>
        ),
      },
      // Favorites page
      {
        path: 'favorites',
        title: 'Favorites',
        category: 'core',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FavoritesPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        title: 'Not Found',
        category: 'core',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      }
    ],
  },
];

export default routes;
