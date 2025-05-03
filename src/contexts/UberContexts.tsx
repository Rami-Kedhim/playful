
import React, { ReactNode } from 'react';

interface UberContextsProviderProps {
  children: ReactNode;
}

const UberContextsProvider: React.FC<UberContextsProviderProps> = ({ children }) => {
  // This is a placeholder for all the context providers that will be used in the app
  return (
    <>
      {children}
    </>
  );
};

export default UberContextsProvider;
