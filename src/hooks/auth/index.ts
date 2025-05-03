
// This file exports auth hooks and components for easy importing
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/auth/useRole';

export {
  useAuth,
  AuthProvider,
  useRole
};

export default useAuth;
