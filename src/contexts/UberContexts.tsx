
import React, { ReactNode } from 'react';
import { BoostProvider } from './BoostContext';

interface UberContextsProviderProps {
  children: ReactNode;
}

/**
 * UberContexts - Unified context provider for the UberEscorts ecosystem
 * This component wraps all the context providers in the application
 */
export const UberContextsProvider: React.FC<UberContextsProviderProps> = ({ children }) => {
  return (
    <BoostProvider>
      {children}
    </BoostProvider>
  );
};

export default UberContextsProvider;
