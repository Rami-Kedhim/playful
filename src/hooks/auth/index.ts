
// Update the main auth exports file to re-export everything from the unified system
import { useAuth, AuthProvider, AuthContext } from './useAuth';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { useRole } from './useRole';

export { 
  useAuth,
  AuthProvider,
  AuthContext,
  useAuthState,
  useAuthActions,
  useRole
};

// Also export useAuth as default for backwards compatibility
export default useAuth;
