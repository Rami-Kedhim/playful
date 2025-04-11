
import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  simulateSolanaTransaction, 
  processUbxPurchase, 
  getSolanaTransactionDetails 
} from '@/services/solanaService';
import { useAuth } from '@/contexts/AuthContext';

interface TransactionResult {
  success: boolean;
  message: string;
  transactionId?: string;
  ubxAmount?: number;
}

export const useUbxTransactions = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user, refreshProfile } = useAuth();

  const purchaseUbxWithSolana = useCallback(async (
    amount: number,
    packageId: string
  ): Promise<TransactionResult> => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to purchase UBX tokens",
        variant: "destructive",
      });
      return { success: false, message: "Authentication required" };
    }

    setIsProcessing(true);
    
    try {
      // 1. Simulate the Solana transaction
      const { success, txId } = await simulateSolanaTransaction(amount, `Purchase ${amount} UBX`);
      
      if (!success || !txId) {
        throw new Error("Transaction failed");
      }
      
      // 2. Process the UBX purchase on our backend
      const result = await processUbxPurchase(user.id, packageId, amount);
      
      if (!result.success) {
        throw new Error(result.message || "Failed to process purchase");
      }
      
      // 3. Refresh the user profile to update UBX balance
      await refreshProfile();
      
      toast({
        title: "Purchase successful",
        description: `You have purchased ${result.ubxAmount} UBX tokens`,
      });
      
      return {
        success: true,
        message: `Successfully purchased ${result.ubxAmount} UBX tokens`,
        transactionId: txId,
        ubxAmount: result.ubxAmount
      };
    } catch (error: any) {
      console.error("UBX purchase error:", error);
      
      toast({
        title: "Purchase failed",
        description: error.message || "There was a problem processing your purchase",
        variant: "destructive",
      });
      
      return {
        success: false,
        message: error.message || "Purchase failed"
      };
    } finally {
      setIsProcessing(false);
    }
  }, [user, toast, refreshProfile]);

  return {
    purchaseUbxWithSolana,
    isProcessing
  };
};
