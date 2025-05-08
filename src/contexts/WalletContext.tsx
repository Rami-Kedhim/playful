
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletTransaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund' | 'reward';
  description: string;
  createdAt: Date;
  status: 'pending' | 'completed' | 'failed';
}

interface WalletState {
  balance: number;
  pendingBalance: number;
  transactions: WalletTransaction[];
  isLoading: boolean;
  error: string | null;
}

interface WalletContextType extends WalletState {
  deposit: (amount: number, method: string) => Promise<boolean>;
  withdraw: (amount: number, destination: string) => Promise<boolean>;
  transfer: (amount: number, recipientId: string, purpose: string) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
  clearError: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    balance: 0,
    pendingBalance: 0,
    transactions: [],
    isLoading: false,
    error: null
  });

  useEffect(() => {
    // Load initial wallet data
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    setWallet(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // This would be an API call to fetch real wallet data
      // For now, we'll simulate data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock transactions
      const mockTransactions: WalletTransaction[] = [
        {
          id: '1',
          amount: 100,
          type: 'deposit',
          description: 'Initial deposit',
          createdAt: new Date(Date.now() - 864000000), // 10 days ago
          status: 'completed'
        },
        {
          id: '2',
          amount: 25,
          type: 'payment',
          description: 'Payment to Jane Doe',
          createdAt: new Date(Date.now() - 432000000), // 5 days ago
          status: 'completed'
        },
        {
          id: '3',
          amount: 50,
          type: 'deposit',
          description: 'Card deposit',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          status: 'completed'
        },
        {
          id: '4',
          amount: 15,
          type: 'payment',
          description: 'Premium content access',
          createdAt: new Date(),
          status: 'pending'
        }
      ];
      
      setWallet({
        balance: 110,
        pendingBalance: 15,
        transactions: mockTransactions,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      setWallet(prev => ({ 
        ...prev, 
        isLoading: false,
        error: error.message || 'Failed to load wallet data'
      }));
    }
  };

  const deposit = async (amount: number, method: string): Promise<boolean> => {
    setWallet(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // This would be an API call to process deposit
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new transaction
      const newTransaction: WalletTransaction = {
        id: `tx-${Date.now()}`,
        amount,
        type: 'deposit',
        description: `Deposit via ${method}`,
        createdAt: new Date(),
        status: 'completed'
      };
      
      setWallet(prev => ({
        ...prev,
        balance: prev.balance + amount,
        transactions: [newTransaction, ...prev.transactions],
        isLoading: false
      }));
      
      return true;
    } catch (error: any) {
      setWallet(prev => ({ 
        ...prev, 
        isLoading: false,
        error: error.message || `Failed to process deposit of ${amount}`
      }));
      return false;
    }
  };

  const withdraw = async (amount: number, destination: string): Promise<boolean> => {
    setWallet(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Check if sufficient balance
      if (wallet.balance < amount) {
        throw new Error('Insufficient balance');
      }
      
      // This would be an API call to process withdrawal
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new transaction
      const newTransaction: WalletTransaction = {
        id: `tx-${Date.now()}`,
        amount,
        type: 'withdrawal',
        description: `Withdrawal to ${destination}`,
        createdAt: new Date(),
        status: 'completed'
      };
      
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - amount,
        transactions: [newTransaction, ...prev.transactions],
        isLoading: false
      }));
      
      return true;
    } catch (error: any) {
      setWallet(prev => ({ 
        ...prev, 
        isLoading: false,
        error: error.message || `Failed to process withdrawal of ${amount}`
      }));
      return false;
    }
  };

  const transfer = async (amount: number, recipientId: string, purpose: string): Promise<boolean> => {
    setWallet(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Check if sufficient balance
      if (wallet.balance < amount) {
        throw new Error('Insufficient balance');
      }
      
      // This would be an API call to process transfer
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new transaction
      const newTransaction: WalletTransaction = {
        id: `tx-${Date.now()}`,
        amount,
        type: 'payment',
        description: `Payment to ${recipientId}: ${purpose}`,
        createdAt: new Date(),
        status: 'completed'
      };
      
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - amount,
        transactions: [newTransaction, ...prev.transactions],
        isLoading: false
      }));
      
      return true;
    } catch (error: any) {
      setWallet(prev => ({ 
        ...prev, 
        isLoading: false,
        error: error.message || `Failed to process transfer of ${amount}`
      }));
      return false;
    }
  };

  const refreshBalance = async (): Promise<void> => {
    await loadWalletData();
  };

  const clearError = () => {
    setWallet(prev => ({ ...prev, error: null }));
  };

  const walletContextValue: WalletContextType = {
    ...wallet,
    deposit,
    withdraw,
    transfer,
    refreshBalance,
    clearError
  };

  return (
    <WalletContext.Provider value={walletContextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};

export default WalletContext;
