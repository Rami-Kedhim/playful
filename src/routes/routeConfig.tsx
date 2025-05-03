
import React from 'react';
import { RouteObject } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';

// Import page components using lazy loading for better performance
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const EscortsPage = React.lazy(() => import('@/pages/EscortsPage'));
const AICompanionPage = React.lazy(() => import('@/pages/AICompanionPage'));
const NeuralAnalyticsPage = React.lazy(() => import('@/pages/NeuralAnalyticsPage'));
const NeuralMonitoringPage = React.lazy(() => import('@/pages/NeuralMonitoringPage'));
const BrainHubPage = React.lazy(() => import('@/pages/BrainHubPage'));
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage'));
const MessagesPage = React.lazy(() => import('@/pages/MessagesPage'));
const SafetyPage = React.lazy(() => import('@/pages/SafetyPage'));
const RouteSharePage = React.lazy(() => import('@/pages/safety/RouteSharePage'));
const WalletPage = React.lazy(() => import('@/pages/WalletPage'));
const AdminPage = React.lazy(() => import('@/pages/AdminPage'));
const ModerationPage = React.lazy(() => import('@/pages/ModerationPage'));

/**
 * Core route definitions
 */
export interface RouteDefinition {
  path: string;
  title: string;
  description?: string;
  icon?: string;
  category: RouteCategory;
  isAuthRequired?: boolean;
  isVerifiedOnly?: boolean;
  isBeta?: boolean;
  childRoutes?: RouteDefinition[];
  roles?: string[];
  component?: string; // String reference to component for lazy loading
}

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

// Master registry of all application routes
export const routeRegistry: Record<string, RouteDefinition> = {
  // Core pages
  home: {
    path: '/',
    title: 'Home',
    category: 'core',
    description: 'UberEscorts home page'
  },
  
  // Escort routes
  escorts: {
    path: '/escorts',
    title: 'Escorts',
    category: 'escort',
    description: 'Browse escorts in your area'
  },
  escortDetail: {
    path: '/escorts/:id',
    title: 'Escort Profile',
    category: 'escort',
    description: 'View escort details'
  },
  
  // Client routes
  clientProfile: {
    path: '/profile',
    title: 'My Profile',
    category: 'client',
    isAuthRequired: true,
    description: 'Manage your client profile'
  },
  favorites: {
    path: '/favorites',
    title: 'Favorites',
    category: 'client',
    isAuthRequired: true,
    description: 'View your favorite escorts'
  },
  
  // Creator routes
  creator: {
    path: '/creator',
    title: 'Creator Dashboard',
    category: 'creator',
    isAuthRequired: true,
    description: 'Manage your creator profile'
  },
  creatorContent: {
    path: '/creator/content',
    title: 'My Content',
    category: 'creator',
    isAuthRequired: true,
    description: 'Manage your creator content'
  },
  
  // Messaging routes
  messages: {
    path: '/messages',
    title: 'Messages',
    category: 'core',
    isAuthRequired: true,
    description: 'Your messages'
  },
  
  // Wallet routes
  wallet: {
    path: '/wallet',
    title: 'Wallet',
    category: 'wallet',
    isAuthRequired: true,
    description: 'Manage your UBX wallet'
  },
  
  // UberCore system routes
  neural: {
    path: '/neural',
    title: 'Neural Hub',
    category: 'neural',
    description: 'Neural monitoring and analytics'
  },
  neuralAnalytics: {
    path: '/neural/analytics',
    title: 'Neural Analytics',
    category: 'neural',
    description: 'Advanced neural analytics platform'
  },
  neuralMonitor: {
    path: '/neural/monitor',
    title: 'Neural Monitor',
    category: 'neural',
    description: 'Neural monitoring system'
  },
  brainHub: {
    path: '/brain-hub',
    title: 'Brain Hub',
    category: 'neural',
    description: 'Cognitive patterns and data visualization'
  },
  
  // AI Companion routes
  aiCompanion: {
    path: '/ai-companions',
    title: 'AI Companions',
    category: 'core',
    description: 'Explore AI companions'
  },
  
  // Administration routes
  admin: {
    path: '/admin',
    title: 'Admin',
    category: 'admin',
    isAuthRequired: true,
    roles: ['admin'],
    description: 'Admin dashboard'
  },
  moderation: {
    path: '/moderation',
    title: 'Moderation',
    category: 'admin',
    isAuthRequired: true,
    roles: ['admin', 'moderator'],
    description: 'Content moderation'
  },
  
  // Safety routes
  safety: {
    path: '/safety',
    title: 'Safety Center',
    category: 'safety',
    description: 'Safety tools and resources'
  },
  safetyRouteShare: {
    path: '/safety/route-share',
    title: 'Route Sharing',
    category: 'safety',
    isAuthRequired: true,
    description: 'Share your route for safety'
  },
  
  // Metaverse routes
  metaverse: {
    path: '/metaverse',
    title: 'Metaverse',
    category: 'metaverse',
    description: 'Enter the UberEscorts metaverse'
  },
  
  // Auth routes
  login: {
    path: '/auth/login',
    title: 'Login',
    category: 'auth',
    description: 'Login to your account'
  },
  register: {
    path: '/auth/register',
    title: 'Register',
    category: 'auth',
    description: 'Create a new account'
  },
  
  // Not found
  notFound: {
    path: '*',
    title: 'Not Found',
    category: 'core',
    description: '404 - Page not found'
  }
};

// Build unified routes from registry
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
    path: '/safety',
    element: <React.Suspense fallback={<div>Loading...</div>}><SafetyPage /></React.Suspense>
  },
  {
    path: '/safety/route-share',
    element: <React.Suspense fallback={<div>Loading...</div>}><RouteSharePage /></React.Suspense>
  },
  {
    path: '/wallet',
    element: <React.Suspense fallback={<div>Loading...</div>}><WalletPage /></React.Suspense>
  },
  {
    path: '/admin',
    element: <React.Suspense fallback={<div>Loading...</div>}><AdminPage /></React.Suspense>
  },
  {
    path: '/moderation',
    element: <React.Suspense fallback={<div>Loading...</div>}><ModerationPage /></React.Suspense>
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
  MESSAGES: '/messages',
  SAFETY: '/safety',
  ROUTE_SHARE: '/safety/route-share',
  WALLET: '/wallet',
  ADMIN: '/admin',
  MODERATION: '/moderation'
};

// Helper functions from route registry
export function getRouteByPath(path: string): RouteDefinition | undefined {
  return Object.values(routeRegistry).find(route => route.path === path);
}

export function getRoutesByCategory(category: RouteCategory): RouteDefinition[] {
  return Object.values(routeRegistry).filter(route => route.category === category);
}

export function isValidPath(path: string): boolean {
  const exactMatch = Object.values(routeRegistry).some(route => route.path === path);
  
  if (exactMatch) return true;
  
  // Check for dynamic routes with parameters
  return Object.values(routeRegistry).some(route => {
    if (!route.path.includes(':')) return false;
    
    const routeParts = route.path.split('/');
    const pathParts = path.split('/');
    
    if (routeParts.length !== pathParts.length) return false;
    
    return routeParts.every((part, index) => {
      if (part.startsWith(':')) return true;
      return part === pathParts[index];
    });
  });
}
