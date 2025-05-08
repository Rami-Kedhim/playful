
import { ElementType } from 'react';

export interface RouteConfig {
  path: string;
  label: string;
  title: string;
  icon: ElementType;
  requireAuth?: boolean;
  roles?: string[];
  category?: string;
}

export interface AppPaths {
  HOME: string;
  ESCORTS: string;
  ESCORT_DETAIL: string;
  CREATORS: string;
  CREATOR_DETAIL: string;
  LIVECAMS: string;
  LIVECAM_DETAIL: string;
  VERIFICATION: string;
  SETTINGS: string;
  AUTH: string;
  PROFILE: string;
  USER_PROFILE: string;
  WALLET: string;
  ADMIN: string;
  DASHBOARD: string;
  NEURAL_MONITOR: string;
  NEURAL_ANALYTICS: string;
  NEURAL_SERVICES: string;
  FAVORITES: string;
  MESSAGES: string;
  PULSE_BOOST: string;
  GUIDELINES: string;
  SEO: string;
  SAFETY: string;
  TERMS: string;
  PRIVACY: string;
  CONTACT: string;
  METAVERSE: string;
  BRAIN_HUB: string;
  AI_COMPANION: string;
  COMPLIANCE: string;
}

export const APP_PATHS: AppPaths = {
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
  PROFILE: '/profile',
  USER_PROFILE: '/user-profile',
  WALLET: '/wallet',
  ADMIN: '/admin',
  DASHBOARD: '/dashboard',
  NEURAL_MONITOR: '/neural/monitor',
  NEURAL_ANALYTICS: '/neural/analytics',
  NEURAL_SERVICES: '/neural/services',
  FAVORITES: '/favorites',
  MESSAGES: '/messages',
  PULSE_BOOST: '/boost',
  GUIDELINES: '/guidelines',
  SEO: '/seo',
  SAFETY: '/safety',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  CONTACT: '/contact',
  METAVERSE: '/metaverse',
  BRAIN_HUB: '/brain-hub',
  AI_COMPANION: '/ai-companions',
  COMPLIANCE: '/compliance'
};

// Export both the interface and the constant
export { APP_PATHS as AppPaths };
export default APP_PATHS;
