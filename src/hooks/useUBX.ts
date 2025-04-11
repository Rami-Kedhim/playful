
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { processUBXTransaction, TransactionParams } from '@/services/ubxTransactionService';
import { supabase } from '@/integrations/supabase/client';

export interface UBXPackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  price_sol?: number;
  bonus_amount?: number;
  is_featured?: boolean;
}

export interface UBXHookReturn {
  balance: number;
  isProcessing: boolean;
  processTransaction: (params: Omit<TransactionParams, 'userId'>) => Promise<boolean>;
  error: string | null;
  fetchPackages: () => Promise<UBXPackage[]>;
  purchasePackage: (packageId: string) => Promise<boolean>;
}

/**
 * Hook for UBX token management
 */
export const useUBX = (): UBXHookReturn => {
  const [balance, setBalance] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const processTransaction = async (params: Omit<TransactionParams, 'userId'>): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await processUBXTransaction(params);
      
      if (!result.success) {
        setError(result.error || 'Transaction failed');
        toast({
          title: "Transaction Failed",
          description: result.error || "Could not process UBX transaction",
          variant: "destructive"
        });
        return false;
      }
      
      // Update local balance state
      if (typeof result.newBalance === 'number') {
        setBalance(result.newBalance);
      }
      
      toast({
        title: "Transaction Successful",
        description: result.message || `${params.amount > 0 ? 'Added' : 'Spent'} ${Math.abs(params.amount)} UBX tokens`,
      });
      
      return true;
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred';
      setError(errorMsg);
      
      toast({
        title: "Transaction Error",
        description: errorMsg,
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Fetch available UBX packages
   */
  const fetchPackages = async (): Promise<UBXPackage[]> => {
    try {
      setIsProcessing(true);
      
      // Using a fallback approach since we might not have a table yet
      // In production, this would fetch from a real table
      const packages: UBXPackage[] = [
        {
          id: "pack1",
          name: "Basic Pack",
          amount: 100,
          price: 0,
          price_sol: 0.05,
          bonus_amount: 0,
          is_featured: false
        },
        {
          id: "pack2",
          name: "Standard Pack",
          amount: 500,
          price: 0,
          price_sol: 0.2,
          bonus_amount: 50,
          is_featured: true
        },
        {
          id: "pack3",
          name: "Premium Pack",
          amount: 1000,
          price: 0,
          price_sol: 0.35,
          bonus_amount: 150,
          is_featured: false
        }
      ];
      
      return packages;
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred';
      setError(errorMsg);
      
      toast({
        title: "Error Loading Packages",
        description: errorMsg,
        variant: "destructive"
      });
      
      return [];
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Purchase UBX package
   */
  const purchasePackage = async (packageId: string): Promise<boolean> => {
    try {
      setIsProcessing(true);
      
      // Find the package from fetchPackages
      const packages = await fetchPackages();
      const selectedPackage = packages.find(p => p.id === packageId);
      
      if (!selectedPackage) {
        throw new Error("Package not found");
      }
      
      // Process the transaction
      const success = await processTransaction({
        amount: selectedPackage.amount + (selectedPackage.bonus_amount || 0),
        transactionType: 'purchase',
        description: `Purchased ${selectedPackage.name} package`,
        metadata: { package_id: packageId }
      });
      
      return success;
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred';
      setError(errorMsg);
      
      toast({
        title: "Purchase Failed",
        description: errorMsg,
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    balance,
    isProcessing,
    processTransaction,
    error,
    fetchPackages,
    purchasePackage
  };
};

export default useUBX;
