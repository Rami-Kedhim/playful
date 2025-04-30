
// Export all components for authentication
import { AuthContext, AuthProvider, useAuth } from './AuthProvider';

// Re-export everything
export { 
  AuthContext, 
  AuthProvider,
  useAuth
};

// Don't import from './useAuthContext' to avoid circular references
