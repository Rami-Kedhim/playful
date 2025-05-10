import React, { createContext, useState, useContext, ReactNode } from 'react';
import { uberCore } from '@/core';

interface UberEcosystemContextType {
  isSystemReady: boolean;
  initialize: () => Promise<void>;
  shutdown: () => Promise<void>;
}

const UberEcosystemContext = createContext<UberEcosystemContextType>({
  isSystemReady: false,
  initialize: () => Promise.resolve(),
  shutdown: () => Promise.resolve(),
});

export const UberEcosystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSystemReady, setIsSystemReady] = useState(false);

  const initialize = async () => {
    try {
      await uberCore.initialize();
      setIsSystemReady(true);
    } catch (error) {
      console.error("Failed to initialize Uber Ecosystem:", error);
      setIsSystemReady(false);
    }
  };

  const shutdown = async () => {
    // Add shutdown logic here
    setIsSystemReady(false);
  };

  const value: UberEcosystemContextType = {
    isSystemReady,
    initialize,
    shutdown,
  };

  return (
    <UberEcosystemContext.Provider value={value}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

export const useUberEcosystem = () => useContext(UberEcosystemContext);
