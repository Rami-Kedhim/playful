
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { 
  AuthContext, 
  AuthProvider, 
  useAuth, 
  useAuthState,
  useAuthActions,
  useRole
} from './auth/index';

export { 
  useAuth, 
  AuthProvider, 
  AuthContext,
  useAuthState,
  useAuthActions,
  useRole
};

export default useAuth;
