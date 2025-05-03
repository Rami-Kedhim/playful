
// Add missing routes to the AppPaths object

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

export type RoutePaths = typeof AppPaths;

// Add these helper types and functions to make them available for import
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

export interface RouteDefinition {
  path: string;
  title: string;
  category: RouteCategory;
  isAuthRequired?: boolean;
  roles?: string[];
  description?: string;
}

// Export routes array for use in AppRoutes
export const routes = [
  {
    path: AppPaths.HOME,
    title: 'Home',
    category: 'core' as RouteCategory,
  },
  {
    path: AppPaths.ESCORTS,
    title: 'Escorts',
    category: 'escort' as RouteCategory,
  },
  {
    path: AppPaths.SAFETY,
    title: 'Safety',
    category: 'safety' as RouteCategory,
  },
  {
    path: AppPaths.AI_COMPANION,
    title: 'AI Companion',
    category: 'core' as RouteCategory,
  },
  {
    path: AppPaths.ROUTE_SHARE,
    title: 'Share Route',
    category: 'safety' as RouteCategory,
  },
  // Add more routes as needed
];

// Helper function to get routes by category
export const getRoutesByCategory = (category: RouteCategory): RouteDefinition[] => {
  return routes.filter(route => route.category === category);
};

export default AppPaths;
