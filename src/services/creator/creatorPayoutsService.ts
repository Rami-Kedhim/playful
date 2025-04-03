
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { PayoutResult, CreatorPayout } from "@/types/creator";

/**
 * Fetch payout history for a creator
 */
export const fetchCreatorPayouts = async (
  creatorId: string, 
  page = 1, 
  pageSize = 10
): Promise<PayoutResult> => {
  try {
    // Calculate the range for pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Fetch payouts from the database
    const { data, error, count } = await supabase
      .from('creator_payouts')
      .select('*', { count: 'exact' })
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error("Error fetching payouts:", error);
      throw error;
    }
    
    // If no results, return mock data for the demo
    if (!data || data.length === 0) {
      return {
        data: Array(3).fill(null).map((_, i) => ({
          id: `mock-payout-${i}`,
          amount: (Math.random() * 1000).toFixed(2),
          status: ['pending', 'completed', 'processing'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'processing',
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
          payout_method: ['bank_transfer', 'paypal', 'crypto'][Math.floor(Math.random() * 3)]
        })),
        totalCount: 3
      };
    }
    
    return {
      data: data as CreatorPayout[],
      totalCount: count || 0
    };
  } catch (error) {
    console.error("Error in fetchCreatorPayouts:", error);
    // Return mock data in case of error (for the demo)
    return {
      data: [],
      totalCount: 0
    };
  }
};

/**
 * Request a payout for a creator
 */
export const requestPayout = async (
  creatorId: string, 
  amount: number, 
  payoutMethod: string, 
  payoutDetails: Record<string, any>
): Promise<CreatorPayout | null> => {
  try {
    // Create the payout record in the database
    const { data, error } = await supabase
      .from('creator_payouts')
      .insert([{
        creator_id: creatorId,
        amount,
        payout_method: payoutMethod,
        notes: payoutDetails.notes || null,
        status: 'pending'
      }])
      .select()
      .single();
    
    if (error) {
      console.error("Error requesting payout:", error);
      throw error;
    }
    
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted successfully",
      variant: "default",
    });
    
    return data as CreatorPayout;
  } catch (error: any) {
    console.error("Error requesting payout:", error);
    
    toast({
      title: "Failed to request payout",
      description: error.message || "An error occurred while processing your request",
      variant: "destructive",
    });
    
    return null;
  }
};

/**
 * Get summary of earnings for a creator
 */
export const getCreatorEarningsSummary = async (creatorId: string) => {
  try {
    // In a real implementation, you would calculate this from actual data
    // For now, returning mock data
    return {
      total: 2347.85,
      available: 1250.42,
      pending: 567.25,
      thisMonth: 892.15
    };
  } catch (error) {
    console.error("Error getting earnings summary:", error);
    
    // Return default values in case of error
    return {
      total: 0,
      available: 0,
      pending: 0,
      thisMonth: 0
    };
  }
};

// Export the functions
export { fetchCreatorPayouts as getCreatorPayouts };
