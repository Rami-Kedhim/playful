
// This file is kept for backward compatibility
import { AuthContext, AuthProvider } from './useAuth.tsx';
import { useAuthContext } from './useAuthContext';

export { AuthContext, AuthProvider, useAuthContext as useAuth };
export default useAuthContext;
