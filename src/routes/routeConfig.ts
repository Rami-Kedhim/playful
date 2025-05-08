
/**
 * Application route configuration
 * All routes should be defined here for consistency
 */
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
  PROFILE: '/profile/:id',
  USER_PROFILE: '/profile',
  WALLET: '/wallet',
  METAVERSE: '/metaverse',
  FAVORITES: '/favorites',
  MESSAGES: '/messages',
  BOOKINGS: '/bookings',
  DASHBOARD: '/dashboard',
  // Add all missing routes
  NEURAL_MONITOR: '/neural/monitor',
  NEURAL_ANALYTICS: '/neural/analytics',
  BRAIN_HUB: '/brain-hub',
  ADMIN: '/admin',
  SEO: '/seo',
  SAFETY: '/safety',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COMPLIANCE: '/compliance',
  CONTACT: '/contact',
  AI_COMPANION: '/ai-companions',
  PULSE_BOOST: '/pulse-boost'
};

export interface RouteConfig {
  path: string;
  label: string;
  title: string;
  icon?: string;
  requireAuth?: boolean;
  roles?: string[];
  isAuthRequired?: boolean;
}

/**
 * Main navigation routes for the application
 */
export const mainRoutes: RouteConfig[] = [
  { path: AppPaths.HOME, label: 'Home', title: 'Home' },
  { path: AppPaths.ESCORTS, label: 'Escorts', title: 'Escorts' },
  { path: AppPaths.CREATORS, label: 'Creators', title: 'Creators' },
  { path: AppPaths.LIVECAMS, label: 'Livecams', title: 'Livecams' },
  { path: AppPaths.VERIFICATION, label: 'Verification', title: 'Verification', requireAuth: true, isAuthRequired: true }
];

/**
 * User account routes
 */
export const accountRoutes: RouteConfig[] = [
  { path: AppPaths.USER_PROFILE, label: 'Profile', title: 'Profile', requireAuth: true, isAuthRequired: true },
  { path: AppPaths.WALLET, label: 'Wallet', title: 'Wallet', requireAuth: true, isAuthRequired: true },
  { path: AppPaths.SETTINGS, label: 'Settings', title: 'Settings', requireAuth: true, isAuthRequired: true },
  { path: AppPaths.FAVORITES, label: 'Favorites', title: 'Favorites', requireAuth: true, isAuthRequired: true },
  { path: AppPaths.BOOKINGS, label: 'Bookings', title: 'Bookings', requireAuth: true, isAuthRequired: true }
];

/**
 * Dashboard routes for creators and providers
 */
export const dashboardRoutes: RouteConfig[] = [
  { path: AppPaths.DASHBOARD, label: 'Dashboard', title: 'Dashboard', requireAuth: true, isAuthRequired: true, roles: ['creator', 'escort', 'provider'] },
  { path: '/analytics', label: 'Analytics', title: 'Analytics', requireAuth: true, isAuthRequired: true, roles: ['creator', 'escort', 'provider'] },
  { path: '/earnings', label: 'Earnings', title: 'Earnings', requireAuth: true, isAuthRequired: true, roles: ['creator', 'escort', 'provider'] },
  { path: '/schedule', label: 'Schedule', title: 'Schedule', requireAuth: true, isAuthRequired: true, roles: ['creator', 'escort', 'provider'] }
];

// Add these exports to match what's being imported in AppNavigation.tsx
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

export type RouteDefinition = RouteConfig;

export function getRoutesByCategory(category: RouteCategory): RouteConfig[] {
  // Simple implementation that returns routes based on category
  switch (category) {
    case 'core':
      return mainRoutes;
    case 'wallet':
      return accountRoutes.filter(route => route.path.includes('wallet'));
    case 'escort':
      return mainRoutes.filter(route => route.path.includes('escort'));
    case 'neural':
      return [
        { path: AppPaths.NEURAL_MONITOR, label: 'Neural Monitor', title: 'Neural Monitor' },
        { path: AppPaths.NEURAL_ANALYTICS, label: 'Neural Analytics', title: 'Neural Analytics' },
        { path: AppPaths.BRAIN_HUB, label: 'Brain Hub', title: 'Brain Hub' }
      ];
    case 'safety':
      return [
        { path: AppPaths.SAFETY, label: 'Safety Center', title: 'Safety Center' }
      ];
    case 'admin':
      return [
        { path: AppPaths.ADMIN, label: 'Admin Dashboard', title: 'Admin Dashboard', requireAuth: true, isAuthRequired: true, roles: ['admin'] }
      ];
    default:
      return [];
  }
}
