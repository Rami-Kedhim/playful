
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { fetchCreatorPayouts, requestPayout } from "@/services/creatorService";
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
      const result = await fetchCreatorPayouts(creatorId);
      setPayouts(result.data);
      
      // In a real app, you would fetch this from an API
      const mockEarnings = {
        total: 2347.85,
        available: 1250.42,
        pending: 567.25,
        thisMonth: 892.15
      };
      
      setEarnings(mockEarnings);
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
      await requestPayout(creatorId, amount, payoutMethod, details);
      setDialogOpen(false);
      toast({
        title: "Payout requested",
        description: "Your payout request has been submitted",
      });
      loadPayouts(); // Refresh data
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
