
// fix imports same as above
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { ContentCreator } from "@/types/creator";  
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
    mutationFn: async (request: any) => { // Generic any for request due to missing types
      return await payoutService.requestPayout(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creator', creatorId, 'payouts'] });

      toast({
        title: "Payout Requested",
        description: "Your payout request has been submitted successfully."
      });
    },
    onError: () => {
      toast({
        title: "Payout Failed",
        description: "There was an error processing your payout request. Please try again.",
        variant: "destructive"
      });
    }
  });

  return {
    payouts: (payoutsData.data || []) as ContentCreator[],
    isLoading,
    error,
    refreshPayouts: refetch,
    requestPayout,
    isSubmitting
  };
};

