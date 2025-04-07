
import React, { createContext, useContext } from 'react';
import { useAuthState } from '@/hooks/auth/useAuthState';

// Create context
export const AuthContext = createContext<any>(null);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthState();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
