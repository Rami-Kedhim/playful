
import React, { createContext, useContext, ReactNode } from 'react';

interface HermesContextType {
  isActive: boolean;
  queuePosition: number | null;
  timeRemaining: number | null;
  activate: () => Promise<void>;
  deactivate: () => Promise<void>;
  getStatus: () => Promise<any>;
}

const HermesContext = createContext<HermesContextType | undefined>(undefined);

export function HermesProvider({ children }: { children: ReactNode }) {
  const hermesValue: HermesContextType = {
    isActive: false,
    queuePosition: null,
    timeRemaining: null,
    activate: async () => {
      console.log('Activating Hermes');
    },
    deactivate: async () => {
      console.log('Deactivating Hermes');
    },
    getStatus: async () => {
      return {
        active: false,
        position: null,
        timeRemaining: null
      };
    }
  };

  return (
    <HermesContext.Provider value={hermesValue}>
      {children}
    </HermesContext.Provider>
  );
}

export function useHermes() {
  const context = useContext(HermesContext);
  if (context === undefined) {
    throw new Error('useHermes must be used within a HermesProvider');
  }
  return context;
}
