
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getEscortBoostScore, updateEscortBoostScore } from "@/utils/boostScoreSystem";
import { useAuth } from "@/hooks/auth/useAuth";

export const useBoostScore = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [boostScore, setBoostScore] = useState<number | null>(null);

  /**
   * Fetches an escort's boost score
   */
  const fetchBoostScore = async (escortId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const score = await getEscortBoostScore(escortId);
      setBoostScore(score);
      return score;
    } catch (err: any) {
      console.error("Error fetching boost score:", err);
      setError(err.message || "Failed to load boost score");
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates an escort's boost score in the database
   */
  const updateBoostScore = async (escortId: string) => {
    if (!user) {
      setError("You must be logged in to update a boost score");
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      const success = await updateEscortBoostScore(escortId);
      
      if (success) {
        // Refetch the score to get the updated value
        const updatedScore = await getEscortBoostScore(escortId);
        setBoostScore(updatedScore);
        
        toast({
          title: "Boost Score Updated",
          description: `Your profile boost score is now ${updatedScore}/100.`
        });
      } else {
        throw new Error("Failed to update boost score");
      }
      
      return success;
    } catch (err: any) {
      console.error("Error updating boost score:", err);
      setError(err.message || "Failed to update boost score");
      
      toast({
        title: "Error",
        description: err.message || "Failed to update boost score",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Purchases boost credits with Lucoin
   */
  const purchaseBoostCredits = async (amount: number) => {
    if (!user) {
      setError("You must be logged in to purchase boost credits");
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      // This would need to be implemented with your Lucoin system
      // For now, we'll just mock a successful purchase
      const success = true;
      
      if (success) {
        toast({
          title: "Boost Credits Purchased",
          description: `You've successfully purchased ${amount} boost credits.`
        });
      }
      
      return success;
    } catch (err: any) {
      console.error("Error purchasing boost credits:", err);
      setError(err.message || "Failed to purchase boost credits");
      
      toast({
        title: "Error",
        description: err.message || "Failed to purchase boost credits",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    boostScore,
    loading,
    error,
    fetchBoostScore,
    updateBoostScore,
    purchaseBoostCredits
  };
};

export default useBoostScore;
