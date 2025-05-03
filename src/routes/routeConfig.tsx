import React from 'react';
import { Navigate } from 'react-router-dom';

export type RouteCategory = 
  'core' | 
  'escort' | 
  'client' | 
  'creator' | 
  'metaverse' | 
  'neural' | 
  'admin' | 
  'auth' | 
  'safety' | 
  'wallet' | 
  'settings';

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
  AI_COMPANION: '/ai-companions',
  ROUTE_SHARE: '/safety/route-share'
};

// Dynamically import components to prevent circular dependencies
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const EscortsPage = React.lazy(() => import('@/pages/EscortsPage'));
const NeuralMonitoringPage = React.lazy(() => import('@/pages/NeuralMonitoringPage'));
const NeuralAnalyticsPage = React.lazy(() => import('@/pages/NeuralAnalyticsPage'));
const BrainHubPage = React.lazy(() => import('@/pages/BrainHubPage'));
const Messages = React.lazy(() => import('@/pages/Messages'));
const FavoritesPage = React.lazy(() => import('@/pages/FavoritesPage'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const WalletPage = React.lazy(() => import('@/pages/Profile'));
const AdminConfig = React.lazy(() => import('@/pages/AdminConfig'));
const ModerationPage = React.lazy(() => import('@/pages/ModerationPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const AICompanionPage = React.lazy(() => import('@/pages/AICompanionPage'));
const SafetyPage = React.lazy(() => import('@/pages/SafetyPage'));
const RouteSharePage = React.lazy(() => import('@/pages/RouteSharePage'));

// Routes configuration with React components
export const routes = [
  {
    path: AppPaths.HOME,
    element: <React.Suspense fallback={<div>Loading...</div>}><HomePage /></React.Suspense>,
    title: 'Home',
    category: 'core' as RouteCategory
  },
  {
    path: AppPaths.ESCORTS,
    element: <React.Suspense fallback={<div>Loading...</div>}><EscortsPage /></React.Suspense>,
    title: 'Escorts',
    category: 'escort' as RouteCategory
  },
  {
    path: AppPaths.NEURAL_MONITOR,
    element: <React.Suspense fallback={<div>Loading...</div>}><NeuralMonitoringPage /></React.Suspense>,
    title: 'Neural Monitor',
    category: 'neural' as RouteCategory
  },
  {
    path: AppPaths.NEURAL_ANALYTICS,
    element: <React.Suspense fallback={<div>Loading...</div>}><NeuralAnalyticsPage /></React.Suspense>,
    title: 'Neural Analytics',
    category: 'neural' as RouteCategory
  },
  {
    path: AppPaths.BRAIN_HUB,
    element: <React.Suspense fallback={<div>Loading...</div>}><BrainHubPage /></React.Suspense>,
    title: 'Brain Hub',
    category: 'neural' as RouteCategory
  },
  {
    path: AppPaths.MESSAGES,
    element: <React.Suspense fallback={<div>Loading...</div>}><Messages /></React.Suspense>,
    title: 'Messages',
    category: 'core' as RouteCategory,
    isAuthRequired: true
  },
  {
    path: AppPaths.FAVORITES,
    element: <React.Suspense fallback={<div>Loading...</div>}><FavoritesPage /></React.Suspense>,
    title: 'Favorites',
    category: 'client' as RouteCategory,
    isAuthRequired: true
  },
  {
    path: AppPaths.PROFILE,
    element: <React.Suspense fallback={<div>Loading...</div>}><Profile /></React.Suspense>,
    title: 'Profile',
    category: 'client' as RouteCategory,
    isAuthRequired: true
  },
  {
    path: AppPaths.WALLET,
    element: <React.Suspense fallback={<div>Loading...</div>}><WalletPage /></React.Suspense>,
    title: 'Wallet',
    category: 'wallet' as RouteCategory,
    isAuthRequired: true
  },
  {
    path: AppPaths.ADMIN,
    element: <React.Suspense fallback={<div>Loading...</div>}><AdminConfig /></React.Suspense>,
    title: 'Admin',
    category: 'admin' as RouteCategory,
    roles: ['admin']
  },
  {
    path: AppPaths.MODERATION,
    element: <React.Suspense fallback={<div>Loading...</div>}><ModerationPage /></React.Suspense>,
    title: 'Moderation',
    category: 'admin' as RouteCategory,
    roles: ['admin', 'moderator']
  },
  {
    path: AppPaths.AI_COMPANION,
    element: <React.Suspense fallback={<div>Loading...</div>}><AICompanionPage /></React.Suspense>,
    title: 'AI Companions',
    category: 'core' as RouteCategory
  },
  {
    path: AppPaths.SAFETY,
    element: <React.Suspense fallback={<div>Loading...</div>}><SafetyPage /></React.Suspense>,
    title: 'Safety',
    category: 'safety' as RouteCategory
  },
  {
    path: AppPaths.ROUTE_SHARE,
    element: <React.Suspense fallback={<div>Loading...</div>}><RouteSharePage /></React.Suspense>,
    title: 'Route Share',
    category: 'safety' as RouteCategory
  },
  {
    path: '*',
    element: <React.Suspense fallback={<div>Loading...</div>}><NotFoundPage /></React.Suspense>,
    title: 'Not Found',
    category: 'core' as RouteCategory
  }
];

// Helper functions to get routes by category
export const getRoutesByCategory = (category: RouteCategory) => {
  return routes.filter(route => route.category === category);
};

// Helper to create a route index file
export const createRouteIndex = () => {
  return routes;
};

export default routes;
