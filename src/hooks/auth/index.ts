
// This file exports auth hooks and components for easy importing
import { useAuth, AuthContext } from '@/hooks/auth/useAuthContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/auth/useRole';

export {
  useAuth,
  AuthProvider,
  useRole,
  AuthContext
};

export default useAuth;
