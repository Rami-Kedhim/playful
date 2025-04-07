
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { useAuth, AuthProvider } from '@/hooks/auth/useAuthContext';

export { useAuth, AuthProvider };
export default useAuth;
