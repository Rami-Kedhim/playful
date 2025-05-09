
/**
 * Authentication hooks and utilities
 */

// Main auth hook
import { useAuth, AuthContext } from './useAuthContext';

// Auth provider
import { AuthProvider } from '@/contexts/AuthContext';

// Additional auth hooks
import { useRole } from './useRole';
import useAuthState from './useAuthState';
import useAuthActions from './useAuthActions';
import useProfileManagement from './useProfileManagement';
import { usePasswordManagement } from './usePasswordManagement';

// Export all auth components and hooks
export {
  useAuth,
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
