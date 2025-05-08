
import { useState, useEffect } from 'react';
import { Escort } from '@/types/Escort';
import escortService from '@/services/escorts/escortService';

export const useEscortDetail = (escortId?: string) => {
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEscortDetails = async () => {
      if (!escortId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await escortService.getEscortById(escortId);
        setEscort(data);
      } catch (err: any) {
        console.error('Error fetching escort details:', err);
        setError(err.message || 'Failed to load escort details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEscortDetails();
  }, [escortId]);
  
  return {
    escort,
    loading,
    error
  };
};

export default useEscortDetail;
