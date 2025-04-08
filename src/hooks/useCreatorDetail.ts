
import { useState, useEffect } from 'react';
import { Creator } from '@/hooks/useCreators';
import { useCreatorContext } from '@/modules/creators/providers/CreatorProvider';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useWallet } from '@/hooks/useWallet';

export const useCreatorDetail = (creatorId?: string) => {
  const { getCreatorById, state } = useCreatorContext();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite } = useFavorites();
  const { wallet, deductBalance } = useWallet();
  
  // For subscription functionality
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [canSubscribe, setCanSubscribe] = useState(false);
  
  // Fetch creator details on mount or when ID changes
  useEffect(() => {
    const fetchCreatorDetails = async () => {
      if (!creatorId) {
        setCreator(null);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const fetchedCreator = await getCreatorById(creatorId);
        
        if (fetchedCreator) {
          setCreator(fetchedCreator);
          
          // Check subscription status based on wallet balance
          if (wallet) {
            // For demo, we'll simulate subscription status
            setIsSubscribed(Math.random() > 0.7);
            setCanSubscribe(wallet.balance >= fetchedCreator.price);
          }
        } else {
          setError('Creator not found');
        }
      } catch (err) {
        console.error('Error fetching creator details:', err);
        setError('Failed to load creator details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreatorDetails();
  }, [creatorId, wallet?.balance]);
  
  // Handle subscription
  const handleSubscribe = async () => {
    if (!creator) return false;
    
    if (wallet?.balance < creator.price) {
      return false;
    }
    
    // Deduct Lucoins for subscription
    const success = await deductBalance(creator.price, `Subscription to ${creator.name}`);
    if (success) {
      setIsSubscribed(true);
    }
    return success;
  };
  
  // Handle sending tip
  const handleSendTip = async (amount: number) => {
    if (!creator || wallet?.balance < amount) {
      return false;
    }
    
    // Deduct Lucoins for tip
    return await deductBalance(amount, `Tip to ${creator.name}`);
  };
  
  return {
    creator,
    loading,
    error,
    isFavorite: creator ? isFavorite(creator.id) : false,
    isSubscribed,
    canSubscribe,
    handleSubscribe,
    handleSendTip
  };
};

export default useCreatorDetail;
