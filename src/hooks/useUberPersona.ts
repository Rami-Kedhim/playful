
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UberPersona } from '@/types/uberPersona';  // Using the correct case for import

export const useUberPersona = (userId: string | undefined) => {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPersona = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('uber_personas')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setPersona(data || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [userId]);

  return { persona, loading, error };
};
