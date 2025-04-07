
import { useAuth } from './useAuth';
import { AuthProvider } from './AuthProvider';
import { useRole } from '../auth/index';
import { useBehavioralProfile, useGouldianFilters, useHermesMode } from '../auth/index';

export { 
  useAuth, 
  AuthProvider,
  useRole,
  useBehavioralProfile,
  useGouldianFilters,
  useHermesMode
};

// Re-export types from useAuth for convenience
export type { AuthUser, UserProfile, AuthResult } from './useAuth';
