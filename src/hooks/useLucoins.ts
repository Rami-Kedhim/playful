import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { purchaseLucoinsWithSol } from "@/services/solanaService";

export interface LucoinPackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  price_sol?: number;
  bonus_amount?: number;
  is_featured?: boolean;
  currency?: string;
}

export interface BoostPackage {
  id: string;
  name: string;
  duration: string;
  price_lucoin: number;
  description?: string;
  is_active: boolean;
}

export interface GiftItem {
  id: string;
  name: string;
  description?: string;
  price_lucoin: number;
  animation_url: string;
  thumbnail_url?: string;
  is_active: boolean;
}

export interface TransactionHistory {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: string;
  description?: string;
  created_at: string;
  metadata?: any;
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
      
      // First try to get packages from the lucoin_package_options table
      const { data: optionsData, error: optionsError } = await supabase
        .from('lucoin_package_options')
        .select('*')
        .eq('is_active', true)
        .order('amount', { ascending: true });
      
      if (optionsError) {
        // Fallback to the old lucoin_packages table if the new one doesn't exist yet
        const { data, error } = await supabase
          .from('lucoin_packages')
          .select('*')
          .eq('is_active', true)
          .order('amount', { ascending: true });
        
        if (error) throw error;
        return data || [];
      }
      
      // Map the data to match the LucoinPackage interface
      const packages: LucoinPackage[] = optionsData.map((pkg: any) => ({
        id: pkg.id,
        name: pkg.name,
        amount: pkg.amount,
        price: 0, // We'll calculate this based on SOL price in the UI
        price_sol: pkg.price_sol,
        bonus_amount: pkg.bonus_amount,
        is_featured: pkg.is_featured,
        currency: 'SOL'
      }));
      
      return packages;
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
   * Fetch available boost packages from the database
   */
  const fetchBoostPackages = async (): Promise<BoostPackage[]> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('boost_packages')
        .select('*')
        .eq('is_active', true)
        .order('price_lucoin', { ascending: true });
      
      if (error) throw error;
      
      // Convert the data to match the BoostPackage interface
      const packages: BoostPackage[] = (data || []).map((pkg: any) => ({
        id: pkg.id,
        name: pkg.name,
        duration: pkg.duration,
        price_lucoin: pkg.price || 0, // Map 'price' to 'price_lucoin'
        description: pkg.description,
        is_active: pkg.is_active
      }));
      
