
import React, { lazy, Suspense } from 'react';
import { RouteDefinition } from './routeConfig';
import Layout from '@/layouts/Layout';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Outlet } from 'react-router-dom';
import AuthGuard from '@/components/auth/AuthGuard';

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
const MessagesPage = lazy(() => import('@/pages/Messages'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));

// Define route configuration with elements
export const routes: RouteDefinition[] = [
  {
    path: '/',
    title: 'Main',
    category: 'core',
    element: <Layout>
      <Outlet />
    </Layout>,
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
        path: 'auth',
        title: 'Authentication',
        category: 'auth',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthPage />
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
        isAuthRequired: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthGuard>
              <WalletPage />
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: 'profile',
        title: 'Profile',
        category: 'core',
        isAuthRequired: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          </Suspense>
        ),
      },
      // Escort routes
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
        isAuthRequired: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthGuard>
              <MessagesPage />
            </AuthGuard>
          </Suspense>
        ),
      },
      // Favorites page
      {
        path: 'favorites',
        title: 'Favorites',
        category: 'core',
        isAuthRequired: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthGuard>
              <FavoritesPage />
            </AuthGuard>
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
