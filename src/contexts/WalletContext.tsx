
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/components/ui/use-toast';

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  addFunds: (amount: number) => Promise<boolean>;
  transferFunds: (recipientId: string, amount: number) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'purchase';
  description: string;
  createdAt: Date;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load wallet data when user authenticates
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshBalance();
    } else {
      // Reset wallet when user logs out
      setBalance(0);
      setTransactions([]);
    }
  }, [isAuthenticated, user]);

  const refreshBalance = async (): Promise<void> => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API
      // For now, we'll simulate with a delay and random data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate balance and transactions
      const mockBalance = Math.floor(Math.random() * 1000);
      setBalance(mockBalance);
      
      const mockTransactions = Array(5).fill(0).map((_, i) => ({
        id: `tr-${Date.now()}-${i}`,
        amount: Math.floor(Math.random() * 200),
        type: ['deposit', 'withdrawal', 'transfer', 'purchase'][Math.floor(Math.random() * 4)] as 'deposit' | 'withdrawal' | 'transfer' | 'purchase',
        description: `Transaction #${i + 1}`,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000))
      }));
      
      setTransactions(mockTransactions);
    } catch (err: any) {
      console.error('Error loading wallet data:', err);
      setError('Failed to load wallet data. Please try again.');
      toast({
        title: "Wallet Error",
        description: "Failed to load your wallet information.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addFunds = async (amount: number): Promise<boolean> => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add funds.",
        variant: "destructive"
      });
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call a payment API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update balance and add transaction
      setBalance(prev => prev + amount);
      
      const newTransaction: Transaction = {
        id: `tr-${Date.now()}`,
        amount,
        type: 'deposit',
        description: `Added ${amount} UBX tokens`,
        createdAt: new Date()
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      
      toast({
        title: "Funds Added",
        description: `Successfully added ${amount} UBX tokens to your wallet.`
      });
      
      return true;
    } catch (err: any) {
      console.error('Error adding funds:', err);
      setError('Failed to add funds. Please try again.');
      toast({
        title: "Transaction Failed",
        description: "Failed to add funds to your wallet.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const transferFunds = async (recipientId: string, amount: number): Promise<boolean> => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to transfer funds.",
        variant: "destructive"
      });
      return false;
    }
    
    if (balance < amount) {
      toast({
        title: "Insufficient Funds",
        description: "Your wallet balance is too low for this transaction.",
        variant: "destructive"
      });
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call a transfer API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update balance and add transaction
      setBalance(prev => prev - amount);
      
      const newTransaction: Transaction = {
        id: `tr-${Date.now()}`,
        amount: -amount,
        type: 'transfer',
        description: `Transferred ${amount} UBX tokens to user ${recipientId.substring(0, 8)}`,
        createdAt: new Date()
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      
      toast({
        title: "Transfer Successful",
        description: `Successfully transferred ${amount} UBX tokens.`
      });
      
      return true;
    } catch (err: any) {
      console.error('Error transferring funds:', err);
      setError('Failed to transfer funds. Please try again.');
      toast({
        title: "Transfer Failed",
        description: "Failed to transfer funds. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        loading,
        error,
        addFunds,
        transferFunds,
        refreshBalance
      }}
    >
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
