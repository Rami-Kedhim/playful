
import { useState, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { personaService } from './service';

/**
 * Hook to fetch featured personas
 */
export const useFeaturedPersonas = (limit: number = 4) => {
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        setLoading(true);
        const result = await personaService.getPersonas();
        setPersonas(result.slice(0, limit));
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, [limit]);

  return { personas, loading, error };
};

/**
 * Hook to fetch a single persona by ID
 */
export const usePersona = (id: string) => {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        setLoading(true);
        const result = await personaService.getPersonaById(id);
        setPersona(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPersona();
    }
  }, [id]);

  return { persona, loading, error };
};

/**
 * Hook to boost a persona
 */
export const useBoostPersona = () => {
  const [boosting, setBoosting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const boostPersona = async (personaId: string, boostLevel: number) => {
    try {
      setBoosting(true);
      const result = await personaService.boostPersona(personaId, boostLevel);
      setSuccess(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err as Error);
      setSuccess(false);
      throw err;
    } finally {
      setBoosting(false);
    }
  };

  return { boostPersona, boosting, success, error };
};
