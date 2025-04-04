
/**
 * Calculate earnings breakdown based on total earnings and pending payouts
 */
export const calculateEarnings = (totalEarnings: number, pendingPayouts: number) => {
  return {
    total: totalEarnings,
    pending: pendingPayouts,
    available: totalEarnings - pendingPayouts
  };
};

/**
 * Calculate pending payout amount from payout array
 */
export const calculatePendingPayouts = (payouts: { status: string; amount: string }[]) => {
  return payouts
    .filter(payout => payout.status === 'pending')
    .reduce((sum, payout) => sum + parseFloat(payout.amount), 0);
};
