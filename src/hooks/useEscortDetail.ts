
import { useState, useEffect, useCallback } from 'react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { Escort } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';
import { useWallet } from '@/hooks/useWallet';

/**
 * Hook for detailed escort profile interactions
 */
export const useEscortDetail = (escortId?: string) => {
  const { getEscortById } = useEscortContext();
  const { toast } = useToast();
  const { wallet } = useWallet();
  
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Load escort data
  useEffect(() => {
    if (!escortId) {
      setError("Escort ID is required");
      setLoading(false);
      return;
    }
    
    try {
      const foundEscort = getEscortById(escortId);
      if (foundEscort) {
        setEscort(foundEscort);
        
        // Check if escort is favorited (in a real app, fetch from API)
        setIsFavorite(Math.random() > 0.6);
        
        setError(null);
      } else {
        setError("Escort not found");
        setEscort(null);
      }
    } catch (err) {
      console.error("Error loading escort details:", err);
      setError("Failed to load escort details");
      setEscort(null);
    } finally {
      setLoading(false);
    }
  }, [escortId, getEscortById]);
  
  // Handle booking request
  const handleBookingRequest = useCallback((startTime: Date, endTime: Date, serviceType: string) => {
    if (!escort) return;
    
    // Calculate estimated price based on duration and rates
    const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const estimatedPrice = Math.round(durationHours * (escort.rates?.hourly || 200));
    
    // Check wallet balance
    if (!wallet || wallet.balance < estimatedPrice) {
      toast({
        title: "Insufficient funds",
        description: "Please add more funds to your wallet",
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Booking request sent!",
      description: `Your booking request with ${escort.name} has been sent`,
    });
    
    return true;
  }, [escort, wallet, toast]);
  
  // Toggle favorite status
  const toggleFavorite = useCallback(() => {
    setIsFavorite(current => !current);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${escort?.name} removed from your favorites` 
        : `${escort?.name} added to your favorites`,
    });
  }, [escort, isFavorite, toast]);
  
  return {
    escort,
    loading,
    error,
    isFavorite,
    toggleFavorite,
    handleBookingRequest,
    canBook: !!wallet && wallet.balance >= (escort?.rates?.hourly || 200)
  };
};

export default useEscortDetail;
