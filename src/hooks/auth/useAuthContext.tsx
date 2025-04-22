
import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '@/contexts/AuthContext';

// This hook adds typing to the AuthContext usage
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
