
import { useState, useEffect } from 'react';
import { personaService } from '../service';
import { UberPersona } from '@/types/uberPersona';
import { PersonaSearchParams } from '@/types/persona';

export const usePersona = (personaId?: string) => {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch a single persona by ID
  useEffect(() => {
    if (!personaId) return;

    const fetchPersona = async () => {
      setLoading(true);
      try {
        const data = await personaService.fetchPersonaById(personaId);
        setPersona(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch persona'));
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [personaId]);

  // Search personas with filters
  const searchPersonas = async (params: PersonaSearchParams) => {
    setLoading(true);
    try {
      const result = await personaService.searchPersonas(params);
      setPersonas(result.data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search personas'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    persona,
    personas,
    loading,
    error,
    searchPersonas
  };
};
