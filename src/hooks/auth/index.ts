
// This file exports auth hooks and components for easy importing
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';

export {
  useAuth,
  AuthProvider
};

export default useAuth;
