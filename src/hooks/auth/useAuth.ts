
// This file is kept for backward compatibility
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import { useAuthContext } from './useAuthContext';

export { AuthContext, AuthProvider, useAuthContext as useAuth };
export default useAuthContext;
