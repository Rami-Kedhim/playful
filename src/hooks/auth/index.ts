
import { AuthContext, AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useRole } from './useRole';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';

export {
  AuthContext,
  AuthProvider,
  useAuth,
  useRole,
  useAuthState,
  useAuthActions
};

export default useAuth;
