
// Import all auth hooks
import { useAuth, AuthProvider } from './useAuthContext';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { usePasswordManagement } from './usePasswordManagement';
import { useProfileManagement } from './useProfileManagement';
import { useRole } from './useRole';
import { useAuthentication } from './useAuthentication';
import { useAuthPerformance } from './useAuthPerformance';

// Export all authentication related hooks from a single file
export { 
  useAuth, 
  AuthProvider,
  useAuthState,
  useAuthActions,
  usePasswordManagement,
  useProfileManagement,
  useRole,
  useAuthentication,
  useAuthPerformance
};

// Export a default object with all hooks
const authHooks = {
  useAuth,
  AuthProvider,
  useAuthState,
  useAuthActions,
  usePasswordManagement,
  useProfileManagement,
  useRole,
  useAuthentication,
  useAuthPerformance
};

export default authHooks;
