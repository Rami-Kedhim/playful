
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { BoostPackage } from '@/types/boost';
import { useLucoins } from '@/hooks/useLucoins';
import { useAuth } from '@/hooks/auth/useAuth';

export const useBoostPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get lucoin utilities from our hook
  const {
    processLucoinTransaction,
    loading: lucoinsLoading,
    ...lucoinsData
  } = useLucoins();
  
  // Get the user's profile from the Auth context to access their balance
  const { profile } = useAuth();
  // Access the lucoin balance from the profile, with fallback
  const userBalance = profile?.lucoin_balance ?? 0;
  
  const purchaseBoost = async (boostPackage: BoostPackage): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user has enough Lucoins
      if (userBalance < boostPackage.price_lucoin) {
        toast({
          title: "Insufficient funds",
          description: `You need ${boostPackage.price_lucoin} Lucoins to purchase this boost`,
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Use the processLucoinTransaction method to deduct Lucoins
      const success = await processLucoinTransaction({
        amount: -boostPackage.price_lucoin, // Negative amount for spending
        transactionType: "boost_purchase",
        description: `Purchased ${boostPackage.name} boost`
      });
      
      if (!success) {
        throw new Error("Failed to process transaction");
      }
      
      toast({
        title: "Boost purchased",
        description: `Successfully purchased ${boostPackage.name} for ${boostPackage.price_lucoin} Lucoins`
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
