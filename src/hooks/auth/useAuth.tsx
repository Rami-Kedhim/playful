
// This file re-exports from useAuthContext to maintain backward compatibility
import { useAuth, AuthProvider } from './useAuthContext';

export { useAuth, AuthProvider };
export default useAuth;
