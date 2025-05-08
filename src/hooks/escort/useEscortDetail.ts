
import { useState, useEffect } from 'react';
import escortService from '@/services/escorts/escortService';
import { Escort } from '@/types/Escort';

export const useEscortDetail = (escortId: string) => {
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!escortId) return;

    const fetchEscortDetails = async () => {
      setLoading(true);
      try {
        const data = await escortService.getEscortById(escortId);
        setEscort(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching escort details:', err);
        setError(err.message || 'Failed to load escort details');
      } finally {
        setLoading(false);
      }
    };

    fetchEscortDetails();
  }, [escortId]);

  return { escort, loading, error };
};

export default useEscortDetail;
