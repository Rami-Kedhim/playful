
// Define application paths and route categories

export const AppPaths = {
  HOME: '/',
  ESCORTS: '/escorts',
  ESCORT_DETAIL: '/escorts/:id',
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
  ROUTE_SHARE: '/share',
  SEO: '/seo'
};

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
  children?: RouteDefinition[];
  index?: boolean;
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
    path: AppPaths.ESCORT_DETAIL,
    title: 'Escort Profile',
    category: 'escort',
  },
  {
    path: AppPaths.MESSAGES,
    title: 'Messages',
    category: 'core',
  },
  {
    path: AppPaths.FAVORITES,
    title: 'Favorites',
    category: 'core',
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
  {
    path: AppPaths.SEO,
    title: 'SEO Tools',
    category: 'core',
  },
  // Neural routes
  {
    path: AppPaths.NEURAL_MONITOR,
    title: 'Neural Monitor',
    category: 'neural',
  },
  {
    path: AppPaths.NEURAL_ANALYTICS,
    title: 'Neural Analytics',
    category: 'neural',
  },
  {
    path: AppPaths.BRAIN_HUB,
    title: 'Brain Hub',
    category: 'neural',
  },
  // Add more routes as needed
];

// Helper function to get routes by category
export const getRoutesByCategory = (category: RouteCategory): RouteDefinition[] => {
  return routes.filter(route => route.category === category);
};

export default AppPaths;
