
import { useAuth } from './useAuth';
import { AuthProvider } from './AuthProvider';

// Export our hooks
export { useAuth, AuthProvider };

// Re-export types from auth types for convenience
export type { AuthUser, UserProfile, AuthResult, AuthContextType } from '@/types/auth';

// Define placeholder hooks that will be implemented separately
export const useRole = () => {
  const auth = useAuth();
  return {
    hasRole: (roles: string[]) => roles.some(role => auth.userRoles.includes(role)),
    hasAllRoles: (roles: string[]) => roles.every(role => auth.userRoles.includes(role)),
    isAdmin: () => auth.userRoles.includes('admin')
  };
};

export const useBehavioralProfile = () => {
  const auth = useAuth();
  return {
    profile: {}, // This will be implemented fully in a separate file
    isAnalyzing: false,
    analyzeUser: () => Promise.resolve()
  };
};

export const useGouldianFilters = () => {
  return {
    filters: {},
    setFilters: () => {}
  };
};

export const useHermesMode = () => {
  return {
    isEnabled: false,
    toggleMode: () => {}
  };
};
