
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Saves a wallet address to the user's profile
 */
export const saveSolanaWallet = async (address: string, userId: string, refreshProfile: () => Promise<void>) => {
  try {
    // Instead of directly accessing the table, use a stored procedure/function
    const { data, error } = await supabase.rpc('save_solana_wallet', {
      p_address: address,
      p_user_id: userId
    });

    if (error) throw error;

    // Refresh user profile to get updated data
    await refreshProfile();
    return true;
  } catch (error: any) {
    console.error("Error saving wallet address:", error);
    toast({
      title: "Failed to save wallet",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

/**
 * Fetches all Solana wallets for a user
 */
export const getUserSolanaWallets = async (userId: string) => {
  try {
    // Use RPC function instead of direct table access
    const { data, error } = await supabase.rpc('get_user_solana_wallets', {
      p_user_id: userId
    });
      
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error("Error fetching user wallets:", error);
    return [];
  }
};

/**
 * Sets a wallet as the primary wallet for a user
 */
export const setPrimaryWallet = async (walletId: string, userId: string) => {
  try {
    // Use RPC function instead of direct table access
    const { error } = await supabase.rpc('set_primary_wallet', {
      p_wallet_id: walletId,
      p_user_id: userId
    });
      
    if (error) throw error;
    
    return true;
  } catch (error: any) {
    console.error("Error setting primary wallet:", error);
    toast({
      title: "Failed to update wallet",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};
