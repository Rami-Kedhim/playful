
import React, { createContext, useContext, ReactNode } from 'react';

interface OxumContextType {
  globalUbxRate: number;
  validatePrice: (price: number) => boolean;
  getPriceInfo: (service: string) => { price: number; currency: string };
  convertCurrency: (amount: number, from: string, to: string) => number;
}

const OxumContext = createContext<OxumContextType | undefined>(undefined);

export function OxumProvider({ children }: { children: ReactNode }) {
  const oxumValue: OxumContextType = {
    globalUbxRate: 15,
    validatePrice: (price) => {
      return price === 15;
    },
    getPriceInfo: (service) => {
      return { price: 15, currency: 'UBX' };
    },
    convertCurrency: (amount, from, to) => {
      // Mock conversion
      if (from === 'USD' && to === 'UBX') {
        return amount * 10;
      } else if (from === 'UBX' && to === 'USD') {
        return amount * 0.1;
      }
      return amount;
    }
  };

  return (
    <OxumContext.Provider value={oxumValue}>
      {children}
    </OxumContext.Provider>
  );
}

export function useOxum() {
  const context = useContext(OxumContext);
  if (context === undefined) {
    throw new Error('useOxum must be used within an OxumProvider');
  }
  return context;
}
