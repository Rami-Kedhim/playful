
import React, { createContext, useContext } from 'react';
import { Escort } from '@/types/Escort';

export interface EscortContextType {
  escorts: Escort[];
  loading: boolean;
}

export const EscortContext = createContext<EscortContextType>({
  escorts: [],
  loading: false,
});

export const useEscortContext = () => useContext(EscortContext);

export const EscortContextProvider: React.FC<{ 
  children: React.ReactNode,
  escorts?: Escort[],
  loading?: boolean
}> = ({ 
  children,
  escorts = [],
  loading = false,
}) => {
  const value = {
    escorts,
    loading,
  };

  return (
    <EscortContext.Provider value={value}>
      {children}
    </EscortContext.Provider>
  );
};

export default EscortContextProvider;
