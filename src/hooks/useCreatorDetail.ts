
import { useState, useEffect, useCallback } from 'react';
import { useCreatorContext } from '@/modules/creators/providers/CreatorProvider';
import { Creator } from './useCreators';
import { useToast } from '@/components/ui/use-toast';
import { useWallet } from '@/hooks/useWallet';

/**
 * Hook for detailed creator profile interactions
 */
export const useCreatorDetail = (creatorId?: string) => {
  const { getCreatorById } = useCreatorContext();
  const { toast } = useToast();
  const { wallet } = useWallet();
  
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Load creator data
  useEffect(() => {
    if (!creatorId) {
      setError("Creator ID is required");
      setLoading(false);
      return;
    }
    
    try {
      const foundCreator = getCreatorById(creatorId);
      if (foundCreator) {
        setCreator(foundCreator);
        
        // Check if user is subscribed (in a real app, fetch from API)
        setIsSubscribed(Math.random() > 0.7); 
        
        // Check if creator is favorited (in a real app, fetch from API)
        setIsFavorite(Math.random() > 0.6);
        
        setError(null);
      } else {
        setError("Creator not found");
        setCreator(null);
      }
    } catch (err) {
      console.error("Error loading creator details:", err);
      setError("Failed to load creator details");
      setCreator(null);
    } finally {
      setLoading(false);
    }
  }, [creatorId, getCreatorById]);
  
  // Handle subscribe action
  const handleSubscribe = useCallback(() => {
    if (!creator) return;
    
    // Check wallet balance
    if (!wallet || wallet.balance < creator.price) {
      toast({
        title: "Insufficient funds",
        description: "Please add more funds to your wallet",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Subscription successful!",
      description: `You are now subscribed to ${creator.name}`,
    });
    
    setIsSubscribed(true);
  }, [creator, wallet, toast]);
  
  // Handle sending tips
  const handleSendTip = useCallback((amount: number) => {
    if (!creator) return;
    
    // Check wallet balance
    if (!wallet || wallet.balance < amount) {
      toast({
        title: "Insufficient funds",
        description: "Please add more funds to your wallet",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Tip sent!",
      description: `You sent ${amount} LUCOINS to ${creator.name}`,
    });
  }, [creator, wallet, toast]);
  
  // Toggle favorite status
  const toggleFavorite = useCallback(() => {
    setIsFavorite(current => !current);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${creator?.name} removed from your favorites` 
        : `${creator?.name} added to your favorites`,
    });
  }, [creator, isFavorite, toast]);
  
  return {
    creator,
    loading,
    error,
    isSubscribed,
    isFavorite,
    toggleFavorite,
    canSubscribe: !!wallet && wallet.balance >= (creator?.price || 0),
    handleSubscribe,
    handleSendTip
  };
};

export default useCreatorDetail;
