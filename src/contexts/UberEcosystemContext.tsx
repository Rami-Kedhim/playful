
import React, { createContext, useState, useContext, useEffect } from 'react';
import { LucieAI, lucieAI } from '@/core/Lucie';
import { Oxum } from '@/core/Oxum';

export interface UberEcosystemContextType {
  initialized: boolean;
  ready: boolean;
  oxum?: Oxum;
  lucieAI?: LucieAI;
  user?: any; // Add user property
  loading?: boolean; // Add loading property
}

const defaultContextValue: UberEcosystemContextType = {
  initialized: false,
  ready: false,
  user: null,
  loading: true
};

export const UberEcosystemContext = createContext<UberEcosystemContextType>(defaultContextValue);

export const UberEcosystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UberEcosystemContextType>(defaultContextValue);
  
  useEffect(() => {
    const initializeEcosystem = async () => {
      try {
        // Initialize Oxum
        const oxumInstance = new Oxum();
        await oxumInstance.initialize();
        
        // Using the pre-created lucieAI instance
        await lucieAI.initialize();
        
        setState({
          initialized: true,
          ready: true,
          oxum: oxumInstance,
          lucieAI,
          user: null,  // Will be populated by auth system
          loading: false
        });
      } catch (error) {
        console.error("Failed to initialize Uber ecosystem:", error);
        setState({
          ...state,
          initialized: true,
          ready: false,
          loading: false
        });
      }
    };
    
    initializeEcosystem();
  }, []);
  
  return (
    <UberEcosystemContext.Provider value={state}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

export const useUberEcosystem = () => useContext(UberEcosystemContext);

export default UberEcosystemContext;
