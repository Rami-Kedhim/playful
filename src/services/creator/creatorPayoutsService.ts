
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { CreatorPayout, PayoutRequest, PayoutResult } from "@/types/creator";

/**
 * Fetch payout statistics for a creator
 */
export const getCreatorPayouts = async (creatorId: string): Promise<{
  total: string;
  pending: string;
  completed: string;
}> => {
  try {
    // Query creator payouts from Supabase
    const { data, error } = await supabase
      .from('creator_payouts')
      .select('amount, status')
      .eq('creator_id', creatorId);
    
    if (error) {
      console.error("Error fetching creator payouts:", error);
      throw error;
    }
    
    let total = 0;
    let pending = 0;
    let completed = 0;
    
    if (data && data.length > 0) {
      data.forEach(payout => {
        const amount = parseFloat(payout.amount as unknown as string);
        total += amount;
        
        if (payout.status === 'pending') {
          pending += amount;
        } else if (payout.status === 'completed') {
          completed += amount;
        }
      });
    } else {
      // Return mock data if no payouts found
      return {
        total: "1250.00",
        pending: "450.00",
        completed: "800.00"
      };
    }
    
    return {
      total: total.toFixed(2),
      pending: pending.toFixed(2),
      completed: completed.toFixed(2)
    };
  } catch (error) {
    console.error("Error fetching creator payout stats:", error);
    return {
      total: "0.00",
      pending: "0.00",
      completed: "0.00"
    };
  }
};

/**
 * Fetch payout history for a creator
 */
export const fetchCreatorPayouts = async (
  creatorId: string,
  page = 1,
  pageSize = 10
): Promise<PayoutResult> => {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Query payouts with pagination
    const { data, error, count } = await supabase
      .from('creator_payouts')
      .select('*', { count: 'exact' })
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error("Error fetching creator payouts:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      // Generate mock data if no payouts found
      const mockData: CreatorPayout[] = Array(5).fill(null).map((_, i) => ({
        id: `payout-${i}`,
        amount: (Math.random() * 500 + 50).toFixed(2),
        status: ['pending', 'completed', 'processing'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'processing',
        created_at: new Date(Date.now() - i * 86400000 * 7).toISOString(),
        payout_method: ['bank_transfer', 'paypal', 'crypto'][Math.floor(Math.random() * 3)]
      }));
      
      return {
        data: mockData,
        totalCount: mockData.length
      };
    }
    
    // Convert Supabase data to CreatorPayout type
    const payouts: CreatorPayout[] = data.map(item => ({
      id: item.id,
      amount: item.amount.toString(), // Convert number to string to match CreatorPayout type
      status: item.status as 'pending' | 'completed' | 'processing',
      created_at: item.created_at,
      payout_method: item.payout_method
    }));
    
    return {
      data: payouts,
      totalCount: count || payouts.length
    };
  } catch (error) {
    console.error("Error fetching creator payouts:", error);
    return { data: [], totalCount: 0 };
  }
};

/**
 * Request a new payout
 */
export const requestPayout = async (
  request: PayoutRequest
): Promise<{ success: boolean; data?: CreatorPayout; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('creator_payouts')
      .insert([{
        creator_id: request.creatorId,
        amount: request.amount,
        payout_method: request.payoutMethod,
        notes: JSON.stringify(request.payoutDetails),
        status: 'pending',
        requested_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted and is pending review",
    });
    
    // Convert to CreatorPayout type
    const payout: CreatorPayout = {
      id: data.id,
      amount: data.amount.toString(), // Convert number to string
      status: data.status as 'pending' | 'completed' | 'processing',
      created_at: data.created_at,
      payout_method: data.payout_method
    };
    
    return {
      success: true,
      data: payout
    };
  } catch (error: any) {
    console.error("Error requesting payout:", error);
    
    toast({
      title: "Error requesting payout",
      description: error.message || "Failed to request payout",
      variant: "destructive",
    });
    
    return {
      success: false,
      error: error.message || "Failed to request payout"
    };
  }
};
