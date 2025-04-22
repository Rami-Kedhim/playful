
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/auth';

export interface UBXTransaction {
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  metadata?: Record<string, any>;
}

export interface UBXPackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  bonus_amount?: number;
  is_featured?: boolean;
  currency?: string;
}

export const useUBX = () => {
  const [balance, setBalance] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  // Load initial balance from profile if available
  useEffect(() => {
    if (profile) {
      setBalance(profile.ubx_balance || 0);
    }
  }, [profile]);
  
  // Refresh balance
  const refreshBalance = async (): Promise<number> => {
    try {
      if (!user) return 0;
      
      // In a real implementation, fetch updated balance from API
      // For now, we'll use the profile's UBX balance
      const updatedBalance = profile?.ubx_balance || 0;
      setBalance(updatedBalance);
      
      return updatedBalance;
    } catch (error) {
      console.error("Error refreshing UBX balance:", error);
      return balance;
    }
  };
  
  // Process a transaction (credit or debit)
  const processTransaction = async (transaction: UBXTransaction): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to perform this action",
        variant: "destructive",
      });
      return false;
    }
    
    setIsProcessing(true);
    try {
      // In a real implementation, process transaction via API
      // For now, just simulate the transaction locally
      
      // Check if sufficient funds for debit transactions
      if (transaction.type === 'debit' && transaction.amount > balance) {
        toast({
          title: "Insufficient UBX",
          description: "You don't have enough UBX to complete this transaction",
          variant: "destructive",
        });
        return false;
      }
      
      // Update balance locally
      const newBalance = transaction.type === 'credit' 
        ? balance + transaction.amount 
        : balance - transaction.amount;
      
      setBalance(newBalance);
      
      // Add to transactions history
      setTransactions(prev => [
        {
          id: Date.now().toString(),
          ...transaction,
          timestamp: new Date().toISOString(),
        },
        ...prev
      ]);
      
      toast({
        title: "Transaction complete",
        description: `${transaction.amount} UBX ${transaction.type === 'credit' ? 'added to' : 'deducted from'} your account`,
      });
      
      return true;
    } catch (error) {
      console.error("Error processing UBX transaction:", error);
      toast({
        title: "Transaction failed",
        description: "There was an error processing your UBX transaction",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Fetch available UBX packages
  const fetchPackages = async (): Promise<UBXPackage[]> => {
    try {
      // In a real implementation, fetch from API
      // For now, return mock data
      return [
        {
          id: "pkg-basic",
          name: "Basic",
          amount: 100,
          price: 9.99,
          bonus_amount: 0,
          is_featured: false
        },
        {
          id: "pkg-standard",
          name: "Standard",
          amount: 500,
          price: 39.99,
          bonus_amount: 50,
          is_featured: true
        },
        {
          id: "pkg-premium",
          name: "Premium",
          amount: 1200,
          price: 79.99,
          bonus_amount: 200,
          is_featured: false
        }
      ];
    } catch (error) {
      console.error("Error fetching UBX packages:", error);
      return [];
    }
  };
  
  // Purchase a package
  const purchasePackage = async (packageId: string): Promise<boolean> => {
    try {
      const packages = await fetchPackages();
      const selectedPackage = packages.find(pkg => pkg.id === packageId);
      
      if (!selectedPackage) {
        throw new Error("Package not found");
      }
      
      // Process the transaction
      return await processTransaction({
        amount: selectedPackage.amount + (selectedPackage.bonus_amount || 0),
        type: 'credit',
        description: `Purchased ${selectedPackage.name} UBX package`
      });
    } catch (error) {
      console.error("Error purchasing UBX package:", error);
      return false;
    }
  };
  
  return {
    balance,
    transactions,
    processTransaction,
    refreshBalance,
    isProcessing,
    fetchPackages,
    purchasePackage
  };
};

export default useUBX;
