
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Saves a wallet address to the user's profile
 */
export const saveSolanaWallet = async (address: string, userId: string, refreshProfile: () => Promise<void>) => {
  try {
    // First, check if this wallet is already saved
    const { data, error: checkError } = await supabase
      .from('solana_wallets' as any)
      .select('*')
      .eq('user_id', userId)
      .eq('wallet_address', address)
      .single();

    // Handle potential error from the single() call
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    // If wallet is already saved, just update last_used_at
    if (data) {
      const { error: updateError } = await supabase
        .from('solana_wallets' as any)
        .update({ last_used_at: new Date().toISOString() })
        .eq('id', data.id);

      if (updateError) throw updateError;
    } else {
      // Insert new wallet
      const { error: insertError } = await supabase
        .from('solana_wallets' as any)
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
