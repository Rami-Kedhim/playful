
import { useState, useEffect } from "react";
import { CreatorPayout } from "@/types/creator";
import { calculateEarnings, calculatePendingPayouts } from "../utils/payoutCalculations";

/**
 * Calculate earnings based on total earnings and pending payouts
 */
const useEarningsCalculator = (payouts: CreatorPayout[], isLoading: boolean) => {
  const [earnings, setEarnings] = useState({
    total: 0,
    pending: 0,
    available: 0
  });
  
  useEffect(() => {
    if (!isLoading) {
      // This would be fetched from an API in a real app
      const totalEarnings = 1250;
      
      // Calculate pending payouts based on the actual shape of CreatorPayout
      const pendingAmount = payouts
        .filter(payout => payout.status === 'pending' || payout.status === 'processing')
        .reduce((sum, payout) => sum + Number(payout.amount), 0);
      
      // Update earnings state
      setEarnings({
        total: totalEarnings,
        pending: pendingAmount,
        available: totalEarnings - pendingAmount
      });
    }
  }, [payouts, isLoading]);
  
  return earnings;
};

export default useEarningsCalculator;
