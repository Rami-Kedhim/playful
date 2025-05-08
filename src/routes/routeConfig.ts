
export enum AppPaths {
  HOME = '/',
  AUTH = '/auth',
  DASHBOARD = '/dashboard',
  PROFILE = '/profile',
  MESSAGES = '/messages',
  WALLET = '/wallet',
  FAVORITES = '/favorites',
  ESCORTS = '/escorts',
  ESCORT_DETAIL = '/escorts/:id',
  CREATORS = '/creators',
  CREATOR_DETAIL = '/creators/:id',
  LIVECAMS = '/livecams',
  LIVECAM_DETAIL = '/livecams/:id',
  SETTINGS = '/settings',
  ADMIN = '/admin',
  SEO = '/seo-dashboard',
  SAFETY = '/safety',
  NEURAL_MONITOR = '/neural-monitor',
  NEURAL_ANALYTICS = '/neural-analytics',
  MEDIA_GENERATION = '/media-generation',
  NSFW_GENERATOR = '/nsfw-generator',
  LUCIE = '/lucie',
  BOOKING = '/book',
  VERIFICATION = '/verification',
  // Add missing routes that are referenced in components
  PRIVACY = '/privacy',
  TERMS = '/terms',
  COMPLIANCE = '/compliance',
  GUIDELINES = '/guidelines',
  CONTACT = '/contact',
  AI_COMPANION = '/ai-companion',
  BRAIN_HUB = '/brain-hub',
  PULSE_BOOST = '/pulse-boost',
  METAVERSE = '/metaverse'
}

// Add these helper functions for AppNavigation
export enum RouteCategory {
  MAIN = 'main',
  SECONDARY = 'secondary',
  USER = 'user',
  ADMIN = 'admin'
}

export const getRoutesByCategory = (category: RouteCategory): {path: AppPaths, label: string}[] => {
  switch(category) {
    case RouteCategory.MAIN:
      return [
        {path: AppPaths.HOME, label: 'Home'},
        {path: AppPaths.ESCORTS, label: 'Escorts'},
        {path: AppPaths.CREATORS, label: 'Creators'},
        {path: AppPaths.LIVECAMS, label: 'Live Cams'}
      ];
    case RouteCategory.USER:
      return [
        {path: AppPaths.PROFILE, label: 'Profile'},
        {path: AppPaths.MESSAGES, label: 'Messages'},
        {path: AppPaths.WALLET, label: 'Wallet'},
        {path: AppPaths.FAVORITES, label: 'Favorites'},
        {path: AppPaths.SETTINGS, label: 'Settings'}
      ];
    case RouteCategory.ADMIN:
      return [
        {path: AppPaths.ADMIN, label: 'Admin Dashboard'},
        {path: AppPaths.SEO, label: 'SEO Dashboard'},
        {path: AppPaths.NEURAL_MONITOR, label: 'Neural Monitor'},
        {path: AppPaths.MEDIA_GENERATION, label: 'Media Generation'}
      ];
    default:
      return [];
  }
};