      return packages;
    } catch (error: any) {
      console.error("Error fetching boost packages:", error);
      toast({
        title: "Error loading boost packages",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch available gift items from the database
   */
  const fetchGiftItems = async (): Promise<GiftItem[]> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gift_items' as any)
        .select('*')
        .eq('is_active', true)
        .order('price_lucoin', { ascending: true });
      
      if (error) throw error;
      
      // Convert the data to match the GiftItem interface
      const gifts: GiftItem[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price_lucoin: item.price_lucoin,
        animation_url: item.animation_url,
        thumbnail_url: item.thumbnail_url,
        is_active: item.is_active
      }));
      
      return gifts;
    } catch (error: any) {
      console.error("Error fetching gift items:", error);
      toast({
        title: "Error loading gifts",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * Process a Lucoin purchase with SOL
   */
  const purchasePackageWithSol = async (
    packageId: string, 
    solAmount: number, 
    walletAddress: string
  ): Promise<boolean> => {
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
      
      // Get package details
      const { data: packageData, error: packageError } = await supabase
        .from('lucoin_packages')
        .select('*')
        .eq('id', packageId)
        .single();
      
      if (packageError) {
        // Try alternate table if the first one fails
        const { data: altPackageData, error: altPackageError } = await supabase
          .from('lucoin_package_options')
          .select('*')
          .eq('id', packageId)
          .single();
          
        if (altPackageError) throw new Error("Package not found");
        
        if (!altPackageData) {
          toast({
            title: "Package not found",
            description: "The selected package could not be found",
            variant: "destructive",
          });
          return false;
        }
        
        // Use the alternate package data
        packageData = altPackageData;
      }
      
      if (!packageData) {
        toast({
          title: "Package not found",
          description: "The selected package could not be found",
          variant: "destructive",
        });
        return false;
      }
      
      // Process the Solana transaction
      const { success, transactionId } = await purchaseLucoinsWithSol(
        packageId,
        solAmount,
        walletAddress
      );
      
      if (!success) {
        return false;
      }
      
      // Record the transaction
      const { error: transactionError } = await supabase
        .from('lucoin_transactions')
        .insert({
          user_id: user.id,
          amount: packageData.amount + (packageData.bonus_amount || 0),
          transaction_type: 'purchase',
          description: `Purchased ${packageData.name} package with SOL`,
          metadata: { 
            package_id: packageId,
            price_paid_sol: solAmount,
            transaction_id: transactionId,
            currency: 'SOL' 
          }
        });
      
      if (transactionError) throw transactionError;
      
      // Update the user's balance using the increment_balance function
      const { data, error: balanceError } = await supabase
        .rpc('increment_balance', { 
          user_id: user.id, 
          amount: packageData.amount + (packageData.bonus_amount || 0) 
        });
        
      if (balanceError) throw balanceError;
      
      // Refresh the user profile to get the updated balance
      await refreshProfile();
      
      toast({
        title: "Purchase successful",
        description: `${packageData.amount + (packageData.bonus_amount || 0)} Lucoins have been added to your account`,
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
      
      // Update the user's balance using the increment_balance function
      const { data, error: balanceError } = await supabase
        .rpc('increment_balance', { 
          user_id: user.id, 
          amount: packageData.amount + (packageData.bonus_amount || 0) 
        });
        
      if (balanceError) throw balanceError;
      
      // Refresh the user profile to get the updated balance
      await refreshProfile();
      
      toast({
        title: "Purchase successful",
        description: `${packageData.amount + (packageData.bonus_amount || 0)} Lucoins have been added to your account`,
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
   * Purchase a boost package with Lucoins
   */
  const purchaseBoost = async (boostPackageId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to purchase a boost",
        variant: "destructive",
      });
      return false;
    }

    try {
      setLoading(true);
      
      // Use a custom function call since the RPC function name isn't in the TypeScript types yet
      const { data, error } = await supabase.rpc('purchase_profile_boost' as any, {
        p_user_id: user.id,
        p_boost_package_id: boostPackageId
      });
      
      if (error) throw error;
      
      // Refresh the user profile to get the updated balance
      await refreshProfile();
      
      toast({
        title: "Boost activated",
        description: "Your profile boost has been activated successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error purchasing boost:", error);
      
      // Check for specific error messages
      if (error.message.includes("Insufficient Lucoin balance")) {
        toast({
          title: "Insufficient Lucoins",
          description: "You don't have enough Lucoins to purchase this boost.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Boost purchase failed",
          description: error.message,
          variant: "destructive",
        });
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a gift to another user
   */
  const sendGift = async (receiverId: string, giftId: string, message?: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to send gifts",
        variant: "destructive",
      });
      return false;
    }

    try {
      setLoading(true);
      
      // Use a custom function call since the RPC function name isn't in the TypeScript types yet
      const { data, error } = await supabase.rpc('process_gift_transaction' as any, {
        p_sender_id: user.id,
        p_receiver_id: receiverId,
        p_gift_id: giftId,
        p_message: message || null
      });
      
      if (error) throw error;
      
      // Refresh the user profile to get the updated balance
      await refreshProfile();
      
      toast({
        title: "Gift sent",
        description: "Your gift has been sent successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error sending gift:", error);
      
      // Check for specific error messages
      if (error.message.includes("Insufficient Lucoin balance")) {
        toast({
          title: "Insufficient Lucoins",
          description: "You don't have enough Lucoins to send this gift.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Gift sending failed",
          description: error.message,
          variant: "destructive",
        });
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check if a profile is currently boosted
   */
  const isProfileBoosted = async (profileId: string): Promise<boolean> => {
    try {
      // Use a custom function call since the RPC function name isn't in the TypeScript types yet
      const { data, error } = await supabase.rpc('is_profile_boosted' as any, {
        profile_id: profileId
      });
      
      if (error) throw error;
      
      // Explicitly cast the result to boolean
      return !!data;
    } catch (error: any) {
      console.error("Error checking boost status:", error);
      return false;
    }
  };

  /**
   * Get transaction history for the current user
   */
  const getTransactionHistory = async (): Promise<TransactionHistory[]> => {
    if (!user) return [];
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lucoin_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Convert the data to match the TransactionHistory interface
      const transactions: TransactionHistory[] = (data || []).map((tx: any) => ({
        id: tx.id,
        user_id: tx.user_id,
        amount: tx.amount,
        transaction_type: tx.transaction_type,
        description: tx.description,
        created_at: tx.created_at,
        metadata: tx.metadata
      }));
      
      return transactions;
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
    purchasePackageWithSol,
    getTransactionHistory,
    fetchBoostPackages,
    purchaseBoost,
    isProfileBoosted,
    fetchGiftItems,
    sendGift
  };
};
