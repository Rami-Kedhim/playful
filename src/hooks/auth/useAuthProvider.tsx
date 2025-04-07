
import React, { createContext, useContext } from 'react';
import { useAuthState } from './useAuthState';
import { usePasswordManagement } from './usePasswordManagement';
import { useAuthActions } from './useAuthActions';

// Create context
export const AuthContext = createContext<any>(null);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our custom hooks
  const authState = useAuthState();
  const passwordManagement = usePasswordManagement();
  
  // Combine our hooks into one context value
  const authContextValue = {
    ...authState,
    ...passwordManagement,
    isAuthenticated: !!authState.user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
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
