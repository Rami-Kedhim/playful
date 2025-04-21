
import React, { createContext, useContext, ReactNode } from 'react';

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  deposit: (amount: number) => Promise<boolean>;
  withdraw: (amount: number) => Promise<boolean>;
  transfer: (to: string, amount: number) => Promise<boolean>;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'purchase';
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const walletValue: WalletContextType = {
    balance: 0,
    transactions: [],
    isLoading: false,
    error: null,
    refresh: async () => {
      console.log('Refreshing wallet');
    },
    deposit: async (amount) => {
      console.log(`Depositing ${amount}`);
      return true;
    },
    withdraw: async (amount) => {
      console.log(`Withdrawing ${amount}`);
      return true;
    },
    transfer: async (to, amount) => {
      console.log(`Transferring ${amount} to ${to}`);
      return true;
    }
  };

  return (
    <WalletContext.Provider value={walletValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
