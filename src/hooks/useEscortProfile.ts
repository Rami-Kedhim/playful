
// Fix typing for height and weight : TS2345 issue typing to string
import { useState, useEffect, useCallback } from 'react';
import { Escort } from '@/types/escort';
import { supabase } from '@/integrations/supabase/client';

interface UseEscortProfileResult {
  escort: Escort | null;
  loading: boolean;
  error: string | null;
  fetchEscortProfile: (id: string) => Promise<void>;
}

/**
 * Hook for fetching and managing a single escort profile.
 */
export function useEscortProfile(): UseEscortProfileResult {
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEscortProfile = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('escorts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Convert height property to string type if it isn't to fix incompatibility
      if (data && typeof data.height !== 'string') {
        data.height = String(data.height);
      }

      // Convert weight property to string type if it isn't to fix incompatibility
      if (data && typeof data.weight !== 'string') {
        data.weight = String(data.weight);
      }

      setEscort(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    escort,
    loading,
    error,
    fetchEscortProfile,
  };
}

export default useEscortProfile;
