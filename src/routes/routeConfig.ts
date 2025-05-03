
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

// Define our route categories
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
  element?: React.ReactNode;
  isAuthRequired?: boolean;
  roles?: string[];
  description?: string;
}

// Define routes without elements (for navigation purposes)
export const routes: RouteDefinition[] = [
  {
    path: AppPaths.HOME,
    title: 'Home',
    category: 'core',
  },
  {
    path: AppPaths.ESCORTS,
    title: 'Escorts',
    category: 'escort',
  },
  {
    path: AppPaths.SAFETY,
    title: 'Safety',
    category: 'safety',
  },
  {
    path: AppPaths.AI_COMPANION,
    title: 'AI Companion',
    category: 'core',
  },
  {
    path: AppPaths.ROUTE_SHARE,
    title: 'Share Route',
    category: 'safety',
  },
  // Add more routes as needed
];

// Helper function to get routes by category
export const getRoutesByCategory = (category: RouteCategory): RouteDefinition[] => {
  return routes.filter(route => route.category === category);
};

export default AppPaths;
