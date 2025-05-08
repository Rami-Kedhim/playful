
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'refund';
  description: string;
  timestamp: Date;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addFunds: (amount: number) => void;
  withdraw: (amount: number) => boolean;
  getTransactions: () => Transaction[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load wallet data from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      try {
        const parsedWallet = JSON.parse(savedWallet);
        setBalance(parsedWallet.balance);
        
        // Convert string timestamps back to Date objects
        const parsedTransactions = parsedWallet.transactions.map((tx: any) => ({
          ...tx,
          timestamp: new Date(tx.timestamp)
        }));
        
        setTransactions(parsedTransactions);
      } catch (error) {
        console.error('Error parsing wallet data from localStorage:', error);
      }
    }
  }, []);

  // Save wallet data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify({
      balance,
      transactions
    }));
  }, [balance, transactions]);

  const addFunds = (amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a positive amount",
        variant: "destructive",
      });
      return;
    }
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substring(2, 9),
      amount,
      type: 'deposit',
      description: 'Add funds to wallet',
      timestamp: new Date()
    };
    
    setBalance(prevBalance => prevBalance + amount);
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    
    toast({
      title: "Funds Added",
      description: `Successfully added ${amount} UBX to your wallet`,
    });
  };

  const withdraw = (amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a positive amount",
        variant: "destructive",
      });
      return false;
    }
    
    if (balance < amount) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
      return false;
    }
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substring(2, 9),
      amount: -amount,
      type: 'withdrawal',
      description: 'Withdraw funds from wallet',
      timestamp: new Date()
    };
    
    setBalance(prevBalance => prevBalance - amount);
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    
    toast({
      title: "Withdrawal Successful",
      description: `Successfully withdrew ${amount} UBX from your wallet`,
    });
    
    return true;
  };

  const getTransactions = () => {
    return transactions;
  };

  return (
    <WalletContext.Provider value={{ 
      balance, 
      transactions, 
      addFunds,
      withdraw, 
      getTransactions 
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
