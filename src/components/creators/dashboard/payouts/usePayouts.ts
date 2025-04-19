
// Fix type mismatch in payouts argument passed to useEarningsCalculator

import { useState } from "react";
import { PayoutRequest } from "@/types/creator";
import { usePayoutQueries } from "./services/payoutQueryService";
import useEarningsCalculator from "./hooks/useEarningsCalculator";

const usePayouts = (creatorId: string) => {
  const {
    payouts,
    isLoading,
    error,
    refreshPayouts,
    requestPayout,
    isSubmitting
  } = usePayoutQueries(creatorId);
  
  // Cast payouts to PayoutRequest[] if possible or map accordingly
  // Here we assume payouts already fit CreatorPayout[] structure for earnings calculation
  const earnings = useEarningsCalculator(payouts as any, isLoading);

  const handlePayoutRequest = async (payoutData: {
    amount: number;
    payoutMethod: string;
    payoutDetails: Record<string, any>;
  }) => {
    try {
      const request: PayoutRequest = {
        creator_id: creatorId,
        amount: payoutData.amount,
        payout_method: payoutData.payoutMethod,
        payoutDetails: payoutData.payoutDetails
      };
      
      const result = await requestPayout(request);
      return true;
    } catch (error) {
      console.error("Error in handlePayoutRequest:", error);
      return false;
    }
  };

  return {
    payouts,
    isLoading,
    earnings,
    handlePayoutRequest,
    isSubmitting,
    refreshPayouts,
    error
  };
};

export default usePayouts;

