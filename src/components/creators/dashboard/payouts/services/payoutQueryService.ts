
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { CreatorPayout, PayoutRequest } from "@/types/creator";
import payoutService from "./payoutService";

/**
 * React Query hooks for payout operations
 */
export const usePayoutQueries = (creatorId: string) => {
  const queryClient = useQueryClient();
  
  // Fetch payouts query
  const {
    data: payoutsData = { data: [], totalCount: 0 },
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['creator', creatorId, 'payouts'],
    queryFn: async () => {
      const result = await payoutService.getPayouts(creatorId);
      return result;
    }
  });
  
  // Request payout mutation
  const { mutate: requestPayout, isPending: isSubmitting } = useMutation({
    mutationFn: async (request: PayoutRequest) => {
      return await payoutService.requestPayout(request);
    },
    onSuccess: () => {
      // Invalidate and refetch payouts
      queryClient.invalidateQueries({ queryKey: ['creator', creatorId, 'payouts'] });
      
      toast({
        title: "Payout Requested",
        description: "Your payout request has been submitted successfully."
      });
    },
    onError: (error) => {
      console.error("Error requesting payout:", error);
      toast({
        title: "Payout Failed",
        description: "There was an error processing your payout request. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  return {
    payouts: (payoutsData.data || []) as CreatorPayout[],
    isLoading,
    error,
    refreshPayouts: refetch,
    requestPayout,
    isSubmitting
  };
};
