
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface Wallet {
  id: string;
  balance: number;
  currency: string;
  lastUpdated: Date;
  transactions?: WalletTransaction[];
  status: WalletStatus;
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer" | "purchase";
  description: string;
  timestamp: Date;
  status: "pending" | "completed" | "failed";
}

export type WalletStatus = "active" | "suspended" | "pending";

interface WalletContextValue {
  wallet: Wallet | null;
  loading: boolean;
  error: string | null;
  refreshWallet: () => Promise<void>;
  updateBalance: (amount: number) => Promise<boolean>;
}

// Mock data for development
const mockWallet: Wallet = {
  id: "wallet-123",
  balance: 500,
  currency: "UBX",
  lastUpdated: new Date(),
  status: "active",
  transactions: [
    {
      id: "tx1",
      amount: 100,
      type: "deposit",
      description: "Initial deposit",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "completed"
    },
    {
      id: "tx2",
      amount: -50,
      type: "purchase",
      description: "Premium content purchase",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "completed"
    }
  ]
};

/**
 * Hook for managing user wallet operations
 */
export const useWallet = (): WalletContextValue => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch wallet data from API/backend
  const fetchWallet = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would call an API endpoint
      // const response = await api.get('/wallet');
      // setWallet(response.data);
      
      // Using mock data for development
      await new Promise(resolve => setTimeout(resolve, 500));
      setWallet(mockWallet);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch wallet';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Refresh wallet data
  const refreshWallet = useCallback(async () => {
    await fetchWallet();
  }, [fetchWallet]);

  // Update wallet balance
  const updateBalance = useCallback(async (amount: number): Promise<boolean> => {
    setLoading(true);
    
    try {
      // In a real app, this would call an API endpoint
      // const response = await api.post('/wallet/update', { amount });
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setWallet(prevWallet => {
        if (!prevWallet) return null;
        
        return {
          ...prevWallet,
          balance: prevWallet.balance + amount,
          lastUpdated: new Date(),
          transactions: [
            {
              id: `tx-${Date.now()}`,
              amount: amount,
              type: amount > 0 ? "deposit" : "purchase",
              description: amount > 0 ? "Wallet deposit" : "Service purchase",
              timestamp: new Date(),
              status: "completed"
            },
            ...(prevWallet.transactions || [])
          ]
        };
      });
      
      const actionType = amount > 0 ? "deposit" : "purchase";
      toast({
        title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Successful`,
        description: `Your wallet has been ${amount > 0 ? "credited with" : "debited"} ${Math.abs(amount)} UBX`,
      });
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update balance';
      setError(errorMessage);
      toast({
        title: "Transaction Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Initialize wallet on component mount
  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return {
    wallet,
    loading,
    error,
    refreshWallet,
    updateBalance
  };
};

export default useWallet;
