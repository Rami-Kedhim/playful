
import { useState, useEffect } from 'react';
import { Escort } from '@/types/escort';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useWallet } from '@/hooks/useWallet';

export const useEscortDetail = (escortId?: string) => {
  const { getEscortById, state } = useEscortContext();
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite } = useFavorites();
  const { wallet, deductBalance } = useWallet();
  
  // For booking functionality
  const [isBookingAvailable, setIsBookingAvailable] = useState(false);
  const [isMessagingAvailable, setIsMessagingAvailable] = useState(false);
  
  // Fetch escort details on mount or when ID changes
  useEffect(() => {
    const fetchEscortDetails = async () => {
      if (!escortId) {
        setEscort(null);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const fetchedEscort = await getEscortById(escortId);
        
        if (fetchedEscort) {
          setEscort(fetchedEscort);
          
          // Check availability of booking and messaging based on wallet balance
          if (wallet) {
            const hourlyRate = fetchedEscort.rates?.hourly || fetchedEscort.price || 0;
            setIsBookingAvailable(wallet.balance >= hourlyRate);
            setIsMessagingAvailable(wallet.balance >= 10); // Messaging costs 10 Lucoins
          }
        } else {
          setError('Escort not found');
        }
      } catch (err) {
        console.error('Error fetching escort details:', err);
        setError('Failed to load escort details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEscortDetails();
  }, [escortId, wallet?.balance]);
  
  // Handle booking request
  const handleBook = async () => {
    if (!escort) return false;
    
    const bookingCost = escort.rates?.hourly || escort.price || 100;
    
    if (wallet?.balance < bookingCost) {
      return false;
    }
    
    // Deduct Lucoins for booking
    const success = await deductBalance(bookingCost, `Booking with ${escort.name}`);
    return success;
  };
  
  // Handle message request
  const handleMessage = async () => {
    if (!escort) return false;
    
    const messageCost = 10; // 10 Lucoins to start a conversation
    
    if (wallet?.balance < messageCost) {
      return false;
    }
    
    // Deduct Lucoins for messaging
    const success = await deductBalance(messageCost, `Message to ${escort.name}`);
    return success;
  };
  
  return {
    escort,
    loading,
    error,
    isFavorite: escort ? isFavorite(escort.id) : false,
    isBookingAvailable,
    isMessagingAvailable,
    handleBook,
    handleMessage
  };
};

export default useEscortDetail;
