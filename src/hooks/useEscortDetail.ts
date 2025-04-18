
import { useState, useEffect, useCallback } from 'react';
import { Escort } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';
import { useWallet } from '@/hooks/useWallet';

/**
 * Hook for detailed escort profile interactions
 */
export const useEscortDetail = (escortId?: string) => {
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
    
    // Simulate fetching escort data
    const fetchEscortData = async () => {
      try {
        // Placeholder for actual API call
        // In a real app this would be from an API
        const fakeEscort: Escort = {
          id: escortId,
          name: "Sample Escort",
          age: 25,
          location: "New York",
          gender: "female",
          rating: 4.8,
          reviewCount: 24,
          verified: true,
          rates: { hourly: 200 },
          bio: "Professional companion for your special events",
          price: 200,
          images: ["/assets/escorts/profile1.jpg"],
          services: ["Dinner Date", "Event Companion"],
          isVerified: true,
          featured: false,
          contactInfo: {
            email: "sample@example.com",
            phone: "+1234567890",
            website: "https://example.com/sample"
          }
        };
        
        setEscort(fakeEscort);
        setIsFavorite(Math.random() > 0.6);
        setError(null);
      } catch (err) {
        console.error("Error loading escort details:", err);
        setError("Failed to load escort details");
        setEscort(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEscortData();
  }, [escortId]);
  
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
