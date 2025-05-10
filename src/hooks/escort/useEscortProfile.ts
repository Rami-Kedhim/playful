
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Escort, VerificationLevel } from '@/types/Escort';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';

export function useEscortProfile() {
  const context = useEscortContext();
  const { id } = useParams<{ id: string }>();
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchEscort = async () => {
      if (!id) {
        setError('Escort ID is missing');
        setLoading(false);
        return;
      }

      if (!context) {
        setError('Escort context is not available');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const foundEscort = context.escorts.find(e => e.id === id);
        if (foundEscort) {
          // Fix height string type - explicitly convert to string
          // Also fix verificationLevel type by casting properly
          const fixedEscort: Escort = {
            ...foundEscort,
            height: String(foundEscort.height),
            verificationLevel: (foundEscort.verificationLevel as VerificationLevel) || "none",
          };
          setEscort(fixedEscort);
        } else {
          setError('Escort not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load escort');
      } finally {
        setLoading(false);
      }
    };

    fetchEscort();
  }, [id, context]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return {
    escort,
    loading,
    error,
    isFavorite,
    toggleFavorite
  };
}

export default useEscortProfile;
