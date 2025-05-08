import React, { lazy, Suspense } from 'react';
import { RouteDefinition } from './routeConfig';
import Layout from '@/layouts/Layout';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Outlet } from 'react-router-dom';
import AuthGuard from '@/components/auth/AuthGuard';

// Lazy load pages
const HomePage = /*#__PURE__*/ lazy(() => import('@/pages/HomePage'));
const SafetyPage = /*#__PURE__*/ lazy(() => import('@/pages/SafetyPage'));
const AICompanionDemo = /*#__PURE__*/ lazy(() => import('@/pages/ai-companion-demo'));
const RouteSharePage = /*#__PURE__*/ lazy(() => import('@/pages/RouteSharePage'));
const SEOPage = /*#__PURE__*/ lazy(() => import('@/pages/SEOPage'));
const NeuralMonitorPage = /*#__PURE__*/ lazy(() => import('@/pages/neural/NeuralMonitorPage'));
const NeuralAnalyticsPage = /*#__PURE__*/ lazy(() => import('@/pages/neural/NeuralAnalyticsPage'));
const BrainHubPage = /*#__PURE__*/ lazy(() => import('@/pages/BrainHubPage'));
const NotFoundPage = /*#__PURE__*/ lazy(() => import('@/pages/NotFoundPage'));
const WalletPage = /*#__PURE__*/ lazy(() => import('@/pages/UpdatedWallet'));
const ProfilePage = /*#__PURE__*/ lazy(() => import('@/pages/ProfilePage'));
const EscortsPage = /*#__PURE__*/ lazy(() => import('@/pages/EscortsPage'));
const EscortDetailPage = /*#__PURE__*/ lazy(() => import('@/pages/EscortDetailPage'));
const MessagesPage = /*#__PURE__*/ lazy(() => import('@/pages/Messages'));
const FavoritesPage = /*#__PURE__*/ lazy(() => import('@/pages/FavoritesPage'));
const AuthPage = /*#__PURE__*/ lazy(() => import('@/pages/AuthPage'));

// Define app paths as constants for reuse
export const AppPaths = {
  HOME: '/',
  ESCORTS: '/escorts',
  ESCORT_DETAIL: '/escorts/:id',
  CREATORS: '/creators',
  CREATOR_DETAIL: '/creators/:id',
  LIVECAMS: '/livecams',
  LIVECAM_DETAIL: '/livecams/:id',
  VERIFICATION: '/verification',
  SETTINGS: '/settings',
  AUTH: '/auth',
  PROFILE: '/profile',
  MESSAGES: '/messages',
  FAVORITES: '/favorites',
  WALLET: '/wallet',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  SAFETY: '/safety',
  PAYMENT: '/payment',
  SEO: '/seo',
  NEURAL_MONITOR: '/neural/monitor',
  NEURAL_ANALYTICS: '/neural/analytics',
  HELP: '/help',
  TERMS: '/legal/terms',
  PRIVACY: '/legal/privacy',
  CONTACT: '/contact',
  PRICING: '/pricing',
  APP_DOWNLOAD: '/app',
  PULSE_BOOST: '/pulse-boost',
  GUIDELINES: '/safety/guidelines' // Added this property
};

// Define route category definitions
export enum RouteCategory {
  CORE = 'core',
  AUTH = 'auth',
  SAFETY = 'safety',
  AI = 'ai',
  NEURAL = 'neural',
  WALLET = 'wallet',
  ESCORT = 'escort',
  MESSAGE = 'message',
  FAVORITES = 'favorites',
  NOT_FOUND = 'not-found'
}

// Define the routes with their elements
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
