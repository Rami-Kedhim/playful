
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { BoostPackage } from '@/types/boost';
import { useLucoins } from '@/hooks/useLucoins';

export const useBoostPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // In a real app, this would be integrated with actual wallet logic
  // Fixed to provide default values with optional chaining
  const lucoins = useLucoins?.() || {};
  const balance = lucoins?.balance ?? 1000;
  const deductLucoins = lucoins?.deductLucoins ?? (() => {});

  const purchaseBoost = async (boostPackage: BoostPackage): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user has enough Lucoins
      if (balance < boostPackage.price_lucoin) {
        toast({
          title: "Insufficient funds",
          description: `You need ${boostPackage.price_lucoin} Lucoins to purchase this boost`,
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Deduct Lucoins
      deductLucoins(boostPackage.price_lucoin);
      
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
