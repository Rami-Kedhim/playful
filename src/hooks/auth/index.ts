
// Export the auth context and provider
import { AuthContext, AuthProvider } from './useAuth.tsx';
import { useAuthContext } from './useAuthContext';
import { useRole } from './useRole';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';

// Export as named exports
export {
  AuthContext,
  AuthProvider,
  useAuthContext as useAuth,
  useRole,
  useAuthState,
  useAuthActions
};

// Export default
export default useAuthContext;
