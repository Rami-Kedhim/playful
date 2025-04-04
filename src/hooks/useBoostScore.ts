
import { useState, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";

interface UseBoostScoreOptions {
  initialScore?: number | null;
}

const useBoostScore = (options: UseBoostScoreOptions = {}) => {
  const [boostScore, setBoostScore] = useState<number | null>(options.initialScore || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoostScore = useCallback(async (profileId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would be an API call
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate a random score between 20 and 95
      const randomScore = Math.floor(Math.random() * 75) + 20;
      setBoostScore(randomScore);
    } catch (err: any) {
      console.error('Error fetching boost score:', err);
      setError(err.message || 'Failed to fetch boost score');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBoostScore = useCallback(async (profileId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate a slightly different score
      const currentScore = boostScore || 50;
      const adjustment = Math.floor(Math.random() * 20) - 10; // -10 to +10
      const newScore = Math.max(0, Math.min(100, currentScore + adjustment));
      setBoostScore(newScore);
      
      toast({
        title: 'Boost Score Updated',
        description: adjustment > 0 
          ? `Your score increased by ${adjustment} points!` 
          : adjustment < 0 
            ? `Your score decreased by ${Math.abs(adjustment)} points.`
            : 'Your score remained the same.',
      });
    } catch (err: any) {
      console.error('Error updating boost score:', err);
      setError(err.message || 'Failed to update boost score');
      
      toast({
        title: 'Error',
        description: 'Failed to update boost score. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [boostScore]);

  const purchaseBoostCredits = useCallback(async (amount: number) => {
    try {
      setLoading(true);
      
      // In a real implementation, this would be a payment API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      toast({
        title: 'Boost Credits Purchased',
        description: `You've purchased ${amount} boost credits!`,
      });
      
      // Simulate score increase due to purchased credits
      if (boostScore !== null) {
        const increase = Math.floor(amount / 10);
        setBoostScore(Math.min(100, boostScore + increase));
      }
      
      return true;
    } catch (err: any) {
      console.error('Error purchasing boost credits:', err);
      
      toast({
        title: 'Error',
        description: 'Failed to purchase boost credits. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  }, [boostScore]);

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
