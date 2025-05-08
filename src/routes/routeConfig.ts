
// Define application paths and route categories

export const AppPaths = {
  // Core paths
  HOME: '/',
  SEARCH: '/search',
  MESSAGES: '/messages',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  DASHBOARD: '/dashboard',
  
  // Escort paths
  ESCORTS: '/escorts',
  ESCORT_DETAIL: '/escorts/:id',
  
  // Creator paths
  CREATORS: '/creators',
  CREATOR_DETAIL: '/creators/:id',
  
  // Livecam paths
  LIVECAMS: '/livecams',
  LIVECAM_DETAIL: '/livecams/:id',
  
  // Neural & AI paths
  NEURAL_MONITOR: '/neural/monitor',
  NEURAL_ANALYTICS: '/neural/analytics',
  BRAIN_HUB: '/brain-hub',
  AI_COMPANION: '/ai-companion',
  AI_COMPANION_DETAIL: '/ai-companion/:id',
  
  // Safety paths
  SAFETY: '/safety',
  ROUTE_SHARE: '/share',
  
  // Wallet & Payments
  WALLET: '/wallet',
  PULSE_BOOST: '/pulse/boost',
  
  // SEO & Tools
  SEO: '/seo',
  
  // Auth paths
  AUTH: '/auth',
  
  // Admin paths
  ADMIN: '/admin',
  MODERATION: '/moderation',
  
  // Legal & Info paths
  TERMS: '/terms',
  PRIVACY: '/privacy',
  GUIDELINES: '/guidelines',
  COMPLIANCE: '/compliance',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  
  // Metaverse paths
  METAVERSE: '/metaverse',
};

export type RouteCategory = 
  'core' | 
  'escort' | 
  'client' | 
  'creator' | 
  'livecam' |
  'metaverse' | 
  'neural' | 
  'admin' | 
  'auth' | 
  'safety' | 
  'wallet' | 
  'settings' |
  'legal';

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
  // Core routes
  {
    path: AppPaths.HOME,
    title: 'Home',
    category: 'core',
  },
  {
    path: AppPaths.DASHBOARD,
    title: 'Dashboard',
    category: 'core',
    isAuthRequired: true,
  },
  {
    path: AppPaths.MESSAGES,
    title: 'Messages',
    category: 'core',
    isAuthRequired: true,
  },
  {
    path: AppPaths.FAVORITES,
    title: 'Favorites',
    category: 'core',
    isAuthRequired: true,
  },
  {
    path: AppPaths.PROFILE,
    title: 'Profile',
    category: 'core',
    isAuthRequired: true,
  },
  {
    path: AppPaths.SETTINGS,
    title: 'Settings',
    category: 'settings',
    isAuthRequired: true,
  },
  {
    path: AppPaths.SEARCH,
    title: 'Search',
    category: 'core',
  },
  
  // Escort routes
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
  
  // Creator routes
  {
    path: AppPaths.CREATORS,
    title: 'Creators',
    category: 'creator',
  },
  {
    path: AppPaths.CREATOR_DETAIL,
    title: 'Creator Profile',
    category: 'creator',
  },
  
  // Livecam routes
  {
    path: AppPaths.LIVECAMS,
    title: 'Livecams',
    category: 'livecam',
  },
  {
    path: AppPaths.LIVECAM_DETAIL,
    title: 'Livecam Stream',
    category: 'livecam',
  },
  
  // Neural & AI routes
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
  {
    path: AppPaths.AI_COMPANION,
    title: 'AI Companion',
    category: 'core',
  },
  {
    path: AppPaths.AI_COMPANION_DETAIL,
    title: 'AI Companion Chat',
    category: 'core',
  },
  
  // Safety routes
  {
    path: AppPaths.SAFETY,
    title: 'Safety',
    category: 'safety',
  },
  {
    path: AppPaths.ROUTE_SHARE,
    title: 'Share Route',
    category: 'safety',
  },
  
  // Wallet & Payments
  {
    path: AppPaths.WALLET,
    title: 'Wallet',
    category: 'wallet',
    isAuthRequired: true,
  },
  {
    path: AppPaths.PULSE_BOOST,
    title: 'Pulse Boost',
    category: 'wallet',
    isAuthRequired: true,
  },
  
  // SEO & Tools
  {
    path: AppPaths.SEO,
    title: 'SEO Tools',
    category: 'core',
  },
  
  // Auth routes
  {
    path: AppPaths.AUTH,
    title: 'Authentication',
    category: 'auth',
  },
  
  // Admin routes
  {
    path: AppPaths.ADMIN,
    title: 'Admin Panel',
    category: 'admin',
    isAuthRequired: true,
    roles: ['admin'],
  },
  {
    path: AppPaths.MODERATION,
    title: 'Content Moderation',
    category: 'admin',
    isAuthRequired: true,
    roles: ['admin', 'moderator'],
  },
  
  // Legal & Info routes
  {
    path: AppPaths.TERMS,
    title: 'Terms of Service',
    category: 'legal',
  },
  {
    path: AppPaths.PRIVACY,
    title: 'Privacy Policy',
    category: 'legal',
  },
  {
    path: AppPaths.GUIDELINES,
    title: 'Community Guidelines',
    category: 'legal',
  },
  {
    path: AppPaths.COMPLIANCE,
    title: 'Compliance Center',
    category: 'legal',
  },
  {
    path: AppPaths.ABOUT,
    title: 'About Us',
    category: 'legal',
  },
  {
    path: AppPaths.CONTACT,
    title: 'Contact Us',
    category: 'legal',
  },
  {
    path: AppPaths.FAQ,
    title: 'FAQ',
    category: 'legal',
  },
  
  // Metaverse routes
  {
    path: AppPaths.METAVERSE,
    title: 'Metaverse',
    category: 'metaverse',
  },
];

// Helper function to get routes by category
export const getRoutesByCategory = (category: RouteCategory): RouteDefinition[] => {
  return routes.filter(route => route.category === category);
};

export default AppPaths;
