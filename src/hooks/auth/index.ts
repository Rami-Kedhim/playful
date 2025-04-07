
// Import all auth hooks
import { useAuth, AuthProvider } from './useAuth';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { usePasswordManagement } from './usePasswordManagement';
import { useProfileManagement } from './useProfileManagement';
import { useRole } from './useRole';

// Export all authentication related hooks from a single file
export { useAuth, AuthProvider } from "./useAuth";
export { useAuthState } from "./useAuthState";
export { useAuthActions } from "./useAuthActions";
export { usePasswordManagement } from "./usePasswordManagement";
export { useProfileManagement } from "./useProfileManagement";
export { useRole } from "./useRole";

// Export a default object with all hooks
const authHooks = {
  useAuth,
  AuthProvider,
  useAuthState,
  useAuthActions,
  usePasswordManagement,
  useProfileManagement,
  useRole
};

export default authHooks;
