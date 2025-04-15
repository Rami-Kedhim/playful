
import { CreatorPayout, PayoutRequest, PayoutResult } from "@/types/creator";

export const getCreatorPayouts = async (creatorId: string): Promise<PayoutResult> => {
  try {
    // This would be a real API call in a production environment
    // For now, we're returning mock data
    const mockPayouts: CreatorPayout[] = [
      {
        id: '1',
        creator_id: creatorId,
        amount: 250.00,
        status: 'completed',
        created_at: '2023-06-01T10:00:00Z',
        payout_method: 'bank_transfer'
      },
      {
        id: '2',
        creator_id: creatorId,
        amount: 175.50,
        status: 'processing',
        created_at: '2023-06-15T14:30:00Z',
        payout_method: 'paypal'
      },
      {
        id: '3',
        creator_id: creatorId,
        amount: 120.00,
        status: 'pending',
        created_at: '2023-06-28T09:15:00Z',
        payout_method: 'bank_transfer'
      }
    ];
    
    return {
      success: true,
      data: mockPayouts,
      totalCount: mockPayouts.length
    };
  } catch (error) {
    console.error("Error fetching payouts:", error);
    throw new Error("Failed to fetch payout data");
  }
};

export const fetchCreatorPayouts = async (creatorId: string): Promise<PayoutResult> => {
  // In a real app, this would make a separate API call to refresh the data
  // For now, we'll just reuse getCreatorPayouts
  return getCreatorPayouts(creatorId);
};

export const requestPayout = async (request: PayoutRequest): Promise<PayoutResult> => {
  try {
    // In a real app, this would make an API call to submit a payout request
    // For now, we'll simulate a successful request
    
    // Validate request
    if (request.amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }
    
    // Mock successful response
    const mockPayout: CreatorPayout = {
      id: `payout-${Date.now()}`,
      creator_id: request.creator_id,
      amount: request.amount,
      status: 'pending',
      created_at: new Date().toISOString(),
      payout_method: request.payout_method
    };
    
    return { 
      success: true,
      data: [mockPayout]
    };
  } catch (error) {
    console.error("Error requesting payout:", error);
    return { 
      success: false,
      message: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};
