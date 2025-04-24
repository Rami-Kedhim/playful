
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { 
  AuthContext, 
  AuthProvider, 
  useAuth, 
  useAuthContext,
  useAuthState,
  useAuthActions,
  useRole
} from './auth';

export { 
  useAuth, 
  useAuthContext,
  AuthProvider, 
  AuthContext,
  useAuthState,
  useAuthActions,
  useRole
};

export default useAuth;
