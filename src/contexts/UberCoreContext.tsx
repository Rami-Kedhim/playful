
import React, { createContext, useContext, ReactNode } from 'react';

interface UberCoreContextType {
  isInitialized: boolean;
  version: string;
  initialize: () => Promise<void>;
  getConfig: () => any;
  setConfig: (config: any) => Promise<void>;
}

const UberCoreContext = createContext<UberCoreContextType | undefined>(undefined);

export function UberCoreProvider({ children }: { children: ReactNode }) {
  const coreValue: UberCoreContextType = {
    isInitialized: true,
    version: '1.0.0',
    initialize: async () => {
      console.log('Initializing UberCore');
    },
    getConfig: () => ({
      apiVersion: '1.0',
      environment: 'development',
      features: []
    }),
    setConfig: async (config) => {
      console.log('Setting UberCore config', config);
    }
  };

  return (
    <UberCoreContext.Provider value={coreValue}>
      {children}
    </UberCoreContext.Provider>
  );
}

export function useUberCore() {
  const context = useContext(UberCoreContext);
  if (context === undefined) {
    throw new Error('useUberCore must be used within a UberCoreProvider');
  }
  return context;
}
