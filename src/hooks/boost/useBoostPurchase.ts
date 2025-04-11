
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { BoostPackage } from '@/types/boost';
import { useUBX } from '@/hooks/useUBX';
import { useAuth } from '@/hooks/auth/useAuth';

export const useBoostPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get UBX utilities from our hook
  const {
    processTransaction,
    loading: ubxLoading,
    ...ubxData
  } = useUBX();
  
  // Get the user's profile from the Auth context to access their balance
  const { profile } = useAuth();
  // Access the UBX balance from the profile, with fallback
  const userBalance = profile?.ubx_balance ?? 0;
  
  const purchaseBoost = async (boostPackage: BoostPackage): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user has enough UBX
      if (userBalance < boostPackage.price_ubx) {
        toast({
          title: "Insufficient funds",
          description: `You need ${boostPackage.price_ubx} UBX to purchase this boost`,
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Use the processTransaction method to deduct UBX
      const success = await processTransaction({
        amount: -boostPackage.price_ubx, // Negative amount for spending
        transactionType: "boost_purchase",
        description: `Purchased ${boostPackage.name} boost`
      });
      
      if (!success) {
        throw new Error("Failed to process transaction");
      }
      
      toast({
        title: "Boost purchased",
        description: `Successfully purchased ${boostPackage.name} for ${boostPackage.price_ubx} UBX`
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
