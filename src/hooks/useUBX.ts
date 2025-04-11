
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { processUBXTransaction, TransactionParams } from '@/services/ubxTransactionService';

export interface UBXHookReturn {
  balance: number;
  isProcessing: boolean;
  processTransaction: (params: Omit<TransactionParams, 'userId'>) => Promise<boolean>;
  error: string | null;
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

  return {
    balance,
    isProcessing,
    processTransaction,
    error
  };
};

export default useUBX;
