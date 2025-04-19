import { useState } from "react";
import { CreatorPayout } from "@/types/creator";

const useEarningsCalculator = (payouts: CreatorPayout[], isLoading: boolean) => {
  if (isLoading) return 0;
  
  // Calculate total earnings from payouts
  return payouts.reduce((total, payout) => {
    return total + (payout.amount || 0);
  }, 0);
};

export default useEarningsCalculator;
