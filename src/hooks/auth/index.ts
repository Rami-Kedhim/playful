
// Import all auth hooks
import { useAuth, AuthProvider, AuthContext } from './useAuth.tsx';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { useRole } from './useRole';

// Export all authentication related hooks from a single file
export { 
  useAuth,
  AuthProvider,
  AuthContext,
  useAuthState,
  useAuthActions,
  useRole
};

// Also export useAuth as default for compatibility
export default useAuth;
