
/**
 * UberEscorts Unified Route System
 * 
 * This file serves as the single source of truth for all application routes.
 * All route references should come from this file to ensure consistency.
 */

export const UnifiedRoutes = {
  home: "/",
  escorts: {
    base: "/escorts",
    profile: "/escorts/:id",
    map: "/escorts/map",
    verified: "/escorts/verified"
  },
  clients: {
    base: "/clients",
    login: "/clients/login",
    wallet: "/clients/wallet",
    favorites: "/clients/favorites"
  },
  bookings: {
    base: "/bookings",
    new: "/bookings/new",
    history: "/bookings/history"
  },
  creators: {
    base: "/creators",
    profile: "/creators/:id",
    gallery: "/creators/gallery"
  },
  wallet: {
    base: "/wallet",
    recharge: "/wallet/recharge",
    history: "/wallet/history"
  },
  livecams: {
    base: "/livecams",
    room: "/livecams/room/:id"
  },
  lucie: {
    base: "/lucie",
    talk: "/lucie/talk",
    guide: "/lucie/guide",
    boost: "/lucie/boost"
  },
  admin: {
    base: "/admin",
    users: "/admin/users",
    reports: "/admin/reports"
  }
};

// Type for the UnifiedRoutes object
export type UnifiedRouteStructure = typeof UnifiedRoutes;

// Helper to get a route path by its name
export function getRoute(path: string): string {
  const parts = path.split('.');
  let current: any = UnifiedRoutes;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      console.error(`Route path not found: ${path}`);
      return '/';
    }
    current = current[part];
  }
  
  if (typeof current !== 'string') {
    console.error(`Path does not resolve to a string: ${path}`);
    return '/';
  }
  
  return current;
}

export default UnifiedRoutes;
