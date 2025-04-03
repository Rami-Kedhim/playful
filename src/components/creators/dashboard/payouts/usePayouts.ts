
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { CreatorPayout, PayoutRequest } from "@/types/creator";
import { getCreatorPayouts, fetchCreatorPayouts, requestPayout } from "@/services/creator/creatorPayoutsService";

const usePayouts = (creatorId: string) => {
  const [payouts, setPayouts] = useState<CreatorPayout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [earnings, setEarnings] = useState({
    total: 0,
    pending: 0,
    available: 0
  });

  // Load payouts data
  useEffect(() => {
    const loadPayouts = async () => {
      try {
        setIsLoading(true);
        
        // Fetch payouts data from service
        const result = await getCreatorPayouts(creatorId);
        setPayouts(result.data);
        
        // Calculate earnings
        const totalEarnings = 1250; // This would be fetched from an API in a real app
        const pendingPayouts = result.data
          .filter(payout => payout.status === 'pending')
          .reduce((sum, payout) => sum + parseFloat(payout.amount), 0);
        
        setEarnings({
          total: totalEarnings,
          pending: pendingPayouts,
          available: totalEarnings - pendingPayouts
        });
      } catch (error) {
        console.error("Error loading payouts:", error);
        toast({
          title: "Error",
          description: "Failed to load payout information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (creatorId) {
      loadPayouts();
    }
  }, [creatorId]);

  // Handle payout request
  const handlePayoutRequest = async (payoutData: {
    amount: number;
    payoutMethod: string;
    payoutDetails: Record<string, any>;
  }) => {
    try {
      setIsLoading(true);
      
      const request: PayoutRequest = {
        creatorId,
        amount: payoutData.amount,
        payoutMethod: payoutData.payoutMethod,
        payoutDetails: payoutData.payoutDetails
      };
      
      const result = await requestPayout(request);
      
      if (result.success) {
        // Refresh payouts data
        const updatedPayouts = await fetchCreatorPayouts(creatorId);
        setPayouts(updatedPayouts.data);
        
        // Update earnings
        setEarnings(prev => ({
          ...prev,
          pending: prev.pending + payoutData.amount,
          available: prev.available - payoutData.amount
        }));
        
        toast({
          title: "Payout Requested",
          description: "Your payout request has been submitted successfully.",
          variant: "default"
        });
        
        setDialogOpen(false);
        return true;
      } else {
        throw new Error("Failed to request payout");
      }
    } catch (error) {
      console.error("Error requesting payout:", error);
      toast({
        title: "Payout Failed",
        description: "There was an error processing your payout request. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

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
