
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Saves a wallet address to the user's profile
 */
export const saveSolanaWallet = async (address: string, userId: string, refreshProfile: () => Promise<void>) => {
  try {
    // Insert directly into the solana_wallets table
    const { data, error } = await supabase
      .from('solana_wallets')
      .insert({
        user_id: userId,
        wallet_address: address,
        is_primary: false
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
    // Get wallets directly from the table
    const { data, error } = await supabase
      .from('solana_wallets')
      .select('*')
      .eq('user_id', userId);
      
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
    // First, set all wallets to non-primary
    const { error: updateError } = await supabase
      .from('solana_wallets')
      .update({ is_primary: false })
      .eq('user_id', userId);
      
    if (updateError) throw updateError;
    
    // Then, set the selected wallet as primary
    const { error } = await supabase
      .from('solana_wallets')
      .update({ is_primary: true })
      .eq('id', walletId)
      .eq('user_id', userId);
      
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
