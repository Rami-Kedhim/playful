
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
  // Add missing routes
  NEURAL_MONITOR: '/neural/monitor',
  NEURAL_ANALYTICS: '/neural/analytics',
  ADMIN: '/admin',
  SEO: '/seo',
  SAFETY: '/safety',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COMPLIANCE: '/compliance',
  CONTACT: '/contact',
  AI_COMPANION: '/ai-companions'
};

export interface RouteConfig {
  path: string;
  label: string;
  icon?: string;
  requireAuth?: boolean;
  roles?: string[];
}

/**
 * Main navigation routes for the application
 */
export const mainRoutes: RouteConfig[] = [
  { path: AppPaths.HOME, label: 'Home' },
  { path: AppPaths.ESCORTS, label: 'Escorts' },
  { path: AppPaths.CREATORS, label: 'Creators' },
  { path: AppPaths.LIVECAMS, label: 'Livecams' },
  { path: AppPaths.VERIFICATION, label: 'Verification', requireAuth: true }
];

/**
 * User account routes
 */
export const accountRoutes: RouteConfig[] = [
  { path: AppPaths.USER_PROFILE, label: 'Profile', requireAuth: true },
  { path: AppPaths.WALLET, label: 'Wallet', requireAuth: true },
  { path: AppPaths.SETTINGS, label: 'Settings', requireAuth: true },
  { path: AppPaths.FAVORITES, label: 'Favorites', requireAuth: true },
  { path: AppPaths.BOOKINGS, label: 'Bookings', requireAuth: true }
];

/**
 * Dashboard routes for creators and providers
 */
export const dashboardRoutes: RouteConfig[] = [
  { path: AppPaths.DASHBOARD, label: 'Dashboard', requireAuth: true, roles: ['creator', 'escort', 'provider'] },
  { path: '/analytics', label: 'Analytics', requireAuth: true, roles: ['creator', 'escort', 'provider'] },
  { path: '/earnings', label: 'Earnings', requireAuth: true, roles: ['creator', 'escort', 'provider'] },
  { path: '/schedule', label: 'Schedule', requireAuth: true, roles: ['creator', 'escort', 'provider'] }
];
