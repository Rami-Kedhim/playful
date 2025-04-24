
import { useContext } from 'react';
import { AuthContext } from './useAuth.tsx';
import { AuthContextType } from '@/types/authTypes';

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { useAuthContext as useAuth };
export default useAuthContext;
