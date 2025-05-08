
export const AppPaths = {
  HOME: '/',
  ESCORT_SEARCH: '/escorts',
  ESCORT_DETAIL: '/escort/:id',
  CREATORS: '/creators',
  CREATOR_DETAIL: '/creator/:id',
  AI_COMPANION: '/ai-companions',
  AI_COMPANION_DETAIL: '/ai-companion/:id',
  MESSAGES: '/messages',
  WALLET: '/wallet',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  VERIFICATION: '/verification',
  PULSE_BOOST: '/pulse-boost',
  LUCIE: '/lucie',
  OXUM: '/oxum',
  HERMES: '/hermes',
  LOGIN: '/login',
  REGISTER: '/register',
  BRAIN_HUB: '/brain-hub',
  NEURAL_ANALYTICS: '/neural-analytics',
  METAVERSE: '/metaverse',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  SAFETY: '/safety',
  CONTACT: '/contact',
  LIVECAMS: '/livecams',
  LIVECAM_DETAIL: '/livecam/:id',
  ADMIN: '/admin',
  AUTH: '/auth',
  NEURAL_MONITOR: '/neural/monitor',
  SEO: '/seo',
  DASHBOARD: '/dashboard',
  GUIDELINES: '/guidelines',
  FAVORITES: '/favorites',
}

// Export AppPaths as APP_PATHS as well for backward compatibility
export const APP_PATHS = AppPaths;

// Define route configuration types
export interface RouteConfig {
  path: string;
  label: string;
  title: string;
  icon?: React.ComponentType;
  requireAuth?: boolean;
  roles?: string[];
  category: string;
}

export type AppPaths = typeof AppPaths;
