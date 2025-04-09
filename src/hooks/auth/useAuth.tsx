
/**
 * This file is kept for backward compatibility
 * It re-exports components from the auth/useAuthContext module
 */
import { useAuth, AuthProvider } from '@/hooks/auth/useAuthContext';

export { useAuth, AuthProvider };
export default useAuth;
