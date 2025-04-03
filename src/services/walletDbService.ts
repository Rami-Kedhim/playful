
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Saves a wallet address to the user's profile
 */
export const saveSolanaWallet = async (address: string, userId: string, refreshProfile: () => Promise<void>) => {
  try {
    // First, check if this wallet is already saved
    const { data: existingWallet, error: checkError } = await supabase
      .from('solana_wallets')
      .select('*')
      .eq('user_id', userId)
      .eq('wallet_address', address)
      .maybeSingle();

    // Handle potential error from the query
    if (checkError) {
      throw checkError;
    }

    // If wallet is already saved, just update last_used_at
    if (existingWallet) {
      const { error: updateError } = await supabase
        .from('solana_wallets')
        .update({ last_used_at: new Date().toISOString() })
        .eq('id', existingWallet.id);

      if (updateError) throw updateError;
    } else {
      // Insert new wallet
      const { error: insertError } = await supabase
        .from('solana_wallets')
        .insert({
          user_id: userId,
          wallet_address: address,
          is_primary: true
        });

      if (insertError) throw insertError;
    }

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
    const { data, error } = await supabase
      .from('solana_wallets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
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
    // First, set all wallets as non-primary
    const { error: resetError } = await supabase
      .from('solana_wallets')
      .update({ is_primary: false })
      .eq('user_id', userId);
      
    if (resetError) throw resetError;
    
    // Then set the selected wallet as primary
    const { error: updateError } = await supabase
      .from('solana_wallets')
      .update({ is_primary: true, last_used_at: new Date().toISOString() })
      .eq('id', walletId)
      .eq('user_id', userId);
      
    if (updateError) throw updateError;
    
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
