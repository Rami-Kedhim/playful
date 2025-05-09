
import { useState, useEffect } from 'react';
import escortService from '@/services/escorts/escortService';
import { Escort } from '@/types/escort';

export const useEscortDetail = (
  escortId: string | undefined,
  initialData?: Escort | null
) => {
  const [escort, setEscort] = useState<Escort | null>(initialData || null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEscortDetail = async () => {
      if (!escortId) {
        setEscort(null);
        setLoading(false);
        return;
      }

      if (initialData) {
        setEscort(initialData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await escortService.getEscortById(escortId);
        
        // Add any missing fields that might be expected
        const enhancedData: Escort = {
          ...data,
          // These fields are expected in some components
          isVerified: data.verified || data.isVerified,
          // Only add gender if needed and not already present
          ...(data.gender ? {} : { gender: 'Not specified' }),
        };
        
        setEscort(enhancedData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch escort details');
        setEscort(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEscortDetail();
  }, [escortId, initialData]);

  return {
    escort,
    loading,
    error,
    setEscort,
  };
};

export default useEscortDetail;
