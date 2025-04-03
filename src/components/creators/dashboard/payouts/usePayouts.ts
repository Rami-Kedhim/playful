
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { fetchCreatorPayouts, requestPayout, getCreatorEarningsSummary } from "@/services/creator/creatorPayoutsService";
import { CreatorPayout } from "@/types/creator";

export const usePayouts = (creatorId: string) => {
  const [payouts, setPayouts] = useState<CreatorPayout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [earnings, setEarnings] = useState({
    total: 0,
    available: 0,
    pending: 0,
    thisMonth: 0
  });

  const loadPayouts = async () => {
    setIsLoading(true);
    try {
      // Fetch payouts from the database
      const result = await fetchCreatorPayouts(creatorId);
      setPayouts(result.data);
      
      // Get earnings summary
      const earningsSummary = await getCreatorEarningsSummary(creatorId);
      setEarnings(earningsSummary);
    } catch (error) {
      console.error("Error loading payouts:", error);
      toast({
        title: "Failed to load payouts",
        description: "There was an error loading your payout history",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayoutRequest = async (
    amount: number,
    payoutMethod: string,
    details: Record<string, any>
  ) => {
    try {
      const result = await requestPayout(creatorId, amount, payoutMethod, details);
      if (result) {
        setDialogOpen(false);
        toast({
          title: "Payout requested",
          description: "Your payout request has been submitted",
        });
        
        // Refresh the data
        loadPayouts();
      }
    } catch (error) {
      console.error("Error requesting payout:", error);
      toast({
        title: "Failed to request payout",
        description: "There was an error submitting your payout request",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (creatorId) {
      loadPayouts();
    }
  }, [creatorId]);

  return {
    payouts,
    isLoading,
    dialogOpen,
    setDialogOpen,
    earnings,
    handlePayoutRequest
  };
};

export default usePayouts;
