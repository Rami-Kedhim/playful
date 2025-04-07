
import { useAuth } from './useAuth';
import { AuthProvider } from './AuthProvider';

// Export our hooks
export { useAuth, AuthProvider };

// Re-export types from auth types for convenience
export type { AuthUser, UserProfile, AuthResult, AuthContextType } from '@/types/auth';

// Properly export the actual hook implementations
export { useRole } from './useRole';
export { useBehavioralProfile } from './useBehavioralProfile';
export { useGouldianFilters } from './useGouldianFilters';
export { useHermesMode } from './useHermesMode';
