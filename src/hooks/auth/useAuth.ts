
// This file is kept for backward compatibility
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import { useAuthContext, useAuth } from './useAuthContext';

export { AuthContext, AuthProvider, useAuthContext, useAuth };
export default useAuth;
