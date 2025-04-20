
import { CreatorPayout } from '@/types/creator';

// Mock fetch payouts
export const fetchCreatorPayouts = async (creatorId: string): Promise<CreatorPayout[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const payouts: CreatorPayout[] = [
        {
          id: 'payout1',
          creatorId,
          amount: 100,
          status: 'completed',
          requestedAt: new Date().toISOString()
        },
        {
          id: 'payout2',
          creatorId,
          amount: 150,
          status: 'pending',
          requestedAt: new Date().toISOString()
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
        creatorId,
        amount,
        status: 'pending',
        requestedAt: new Date().toISOString()
      };
      resolve(newPayout);
    }, 300);
  });
};

// Mock update payout
export const updatePayout = async (payoutId: string, status: string): Promise<CreatorPayout | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: payoutId,
        creatorId: '',
        amount: 0,
        status,
        requestedAt: new Date().toISOString()
      });
    }, 300);
  });
};

// Mock requestPayout function as default export (simulate)
const requestPayout = async (request: any): Promise<CreatorPayout> => {
  // Simulate API call and response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `payout-${Date.now()}`,
        creatorId: request.creator_id,
        amount: request.amount,
        status: 'pending',
        requestedAt: new Date().toISOString()
      });
    }, 500);
  });
};

export default requestPayout;
