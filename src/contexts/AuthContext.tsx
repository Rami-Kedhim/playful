
import React, { ReactNode } from 'react';
import useAuthContext, { AuthContext } from '@/hooks/auth/useAuthContext';
import type { AuthContextType } from '@/types/user';

// Provider component that wraps the app and makes auth object available to children
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuthContext();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the useAuthContext hook directly
export { useAuthContext };

// Export the useAuth hook as an alias to useAuthContext for backward compatibility
export const useAuth = useAuthContext;

export default useAuth;
