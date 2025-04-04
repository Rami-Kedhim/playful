
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
      
      // Calculate pending payouts
      const pendingPayouts = calculatePendingPayouts(payouts);
      
      // Update earnings state
      setEarnings(calculateEarnings(totalEarnings, pendingPayouts));
    }
  }, [payouts, isLoading]);
  
  return earnings;
};

export default useEarningsCalculator;
