
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import { useAuthContext } from './useAuthContext';
import { useRole } from './useRole';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';

// Re-export the context and provider
export { AuthContext, AuthProvider };

// Re-export hooks with aliases
export const useAuth = useAuthContext;

// Export additional hooks
export { useRole, useAuthState, useAuthActions };

// Default export
export default useAuthContext;
