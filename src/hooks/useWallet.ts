
import { useState, useEffect, useContext, createContext, ReactNode } from "react";

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  lastTransaction?: {
    id: string;
    amount: number;
    type: 'credit' | 'debit';
    timestamp: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface WalletContextType {
  wallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  refreshWallet: () => Promise<void>;
  addFunds: (amount: number) => Promise<boolean>;
  withdrawFunds: (amount: number) => Promise<boolean>;
}

// Create wallet context with default values
const WalletContext = createContext<WalletContextType>({
  wallet: null,
  isLoading: false,
  error: null,
  refreshWallet: async () => {},
  addFunds: async () => false,
  withdrawFunds: async () => false,
});

// Mock wallet data for development
const mockWallet: Wallet = {
  id: "wallet-1",
  userId: "user-1",
  balance: 250,
  currency: "LUCOIN",
  lastTransaction: {
    id: "tx-123",
    amount: 50,
    type: 'credit',
    timestamp: new Date(),
  },
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  updatedAt: new Date(),
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshWallet = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, fetch from API
      // For now, just use mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      setWallet(mockWallet);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch wallet data");
    } finally {
      setIsLoading(false);
    }
  };

  const addFunds = async (amount: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      // In a real implementation, call API to add funds
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (wallet) {
        const newWallet = {
          ...wallet,
          balance: wallet.balance + amount,
          lastTransaction: {
            id: `tx-${Date.now()}`,
            amount,
            type: 'credit' as const,
            timestamp: new Date()
          },
          updatedAt: new Date()
        };
        setWallet(newWallet);
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add funds");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawFunds = async (amount: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      if (!wallet) {
        setError("Wallet not initialized");
        return false;
      }
      
      if (wallet.balance < amount) {
        setError("Insufficient funds");
        return false;
      }
      
      // In a real implementation, call API to withdraw funds
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newWallet = {
        ...wallet,
        balance: wallet.balance - amount,
        lastTransaction: {
          id: `tx-${Date.now()}`,
          amount,
          type: 'debit' as const,
          timestamp: new Date()
        },
        updatedAt: new Date()
      };
      
      setWallet(newWallet);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to withdraw funds");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshWallet();
  }, []);

  return (
    <WalletContext.Provider value={{
      wallet,
      isLoading,
      error,
      refreshWallet,
      addFunds,
      withdrawFunds
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);

export default useWallet;
