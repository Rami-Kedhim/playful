
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/hooks/use-toast';

interface UBXTransaction {
  amount: number;
  transactionType: string;
  description?: string;
  metadata?: Record<string, any>;
}

interface UBXTransactionResult {
  success: boolean;
  newBalance?: number;
  error?: string;
}

export const useUBX = () => {
  const { user, updateUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [balance, setBalance] = useState<number>(user?.ubxBalance || 0);
  const [transactions, setTransactions] = useState<any[]>([]);
  
  const refreshBalance = async () => {
    if (!user) return;
    
    try {
      // In a real app, this would fetch from an API
      // For now, just use the user's current balance
      setBalance(user.ubxBalance || 0);
      return user.ubxBalance || 0;
    } catch (error) {
      console.error('Error refreshing UBX balance:', error);
      return balance;
    }
  };
  
  const processTransaction = async (transaction: UBXTransaction): Promise<boolean> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You need to be logged in to perform this transaction',
        variant: 'destructive'
      });
      return false;
    }
    
    setIsProcessing(true);
    
    try {
      // Check if user has enough balance for a debit transaction
      if (transaction.amount < 0) {
        const currentBalance = user.ubxBalance || 0;
        if (currentBalance < Math.abs(transaction.amount)) {
          toast({
            title: 'Insufficient funds',
            description: `You need ${Math.abs(transaction.amount)} UBX to complete this transaction`,
            variant: 'destructive'
          });
          return false;
        }
      }
      
      // In a real app, this would call an API
      // For now, just simulate a transaction
      const newBalance = (user.ubxBalance || 0) + transaction.amount;
      
      // Update local state
      setBalance(newBalance);
      
      // Update user object
      await updateUser({ ubxBalance: newBalance });
      
      // Add to transaction history
      setTransactions(prev => [
        {
          id: Date.now().toString(),
          amount: transaction.amount,
          type: transaction.transactionType,
          description: transaction.description,
          timestamp: new Date().toISOString()
        },
        ...prev
      ]);
      
      // Show success message for significant transactions
      if (Math.abs(transaction.amount) > 10) {
        toast({
          title: transaction.amount > 0 ? 'Funds received' : 'Payment successful',
          description: `${Math.abs(transaction.amount)} UBX ${transaction.amount > 0 ? 'added to' : 'deducted from'} your wallet`,
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error processing UBX transaction:', error);
      
      toast({
        title: 'Transaction failed',
        description: 'There was an error processing your transaction',
        variant: 'destructive'
      });
      
      return false;
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    balance,
    transactions,
    processTransaction,
    refreshBalance,
    isProcessing
  };
};

export default useUBX;
