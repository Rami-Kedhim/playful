
/**
 * Authentication hooks and utilities
 */

// Main auth hook
import useAuthContext from './useAuthContext';
import { AuthContext } from './useAuthContext';

// Auth provider
import { AuthProvider } from '@/contexts/AuthContext';

// Additional auth hooks
import { useRole } from './useRole';
import useAuthState from './useAuthState';
import useAuthActions from './useAuthActions';
import useProfileManagement from './useProfileManagement';
import { usePasswordManagement } from './usePasswordManagement';

// Alias useAuth to useAuthContext for backward compatibility
const useAuth = useAuthContext;

// Export all auth components and hooks
export {
  useAuth,
  useAuthContext,
  AuthContext,
  AuthProvider,
  useRole,
  useAuthState,
  useAuthActions,
  useProfileManagement,
  usePasswordManagement
};

// Default export
export default useAuth;
