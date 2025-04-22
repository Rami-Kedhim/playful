
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface TransactionHistory {
  id: string;
  amount: number;
  transaction_type: string;
  description?: string;
  created_at: string;
}

interface UseUBXReturn {
  balance: number;
  loading: boolean;
  error: string | null;
  isProcessing: boolean;
  getBalance: () => Promise<void>;
  addFunds: (amount: number) => Promise<boolean>;
  getTransactionHistory: () => Promise<TransactionHistory[]>;
  refreshHistory: () => Promise<void>;
  processTransaction: (params: { amount: number; type: string; description?: string }) => Promise<boolean>;
  fetchPackages: () => Promise<any[]>; // add these missing functions with types
  purchasePackage: (packageId: string) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

export const useUBX = (): UseUBXReturn => {
  const { toast } = useToast();
  const [balance, setBalance] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getBalance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate fetch balance - replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      const simulatedBalance = 1000; // or get from user profile
      setBalance(simulatedBalance);
    } catch (err: any) {
      setError("Failed to fetch UBX balance.");
      console.error("getBalance error:", err);
      toast({
        description: "Failed to fetch UBX balance.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const refreshBalance = useCallback(async () => {
    await getBalance();
  }, [getBalance]);

  const addFunds = useCallback(async (amount: number) => {
    setIsProcessing(true);
    try {
      // Simulate adding funds API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBalance((prev) => prev + amount);
      toast({
        description: `${amount} UBX added successfully.`,
      });
      return true;
    } catch (error: any) {
      console.error("Error adding UBX funds:", error);
      toast({
        description: "Failed to add UBX funds.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const getTransactionHistory = useCallback(async (): Promise<TransactionHistory[]> => {
    setLoading(true);
    try {
      // Simulate fetching transaction history - replace with API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockTransactionHistory: TransactionHistory[] = [
        {
          id: "1",
          amount: 100,
          transaction_type: "purchase",
          description: "Purchased UBX Package",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          amount: -50,
          transaction_type: "spend",
          description: "Spent UBX on content",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      setTransactionHistory(mockTransactionHistory);
      return mockTransactionHistory;
    } catch (error: any) {
      console.error("Error fetching UBX transaction history:", error);
      toast({
        description: "Failed to load transaction history.",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const refreshHistory = useCallback(async () => {
    await getTransactionHistory();
  }, [getTransactionHistory]);

  const processTransaction = useCallback(
    async (params: { amount: number; type: string; description?: string }) => {
      setIsProcessing(true);
      try {
        // Simulate processing transaction API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBalance((prev) => prev + params.amount);
        toast({
          description: `Transaction successful: ${params.description || "Processed UBX transaction"}`,
        });
        return true;
      } catch (error) {
        console.error("Error processing UBX transaction:", error);
        toast({
          description: "Failed to process UBX transaction.",
          variant: "destructive",
        });
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [toast]
  );

  // Adding fetchPackages and purchasePackage to fix missing references
  const fetchPackages = useCallback(async (): Promise<any[]> => {
    setLoading(true);
    try {
      // Simulate fetching UBX packages from backend
      await new Promise((resolve) => setTimeout(resolve, 800));
      const packages = [
        {
          id: 'pkg_basic',
          name: 'Basic UBX Package',
          amount: 100,
          bonus_amount: 10,
          price: 9.99,
          is_featured: true
        },
        {
          id: 'pkg_premium',
          name: 'Premium UBX Package',
          amount: 500,
          bonus_amount: 75,
          price: 39.99,
          is_featured: false
        }
      ];
      return packages;
    } catch (error) {
      toast({
        description: "Failed to load UBX packages.",
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const purchasePackage = useCallback(async (packageId: string): Promise<boolean> => {
    setIsProcessing(true);
    try {
      // Simulate purchasing package
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        description: "UBX package purchased successfully.",
      });
      // Suppose that purchasing adds the package amount to balance:
      setBalance((prev) => prev + 100); // Here static for simulation
      return true;
    } catch (error) {
      toast({
        description: "Failed to purchase UBX package.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  useEffect(() => {
    getBalance();
    getTransactionHistory();
  }, [getBalance, getTransactionHistory]);

  return {
    balance,
    loading,
    error,
    isProcessing,
    getBalance,
    refreshBalance,
    addFunds,
    getTransactionHistory,
    refreshHistory,
    processTransaction,
    fetchPackages,
    purchasePackage,
  };
};

export default useUBX;
