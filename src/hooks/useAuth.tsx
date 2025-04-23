
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { useAuth, AuthProvider, AuthContext } from './auth/useAuth.tsx';
import { useAuthState } from './auth/useAuthState';
import { useAuthActions } from './auth/useAuthActions';
import { useRole } from './auth/useRole';

export { 
  useAuth, 
  AuthProvider, 
  AuthContext,
  useAuthState,
  useAuthActions,
  useRole
};
export default useAuth;
