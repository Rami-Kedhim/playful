
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BoostContextType {
  isActive: boolean;
  remainingTime?: string;
  boostScore?: number;
  activate: () => void;
  deactivate: () => void;
  refreshStatus: () => void;
}

const defaultContext: BoostContextType = {
  isActive: false,
  activate: () => {},
  deactivate: () => {},
  refreshStatus: () => {}
};

const BoostContext = createContext<BoostContextType>(defaultContext);

export const useBoost = () => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error('useBoost must be used within a BoostProvider');
  }
  
  return context;
};

interface BoostProviderProps {
  children: ReactNode;
}

export const BoostProvider: React.FC<BoostProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string | undefined>(undefined);
  const [boostScore, setBoostScore] = useState<number | undefined>(undefined);
  
  const activate = () => {
    setIsActive(true);
    // In a real implementation, this would call an API to activate the boost
    setRemainingTime('23 hours');
  };
  
  const deactivate = () => {
    setIsActive(false);
    setRemainingTime(undefined);
  };
  
  const refreshStatus = () => {
    // In a real implementation, this would fetch the current boost status from an API
    console.log('Refreshing boost status');
  };
  
  return (
    <BoostContext.Provider 
      value={{ 
        isActive, 
        remainingTime, 
        boostScore,
        activate, 
        deactivate,
        refreshStatus 
      }}
    >
      {children}
    </BoostContext.Provider>
  );
};
