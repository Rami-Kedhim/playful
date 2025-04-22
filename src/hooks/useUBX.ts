
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
  getBalance: () => Promise<void>;
  addFunds: (amount: number) => Promise<boolean>;
  getTransactionHistory: () => Promise<TransactionHistory[]>;
  refreshHistory: () => Promise<void>;
  processTransaction: (params: { amount: number; type: string; description?: string }) => Promise<boolean>;
}

export const useUBX = (): UseUBXReturn => {
  const { toast } = useToast();
  const [balance, setBalance] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  const addFunds = useCallback(async (amount: number) => {
    setLoading(true);
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
      setLoading(false);
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
      setLoading(true);
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
        setLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    getBalance();
    getTransactionHistory();
  }, [getBalance, getTransactionHistory]);

  return {
    balance,
    loading,
    error,
    getBalance,
    addFunds,
    getTransactionHistory,
    refreshHistory,
    processTransaction,
  };
};

export default useUBX;

