
import { CreatorPayout } from '@/types/creator';

// NOTE: Removed usage of `PayoutResult` import since it's missing; user should add if needed.

// Mock fetch payouts
export const fetchCreatorPayouts = async (creatorId: string): Promise<CreatorPayout[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const payouts: CreatorPayout[] = [
        {
          id: 'payout1',
          amount: 100,
          currency: 'USD',
          status: 'completed',
          createdAt: new Date().toISOString() // renamed from created_at
        },
        {
          id: 'payout2',
          amount: 150,
          currency: 'USD',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ];
      resolve(payouts);
    }, 500);
  });
};

// Mock create payout
export const createPayout = async (creatorId: string, amount: number): Promise<CreatorPayout> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPayout: CreatorPayout = {
        id: `payout-${Date.now()}`,
        amount,
        currency: 'USD',
        status: 'pending',
        createdAt: new Date().toISOString() // renamed
      };
      resolve(newPayout);
    }, 300);
  });
};

// Mock update payout
export const updatePayout = async (payoutId: string, status: string): Promise<CreatorPayout | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock updated payout with corrected property names
      resolve({
        id: payoutId,
        amount: 0,
        currency: 'USD',
        status,
        createdAt: new Date().toISOString()
      });
    }, 300);
  });
};

export default {
  fetchCreatorPayouts,
  createPayout,
  updatePayout
};
