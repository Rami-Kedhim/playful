
import { UnifiedRoutes } from './unifiedRoutes';

export const AppPaths = {
  HOME: UnifiedRoutes.home,
  ESCORT_SEARCH: UnifiedRoutes.escorts.base,
  ESCORTS: UnifiedRoutes.escorts.base,
  ESCORT_DETAIL: UnifiedRoutes.escorts.profile,
  ESCORT_MAP: UnifiedRoutes.escorts.map,
  ESCORT_VERIFIED: UnifiedRoutes.escorts.verified,
  CREATORS: UnifiedRoutes.creators.base,
  CREATOR_DETAIL: UnifiedRoutes.creators.profile,
  CREATOR_GALLERY: UnifiedRoutes.creators.gallery,
  AI_COMPANION: "/ai-companions", // Maintaining backward compatibility
  AI_COMPANION_DETAIL: "/ai-companion/:id", // Maintaining backward compatibility
  MESSAGES: "/messages", // Maintaining backward compatibility
  WALLET: UnifiedRoutes.wallet.base,
  WALLET_RECHARGE: UnifiedRoutes.wallet.recharge,
  WALLET_HISTORY: UnifiedRoutes.wallet.history,
  PROFILE: "/profile", // Maintaining backward compatibility
  USER_PROFILE: "/profile", // Maintaining backward compatibility
  SETTINGS: "/settings", // Maintaining backward compatibility
  VERIFICATION: "/verification", // Maintaining backward compatibility
  PULSE_BOOST: "/pulse-boost", // Maintaining backward compatibility
  LUCIE: UnifiedRoutes.lucie.base,
  LUCIE_TALK: UnifiedRoutes.lucie.talk,
  LUCIE_GUIDE: UnifiedRoutes.lucie.guide,
  LUCIE_BOOST: UnifiedRoutes.lucie.boost,
  OXUM: "/oxum", // Maintaining backward compatibility
  HERMES: "/hermes", // Maintaining backward compatibility
  LOGIN: UnifiedRoutes.clients.login,
  REGISTER: "/register", // Maintaining backward compatibility
  BRAIN_HUB: "/brain-hub", // Maintaining backward compatibility
  NEURAL_ANALYTICS: "/neural-analytics", // Maintaining backward compatibility
  METAVERSE: "/metaverse", // Maintaining backward compatibility
  TERMS: "/terms", // Maintaining backward compatibility
  PRIVACY: "/privacy", // Maintaining backward compatibility
  SAFETY: "/safety", // Maintaining backward compatibility
  CONTACT: "/contact", // Maintaining backward compatibility
  LIVECAMS: UnifiedRoutes.livecams.base,
  LIVECAM_DETAIL: UnifiedRoutes.livecams.room,
  ADMIN: UnifiedRoutes.admin.base,
  ADMIN_USERS: UnifiedRoutes.admin.users,
  ADMIN_REPORTS: UnifiedRoutes.admin.reports,
  AUTH: "/auth", // Maintaining backward compatibility
  NEURAL_MONITOR: "/neural/monitor", // Maintaining backward compatibility
  SEO: "/seo", // Maintaining backward compatibility
  DASHBOARD: "/dashboard", // Maintaining backward compatibility
  GUIDELINES: "/guidelines", // Maintaining backward compatibility
  FAVORITES: UnifiedRoutes.clients.favorites,
  BOOKINGS: UnifiedRoutes.bookings.base,
  BOOKINGS_NEW: UnifiedRoutes.bookings.new,
  BOOKINGS_HISTORY: UnifiedRoutes.bookings.history
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
