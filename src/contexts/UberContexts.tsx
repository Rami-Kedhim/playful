
import React from 'react';
import { AuthProvider } from '@/hooks/auth';
import { LucieProvider } from '@/contexts/LucieContext';
import { HermesProvider } from '@/contexts/HermesContext';
import { OxumProvider } from '@/contexts/OxumContext';

interface UberContextsProviderProps {
  children: React.ReactNode;
}

const UberContextsProvider = ({ children }: UberContextsProviderProps) => {
  return (
    <AuthProvider>
      <LucieProvider>
        <HermesProvider>
          <OxumProvider>
            {children}
          </OxumProvider>
        </HermesProvider>
      </LucieProvider>
    </AuthProvider>
  );
};

export default UberContextsProvider;
