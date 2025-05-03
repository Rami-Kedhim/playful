
/**
 * UberEscorts Route Registry
 * 
 * Centralized route management for UberEscorts ecosystem
 * This helps prevent duplicate routes and broken links
 */

// Core route definitions
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

// Helper function to get route by path
export function getRouteByPath(path: string): RouteDefinition | undefined {
  return Object.values(routeRegistry).find(route => route.path === path);
}

// Helper function to get all routes in a category
export function getRoutesByCategory(category: RouteCategory): RouteDefinition[] {
  return Object.values(routeRegistry).filter(route => route.category === category);
}

// Helper function to validate that a path exists
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

// Export a flattened routes array for use with react-router
export const routes = Object.values(routeRegistry);
