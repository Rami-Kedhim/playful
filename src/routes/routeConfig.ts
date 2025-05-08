
import { UnifiedRoutes } from './unifiedRoutes';

// Define the official UberEscorts routes based on the cleanup requirements
export const AppPaths = {
  HOME: '/',
  APP: '/app',
  BRAIN_HUB: '/brain-hub',
  PROFILE: '/profile',
  WALLET: '/wallet',
  SEARCH: '/search',
  ESCORTS: '/escorts',
  VERIFICATION: '/verification',
  MODERATION: '/moderation',
  ADMIN: '/admin',
  METAVERSE: '/metaverse',
  AI_COMPANION: '/ai-companions',
  MESSAGES: '/messages',
  PULSE_BOOST: '/pulse-boost',
  SETTINGS: '/settings',
  PERSONAS: '/personas',
  LUCIE: '/lucie',
  OXUM: '/oxum',
  HERMES: '/hermes',
  ORUS: '/orus'
};

// Export AppPaths as APP_PATHS for backward compatibility
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
