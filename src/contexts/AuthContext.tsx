
import React, { ReactNode } from 'react';
import { useAuthContext as useBaseAuthContext, AuthContext } from '@/hooks/auth/useAuthContext';
import type { AuthContextType } from '@/types/user';

// Provider component that wraps the app and makes auth object available to children
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useBaseAuthContext();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for child components to get the auth object and re-render when it changes
export const useAuthContext = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Export the useAuth hook as an alias to useAuthContext for backward compatibility
export const useAuth = useAuthContext;

export default useAuth;
