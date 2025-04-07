
// Re-export components from the auth folder
import { useAuth, AuthProvider } from './useAuth';
import { useRole } from './useRole';
import { useBehavioralProfile } from './useBehavioralProfile';
import { useGouldianFilters } from './useGouldianFilters';
import { useHermesMode } from './useHermesMode';

export { 
  useAuth, 
  AuthProvider, 
  useRole, 
  useBehavioralProfile,
  useGouldianFilters,
  useHermesMode
};
export default useAuth;
