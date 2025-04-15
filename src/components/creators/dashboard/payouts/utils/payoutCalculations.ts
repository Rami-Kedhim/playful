
import { CreatorPayout } from "@/types/creator";

/**
 * Calculate the sum of pending payouts
 */
export const calculatePendingPayouts = (payouts: CreatorPayout[]): number => {
  return payouts
    .filter(payout => payout.status === 'pending' || payout.status === 'processing')
    .reduce((sum, payout) => sum + Number(payout.amount), 0);
};

/**
 * Calculate earnings breakdown
 */
export const calculateEarnings = (totalEarnings: number, pendingPayouts: number) => {
  return {
    total: totalEarnings,
    pending: pendingPayouts,
    available: totalEarnings - pendingPayouts
  };
};
