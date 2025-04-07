
import { useContext } from 'react';
import { AuthContext } from './useAuthProvider';

// Use auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider } from './useAuthProvider';
export default useAuth;
