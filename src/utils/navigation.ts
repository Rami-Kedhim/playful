
// Navigation constants and utilities

export const AppRoutes = {
  HOME: '/',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
  MESSAGES: '/messages',
  METAVERSE: '/metaverse',
  SEARCH: '/search',
  ESCORTS: '/escorts',
  ESCORT_DETAIL: '/escorts/:id',
  LIVESTREAMS: '/livestreams',
  LIVESTREAM_DETAIL: '/livestreams/:id',
  CREATORS: '/creators',
  CREATOR_DETAIL: '/creators/:id',
  AI_COMPANION: '/ai-companions',
  LIVECAMS: '/livecams',
  LIVECAM_DETAIL: '/livecams/:id',
  BRAIN_HUB: '/brain-hub',
  NEURAL_MONITOR: '/neural/monitor',
  NEURAL_ANALYTICS: '/neural/analytics',
  AUTH: '/auth',
  WALLET: '/wallet',
  VERIFICATION: '/verification',
  PERSONAS: '/personas',
  PERSONA_DETAIL: '/persona/:id',
  SAFETY_ROUTE_SHARE: '/safety/route-share',
  PULSE_BOOST: '/pulse-boost',
  SETTINGS: '/settings',
  ADMIN: '/admin',
  MODERATION: '/moderation',
  LUCIE: '/lucie',
  OXUM: '/oxum',
  HERMES: '/hermes',
  ORUS: '/orus',
  ETHICS: '/ethics'
};

export const ServiceCategories = {
  LIVECAMS: 'livecams',
  AI_COMPANION: 'ai-companions',
  BRAIN_HUB: 'brain-hub',
  SAFETY: 'safety',
  UBERPERSONA: 'personas',
  CORE_SYSTEMS: 'core'
};

export const UberCoreComponents = {
  LUCIE: 'lucie',
  OXUM: 'oxum',
  HERMES: 'hermes',
  ORUS: 'orus',
  WALLET: 'wallet'
};

export interface Breadcrumb {
  label: string;
  path: string;
}

export const getBreadcrumbsFromPath = (path: string): Breadcrumb[] => {
  const parts = path.split('/').filter(p => p);
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', path: '/' }
  ];

  if (parts.length === 0) {
    return breadcrumbs;
  }

  let currentPath = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    currentPath += `/${part}`;
    
    // Skip ID parts in the breadcrumb
    if (i < parts.length - 1 && parts[i+1].match(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i)) {
      continue;
    }
    
    // Format the label for better display
    let label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    
    // Handle special cases
    if (part === 'ai-companions') {
      label = 'AI Companions';
    } else if (part === 'brain-hub') {
      label = 'Brain Hub';
    } else if (part === 'route-share' && parts[i-1] === 'safety') {
      label = 'Route Sharing';
    } else if (UberCoreComponents[part.toUpperCase()]) {
      // Special handling for UberCore components
      label = part.charAt(0).toUpperCase() + part.slice(1);
    }
    
    breadcrumbs.push({
      label,
      path: currentPath
    });
  }

  return breadcrumbs;
};

// Helper function to check if a path is related to UberCore
export const isUberCorePath = (path: string): boolean => {
  const corePaths = Object.values(UberCoreComponents).map(c => c.toLowerCase());
  const pathSegment = path.split('/').filter(p => p)[0]?.toLowerCase();
  return corePaths.includes(pathSegment);
};

// Helper function for determining active link
export const isActivePath = (currentPath: string, linkPath: string): boolean => {
  if (linkPath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(linkPath);
};
