
// Import all auth hooks
import { useAuth, AuthProvider, AuthContext } from './useAuth.tsx';

// Export all authentication related hooks from a single file
export { 
  useAuth,
  AuthProvider,
  AuthContext
};

// Also export useAuth as default for compatibility
export default useAuth;
