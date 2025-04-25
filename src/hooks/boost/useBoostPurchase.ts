
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { BoostPackage } from '@/types/boost';
import { useUBX } from '@/hooks/useUBX';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { validateGlobalPrice, GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';

export const useBoostPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    processTransaction,
    isProcessing: ubxLoading,
    ...ubxData
  } = useUBX();

  const { profile, user } = useAuth();
  // Safely access balance from multiple possible locations
  const userBalance = profile?.ubx_balance ?? 
                     profile?.ubxBalance ?? 
                     user?.ubxBalance ?? 
                     0;

  const purchaseBoost = async (boostPackage: BoostPackage): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      try {
        validateGlobalPrice(boostPackage.price_ubx || 0);
      } catch (validationError: any) {
        toast({
          title: "Oxum Rule Violation",
          description: validationError.message || "The boost price does not comply with Oxum global pricing standards.",
          variant: "destructive"
        });
        return false;
      }

      if (userBalance < GLOBAL_UBX_RATE) {
        toast({
          title: "Insufficient funds",
          description: `You need ${GLOBAL_UBX_RATE} UBX to purchase this boost`,
          variant: "destructive"
        });
        return false;
      }

      await new Promise(resolve => setTimeout(resolve, 1200));

      const success = await processTransaction({
        amount: -GLOBAL_UBX_RATE,
        transaction_type: "boost_purchase", // use transaction_type as per UBXTransaction type
        description: `Purchased ${boostPackage.name} boost`,
      } as any);

      if (!success) throw new Error("Failed to process transaction");

      toast({
        title: "Boost purchased",
        description: `Successfully purchased ${boostPackage.name} for ${GLOBAL_UBX_RATE} UBX`
      });

      return true;
    } catch (err) {
      console.error("Error purchasing boost:", err);
      setError("Failed to process boost purchase");

      toast({
        title: "Purchase failed",
        description: "There was an error processing your boost purchase",
        variant: "destructive"
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    purchaseBoost,
    loading,
    error
  };
};
