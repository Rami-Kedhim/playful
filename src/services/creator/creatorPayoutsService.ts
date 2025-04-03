
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { PayoutResult, PayoutRequest } from "@/types/creator";

/**
 * Fetch payout history for a creator
 */
export const getCreatorPayouts = async (creatorId: string, page = 1, pageSize = 10): Promise<PayoutResult> => {
  // Return mock payout data since the table doesn't exist yet
  return {
    data: Array(pageSize).fill(null).map((_, i) => ({
      id: `mock-payout-${i}`,
      amount: (Math.random() * 1000).toFixed(2),
      status: ['pending', 'completed', 'processing'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'processing',
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      payout_method: ['bank_transfer', 'paypal', 'crypto'][Math.floor(Math.random() * 3)]
    })),
    totalCount: 30
  };
};

/**
 * Request a payout for a creator
 */
export const requestPayout = async (
  creatorId: string, 
  amount: number, 
  payoutMethod: string, 
  payoutDetails: Record<string, any>
): Promise<any | null> => {
  try {
    // For now return a mock success response
    
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted successfully",
      variant: "default",
    });
    
    return {
      id: `mock-payout-${Date.now()}`,
      creator_id: creatorId,
      amount: amount,
      payout_method: payoutMethod,
      notes: payoutDetails.notes || null,
      status: 'pending',
      requested_at: new Date().toISOString()
    };
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

// Export getCreatorPayouts as fetchCreatorPayouts as well for backward compatibility
export const fetchCreatorPayouts = getCreatorPayouts;
