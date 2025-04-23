
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { useAuth, AuthProvider, AuthContext } from './auth/useAuth.tsx';

export { useAuth, AuthProvider, AuthContext };
export default useAuth;
