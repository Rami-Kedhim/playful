
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { 
  AuthContext, 
  AuthProvider, 
  useAuth 
} from './auth';

export { 
  useAuth, 
  AuthProvider, 
  AuthContext
};

// Legacy exports to maintain backward compatibility
export const useAuthState = useAuth;
export const useAuthActions = useAuth;
export const useRole = () => {
  const auth = useAuth();
  return {
    hasRole: auth.checkRole
  };
};

export default useAuth;
