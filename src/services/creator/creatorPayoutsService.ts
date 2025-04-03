
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fetch payout history for a creator
 */
export const getCreatorPayouts = async (creatorId: string, page = 1, pageSize = 10) => {
  // Return mock payout data since the table doesn't exist yet
  return {
    data: Array(pageSize).fill(null).map((_, i) => ({
      id: `mock-payout-${i}`,
      amount: (Math.random() * 1000).toFixed(2),
      status: ['pending', 'completed', 'processing'][Math.floor(Math.random() * 3)],
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      payout_method: ['bank_transfer', 'paypal', 'crypto'][Math.floor(Math.random() * 3)]
    })),
    totalCount: 30
  };
};

/**
 * Request a payout for a creator
 */
export const requestPayout = async (creatorId: string, amount: number, payoutMethod: string, payoutDetails: any) => {
  try {
    // Create payout request in database
    const { data, error } = await supabase
      .from('creator_payouts')
      .insert({
        creator_id: creatorId,
        amount: amount,
        payout_method: payoutMethod,
        notes: payoutDetails.notes || null,
        status: 'pending',
        requested_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted successfully",
      variant: "default",
    });
    
    return data;
  } catch (error: any) {
    console.error("Error requesting payout:", error);
    toast({
      title: "Failed to request payout",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

// Export getCreatorPayouts as fetchCreatorPayouts as well to fix the import error
export const fetchCreatorPayouts = getCreatorPayouts;
