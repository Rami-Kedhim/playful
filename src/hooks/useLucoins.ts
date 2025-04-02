
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export interface LucoinPackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  bonus_amount?: number;
  is_featured?: boolean;
  currency?: string;
}

export const useLucoins = () => {
  const [loading, setLoading] = useState(false);
  const { user, refreshProfile } = useAuth();

  /**
   * Fetch available Lucoin packages from the database
   */
  const fetchPackages = async (): Promise<LucoinPackage[]> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lucoin_packages')
        .select('*')
        .eq('is_active', true)
        .order('amount', { ascending: true });
      
      if (error) throw error;
      
      return data || [];
    } catch (error: any) {
      console.error("Error fetching lucoin packages:", error);
      toast({
        title: "Error loading packages",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * Process a Lucoin purchase
   */
  const purchasePackage = async (packageId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to purchase Lucoins",
        variant: "destructive",
      });
      return false;
    }

    try {
      setLoading(true);
      
      // In a real implementation, this would integrate with a payment provider
      // and then create a transaction record and update the user's balance
      
      // For this example, we'll directly create a simulated transaction
      const { data: packageData, error: packageError } = await supabase
        .from('lucoin_packages')
        .select('*')
        .eq('id', packageId)
        .single();
      
      if (packageError) throw packageError;
      
      if (!packageData) {
        toast({
          title: "Package not found",
          description: "The selected package could not be found",
          variant: "destructive",
        });
        return false;
      }
      
      // Record the transaction
      const { error: transactionError } = await supabase
        .from('lucoin_transactions')
        .insert({
          user_id: user.id,
          amount: packageData.amount + (packageData.bonus_amount || 0),
          transaction_type: 'purchase',
          description: `Purchased ${packageData.name} package`,
          metadata: { 
            package_id: packageId,
            price_paid: packageData.price,
            currency: packageData.currency || 'USD' 
          }
        });
      
      if (transactionError) throw transactionError;
      
      // Update the user's balance
      const totalAmount = packageData.amount + (packageData.bonus_amount || 0);
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          lucoin_balance: supabase.rpc('increment', { 
            x: totalAmount,
            row_id: user.id,
            column_name: 'lucoin_balance'
          })
        })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      
      // Refresh the user profile to get the updated balance
      await refreshProfile();
      
      toast({
        title: "Purchase successful",
        description: `${totalAmount} Lucoins have been added to your account`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Error purchasing lucoins:", error);
      toast({
        title: "Purchase failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get transaction history for the current user
   */
  const getTransactionHistory = async () => {
    if (!user) return [];
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lucoin_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    } catch (error: any) {
      console.error("Error fetching transaction history:", error);
      toast({
        title: "Error loading transactions",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { 
    loading, 
    fetchPackages, 
    purchasePackage, 
    getTransactionHistory 
  };
};
