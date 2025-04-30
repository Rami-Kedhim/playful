
import { useState, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { personaService } from '@/modules/personas/service';

export const usePersona = (personaId?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [recommendations, setRecommendations] = useState<UberPersona[]>([]);

  // Fetch persona data when personaId changes
  useEffect(() => {
    const fetchPersonaData = async () => {
      if (!personaId) {
        setPersona(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const personaData = await personaService.getPersonaViewData(personaId);
        setPersona(personaData);

        // Get recommendations based on the persona
        const recommendedPersonas = await personaService.getRecommendedPersonas(personaId);
        setRecommendations(recommendedPersonas);
      } catch (err: any) {
        console.error('Error fetching persona data:', err);
        setError(err.message || 'Failed to load persona data');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonaData();
  }, [personaId]);

  // Search personas with given criteria
  const searchPersonas = async (criteria: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      return await personaService.searchPersonas(criteria);
    } catch (err: any) {
      console.error('Error searching personas:', err);
      setError(err.message || 'Failed to search personas');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Update persona data
  const updatePersona = async (data: Partial<UberPersona>) => {
    if (!personaId || !persona) {
      setError('No persona selected for update');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      const success = await personaService.updatePersona(personaId, data);
      
      if (success) {
        // Refresh persona data after update
        const updatedPersona = await personaService.getPersonaViewData(personaId);
        setPersona(updatedPersona);
      }
      
      return success;
    } catch (err: any) {
      console.error('Error updating persona:', err);
      setError(err.message || 'Failed to update persona');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    persona,
    recommendations,
    searchPersonas,
    updatePersona
  };
};

export default usePersona;
