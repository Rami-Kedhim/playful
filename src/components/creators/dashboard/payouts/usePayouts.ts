
import { useState } from "react";
import { CreatorPayout, PayoutRequest } from "@/types/creator";
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
  
  // Calculate earnings
  const earnings = useEarningsCalculator(payouts, isLoading);

  // Handle payout request
  const handlePayoutRequest = async (payoutData: {
    amount: number;
    payoutMethod: string;
    payoutDetails: Record<string, any>;
  }) => {
    try {
      const request: PayoutRequest = {
        creatorId,
        amount: payoutData.amount,
        payoutMethod: payoutData.payoutMethod,
        payoutDetails: payoutData.payoutDetails
      };
      
      // Use the mutation to request a payout
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
