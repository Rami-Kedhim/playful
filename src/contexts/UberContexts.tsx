
import React, { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

interface UberContextsProviderProps {
  children: ReactNode;
}

const UberContextsProvider: React.FC<UberContextsProviderProps> = ({ children }) => {
  // Wrap all application contexts here
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default UberContextsProvider;
