import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { purchaseUBXWithFantom } from "@/services/fantomService";

export interface UBXPackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  price_ftm?: number;
  bonus_amount?: number;
  is_featured?: boolean;
  currency?: string;
}

export interface BoostPackage {
  id: string;
  name: string;
  duration: string;
  price_ubx: number;
  description?: string;
  is_active: boolean;
}

export interface GiftItem {
  id: string;
  name: string;
  description?: string;
  price_ubx: number;
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

export const useUBX = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState<UBXPackage[]>([]);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [giftItems, setGiftItems] = useState<GiftItem[]>([]);
  const { user, refreshProfile } = useAuth();

  /**
   * Fetch available UBX packages from the database
   */
  const fetchPackages = async (): Promise<UBXPackage[]> => {
    try {
      setLoading(true);
      
      // Use direct table query with type assertion
      const { data: optionsData, error: optionsError } = await supabase
        .from('lucoin_package_options' as any)
        .select('*');
      
      if (optionsError) {
        console.error("Error fetching UBX packages:", optionsError);
        
        // Fallback to hardcoded packages if we can't fetch from DB
        const fallbackPackages = [
          {
            id: "pack1",
            name: "Basic Pack",
            amount: 100,
            price: 0,
            price_ftm: 0.05,
            bonus_amount: 0,
            is_featured: false,
            currency: 'FTM'
          },
          {
            id: "pack2",
            name: "Standard Pack",
            amount: 500,
            price: 0,
            price_ftm: 0.2,
            bonus_amount: 50,
            is_featured: true,
            currency: 'FTM'
          },
          {
            id: "pack3",
            name: "Premium Pack",
            amount: 1000,
            price: 0,
            price_ftm: 0.35,
            bonus_amount: 150,
            is_featured: false,
            currency: 'FTM'
          }
        ];
        
        setPackages(fallbackPackages);
        return fallbackPackages;
      }
      
      // Map the data to our expected format
      const packageList: UBXPackage[] = (optionsData || []).map((pkg: any) => ({
        id: pkg.id,
        name: pkg.name,
        amount: pkg.amount,
        price: 0, // We calculate based on FTM price in the UI
        price_ftm: pkg.price_sol, // Map SOL to FTM
        bonus_amount: pkg.bonus_amount,
        is_featured: pkg.is_featured,
        currency: 'FTM'
      }));
      
      setPackages(packageList);
      return packageList;
    } catch (error: any) {
      console.error("Error fetching UBX packages:", error);
      toast({
        title: "Error loading packages",
        description: error.message,
        variant: "destructive",
      });
      
      // Return fallback packages on error
      const fallbackPackages = [
        {
          id: "pack1",
          name: "Basic Pack",
          amount: 100,
          price: 0,
          price_ftm: 0.05,
          bonus_amount: 0,
          is_featured: false,
          currency: 'FTM'
        },
        {
          id: "pack2",
          name: "Standard Pack",
          amount: 500,
          price: 0,
          price_ftm: 0.2,
          bonus_amount: 50,
          is_featured: true,
          currency: 'FTM'
        },
        {
          id: "pack3",
          name: "Premium Pack",
          amount: 1000,
          price: 0,
          price_ftm: 0.35,
          bonus_amount: 150,
          is_featured: false,
          currency: 'FTM'
        }
      ];
      
      setPackages(fallbackPackages);
      return fallbackPackages;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Process a UBX purchase with Fantom
   */
  const purchasePackageWithFantom = async (
    packageId: string, 
    ftmAmount: number, 
    walletAddress: string
  ): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to purchase UBX",
        variant: "destructive",
      });
      return false;
    }

    try {
      setLoading(true);
      
      // Get package details from direct table query with type assertion
      let packageData: any = null;
      
      const { data: packageInfo, error: packageError } = await supabase
        .from('lucoin_package_options' as any)
        .select('*')
        .eq('id', packageId)
        .single();
      
      if (packageError || !packageInfo) {
        console.error("Error fetching package info:", packageError);
        
        // Fallback to using hardcoded data for the selected package
        const packages = await fetchPackages();
        packageData = packages.find(p => p.id === packageId);
        
        if (!packageData) {
          toast({
            title: "Package not found",
            description: "The selected package could not be found",
            variant: "destructive",
          });
          return false;
        }
      } else {
        packageData = packageInfo;
      }
      
      // Process the Fantom transaction
      const { success, transactionId } = await purchaseUBXWithFantom(
        packageId,
        ftmAmount,
        walletAddress
      );
      
      if (!success) {
        return false;
      }
      
      // Record the transaction using direct table insert with type assertion
      await supabase
        .from('lucoin_transactions' as any)
        .insert({
          user_id: user.id,
          amount: packageData.amount + (packageData.bonus_amount || 0),
          transaction_type: 'purchase',
          description: `Purchased ${packageData.name} package with FTM`,
          metadata: { 
            package_id: packageId,
            price_paid_ftm: ftmAmount,
            transaction_id: transactionId,
            currency: 'FTM' 
          }
        });
      
      // Update the user's balance using the increment_balance function
      await supabase.rpc('increment_balance', { 
        user_id: user.id, 
        amount: packageData.amount + (packageData.bonus_amount || 0) 
      });
      
      // Refresh the user profile to get the updated balance
      await refreshProfile();
      
      toast({
        title: "Purchase successful",
        description: `${packageData.amount + (packageData.bonus_amount || 0)} UBX have been added to your account`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Error purchasing UBX:", error);
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
   * Fetch available boost packages
   */
  const fetchBoostPackages = async (): Promise<BoostPackage[]> => {
    try {
      setLoading(true);
      
      // Use direct table query with type assertion
      const { data: boostData, error: boostError } = await supabase
        .from('boost_packages' as any)
        .select('*')
        .eq('is_active', true);
      
      if (boostError) {
        console.error("Error fetching boost packages:", boostError);
        
        // Fallback to hardcoded packages if we can't fetch from DB
        const fallbackBoosts = [
          {
            id: "boost1",
            name: "Daily Boost",
            duration: "24:00:00",
            price_ubx: 50,
            description: "Boost your profile for 24 hours",
            is_active: true
          },
          {
            id: "boost2",
            name: "Weekly Boost",
            duration: "168:00:00",
            price_ubx: 200,
            description: "Boost your profile for 7 days",
            is_active: true
          },
          {
            id: "boost3",
            name: "Monthly Boost",
            duration: "720:00:00",
            price_ubx: 500,
            description: "Boost your profile for 30 days",
            is_active: true
          }
        ];
        
        setBoostPackages(fallbackBoosts);
        return fallbackBoosts;
      }
      
      // Map the data to our expected format
      const boostList: BoostPackage[] = (boostData || []).map((pkg: any) => ({
        id: pkg.id,
        name: pkg.name,
        duration: pkg.duration,
        price_ubx: pkg.price,
        description: pkg.description,
        is_active: pkg.is_active
      }));
      
      setBoostPackages(boostList);
      return boostList;
    } catch (error: any) {
      console.error("Error fetching boost packages:", error);
      toast({
        title: "Error loading boost packages",
        description: error.message,
        variant: "destructive",
      });
      
      // Return fallback packages on error
      const fallbackBoosts = [
        {
          id: "boost1",
          name: "Daily Boost",
          duration: "24:00:00",
          price_ubx: 50,
          description: "Boost your profile for 24 hours",
          is_active: true
        },
        {
          id: "boost2",
          name: "Weekly Boost",
          duration: "168:00:00",
          price_ubx: 200,
          description: "Boost your profile for 7 days",
          is_active: true
        },
        {
          id: "boost3",
          name: "Monthly Boost",
          duration: "720:00:00",
          price_ubx: 500,
          description: "Boost your profile for 30 days",
          is_active: true
        }
      ];
      
      setBoostPackages(fallbackBoosts);
      return fallbackBoosts;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch available gift items
   */
  const fetchGiftItems = async (): Promise<GiftItem[]> => {
    try {
      setLoading(true);
      
      // Use direct table query with type assertion
      const { data: giftData, error: giftError } = await supabase
        .from('gift_items' as any)
        .select('*')
        .eq('is_active', true);
      
      if (giftError) {
        console.error("Error fetching gift items:", giftError);
        
        // Fallback to hardcoded gifts if we can't fetch from DB
        const fallbackGifts = [
          {
            id: "gift1",
            name: "Rose",
            description: "A beautiful rose for a beautiful person",
            price_ubx: 20,
            animation_url: "/gifts/rose.gif",
            thumbnail_url: "/gifts/rose_thumb.png",
            is_active: true
          },
          {
            id: "gift2",
            name: "Heart",
            description: "Show your appreciation with a heart",
            price_ubx: 50,
            animation_url: "/gifts/heart.gif",
            thumbnail_url: "/gifts/heart_thumb.png",
            is_active: true
          },
          {
            id: "gift3",
            name: "Diamond",
            description: "For someone truly special",
            price_ubx: 100,
            animation_url: "/gifts/diamond.gif",
            thumbnail_url: "/gifts/diamond_thumb.png",
            is_active: true
          }
        ];
        
        setGiftItems(fallbackGifts);
        return fallbackGifts;
      }
      
      // Map the data to our expected format
      const giftsList: GiftItem[] = (giftData || []).map((gift: any) => ({
        id: gift.id,
        name: gift.name,
        description: gift.description,
        price_ubx: gift.price_lucoin,
        animation_url: gift.animation_url,
        thumbnail_url: gift.thumbnail_url,
        is_active: gift.is_active
      }));
      
      setGiftItems(giftsList);
      return giftsList;
    } catch (error: any) {
      console.error("Error fetching gift items:", error);
      toast({
        title: "Error loading gift items",
        description: error.message,
        variant: "destructive",
      });
      
      // Return fallback gifts on error
      const fallbackGifts = [
        {
          id: "gift1",
          name: "Rose",
          description: "A beautiful rose for a beautiful person",
          price_ubx: 20,
          animation_url: "/gifts/rose.gif",
          thumbnail_url: "/gifts/rose_thumb.png",
          is_active: true
        },
        {
          id: "gift2",
          name: "Heart",
          description: "Show your appreciation with a heart",
          price_ubx: 50,
          animation_url: "/gifts/heart.gif",
          thumbnail_url: "/gifts/heart_thumb.png",
          is_active: true
        },
        {
          id: "gift3",
          name: "Diamond",
          description: "For someone truly special",
          price_ubx: 100,
          animation_url: "/gifts/diamond.gif",
          thumbnail_url: "/gifts/diamond_thumb.png",
          is_active: true
        }
      ];
      
      setGiftItems(fallbackGifts);
      return fallbackGifts;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Purchase a boost package with UBX
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
      if (error.message.includes("Insufficient UBX balance")) {
        toast({
          title: "Insufficient UBX",
          description: "You don't have enough UBX to purchase this boost.",
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
      if (error.message.includes("Insufficient UBX balance")) {
        toast({
          title: "Insufficient UBX",
          description: "You don't have enough UBX to send this gift.",
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

  // Fetch transaction history
  const getTransactionHistory = async (): Promise<TransactionHistory[]> => {
    if (!user) {
      return [];
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('lucoin_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
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
  
  // Process a transaction
  const processTransaction = async (params: {
    amount: number,
    transactionType: string,
    description: string,
    metadata?: any
  }): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to perform this action",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('lucoin_transactions')
        .insert({
          user_id: user.id,
          amount: params.amount, 
          transaction_type: params.transactionType,
          description: params.description,
          metadata: params.metadata || {}
        });
        
      if (error) throw error;
      
      // Refresh the user profile to get the updated balance
      await refreshProfile();
      
      return true;
    } catch (error: any) {
      console.error("Error processing transaction:", error);
      toast({
        title: "Transaction failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchPackages,
    purchasePackage: async (packageId: string) => {
      // Implementation kept similar, but references updated to UBX
      try {
        setLoading(true);
        
        // Find the package in our local state
        const selectedPackage = packages.find(p => p.id === packageId);
        
        if (!selectedPackage) {
          toast({
            title: "Package not found",
            description: "The selected package could not be found",
            variant: "destructive",
          });
          return false;
        }
        
        // Record the transaction
        const { error: transactionError } = await supabase
          .from('lucoin_transactions' as any)
          .insert({
            user_id: user?.id,
            amount: selectedPackage.amount + (selectedPackage.bonus_amount || 0),
            transaction_type: 'purchase',
            description: `Purchased ${selectedPackage.name} package`,
            metadata: { 
              package_id: packageId,
              price_paid: selectedPackage.price,
              currency: selectedPackage.currency || 'USD' 
            }
          });
        
        if (transactionError) throw transactionError;
        
        // Update the user's balance
        const { data, error: balanceError } = await supabase
          .rpc('increment_balance' as any, { 
            user_id: user?.id, 
            amount: selectedPackage.amount + (selectedPackage.bonus_amount || 0) 
          }) as any;
          
        if (balanceError) throw balanceError;
        
        // Refresh the user profile to get the updated balance
        await refreshProfile();
        
        toast({
          title: "Purchase successful",
          description: `${selectedPackage.amount + (selectedPackage.bonus_amount || 0)} UBX have been added to your account`,
        });
        
        return true;
      } catch (error: any) {
        console.error("Error purchasing UBX:", error);
        toast({
          title: "Purchase failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    getTransactionHistory,
    processTransaction,
    fetchBoostPackages,
    fetchGiftItems,
    purchaseBoost,
    isProfileBoosted,
    sendGift,
    purchasePackageWithFantom
  };
};

export default useUBX;
