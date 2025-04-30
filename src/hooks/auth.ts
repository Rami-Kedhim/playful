
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { 
  AuthContext, 
  AuthProvider, 
  useAuth as useAuthHook
} from './auth/AuthProvider';

// Export with specific names to avoid circular references
export const useAuth = useAuthHook; 
export { AuthProvider, AuthContext };

// Legacy exports to maintain backward compatibility
export const useAuthState = () => useAuthHook();
export const useAuthActions = () => useAuthHook();
export const useRole = () => {
  const auth = useAuthHook();
  return {
    hasRole: auth.checkRole
  };
};

export default useAuthHook;
