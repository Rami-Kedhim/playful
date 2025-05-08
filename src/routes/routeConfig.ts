
import { ElementType } from 'react';

export interface RouteConfig {
  path: string;
  label: string;
  title: string;
  icon: ElementType; // Updated to ElementType for React components
  requireAuth?: boolean;
  roles?: string[];
  category?: string; // Added category property
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
  WALLET: string;
  ADMIN: string;
  DASHBOARD: string;
  NEURAL_MONITOR: string;
  NEURAL_ANALYTICS: string;
  NEURAL_SERVICES: string;
  FAVORITES: string;
  MESSAGES: string;
  PULSE_BOOST: string;
  GUIDELINES: string; // Added GUIDELINES route
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
  WALLET: '/wallet',
  ADMIN: '/admin',
  DASHBOARD: '/dashboard',
  NEURAL_MONITOR: '/neural/monitor',
  NEURAL_ANALYTICS: '/neural/analytics',
  NEURAL_SERVICES: '/neural/services',
  FAVORITES: '/favorites',
  MESSAGES: '/messages',
  PULSE_BOOST: '/boost',
  GUIDELINES: '/guidelines', // Added GUIDELINES route
};

export default APP_PATHS;
