
import { useState, useEffect, useCallback } from 'react';
import { personaService } from './service';
import { UberPersona } from '@/types/uberPersona';
import { PersonaSearchParams, PersonaServiceResponse } from './types';

/**
 * Hook for searching personas with filters
 */
export const usePersonaSearch = (initialParams: PersonaSearchParams = {}) => {
  const [params, setParams] = useState<PersonaSearchParams>(initialParams);
  const [results, setResults] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{
    total?: number;
    limit?: number;
    offset?: number;
  }>({});

  const searchPersonas = useCallback(async (searchParams?: PersonaSearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const searchParamsToUse = searchParams || params;
      
      const response = await personaService.searchPersonas(searchParamsToUse);
      setResults(response.data);
      
      if (response.meta) {
        setMeta({
          total: response.meta.pagination.total,
          limit: response.meta.pagination.pageSize,
          offset: (response.meta.pagination.page - 1) * response.meta.pagination.pageSize
        });
      }
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to search personas');
      return { data: [], error: err.message };
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Initial search on mount or when params change
  useEffect(() => {
    searchPersonas();
  }, [searchPersonas]);

  const updateParams = useCallback((newParams: Partial<PersonaSearchParams>) => {
    setParams(prevParams => ({
      ...prevParams,
      ...newParams
    }));
  }, []);

  return {
    params,
    updateParams,
    results,
    loading,
    error,
    meta,
    searchPersonas,
  };
};

/**
 * Hook for fetching and managing a single persona
 */
export const usePersona = (personaId?: string) => {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPersona = useCallback(async (id?: string) => {
    const idToUse = id || personaId;
    
    if (!idToUse) {
      setError('No persona ID provided');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await personaService.getPersonaById(idToUse);
      setPersona(data);
      
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch persona');
      return null;
    } finally {
      setLoading(false);
    }
  }, [personaId]);

  // Fetch persona on mount if ID is provided
  useEffect(() => {
    if (personaId) {
      fetchPersona();
    }
  }, [personaId, fetchPersona]);

  // Function to update the persona data
  const updatePersona = useCallback(async (updates: Partial<UberPersona>) => {
    if (!persona) {
      setError('No persona loaded to update');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const updatedPersona = await personaService.updatePersona(persona.id, updates);
      
      setPersona(updatedPersona);
      return updatedPersona;
    } catch (err: any) {
      setError(err.message || 'Failed to update persona');
      return null;
    } finally {
      setLoading(false);
    }
  }, [persona]);

  return {
    persona,
    loading,
    error,
    fetchPersona,
    updatePersona,
  };
};

/**
 * Hook for managing persona favorites
 */
export const usePersonaFavorites = (userId?: string) => {
  const [favorites, setFavorites] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (!userId) {
      setError('No user ID provided');
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await personaService.getUserFavorites(userId);
      setFavorites(data);
      
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch favorites');
      return [];
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Fetch favorites on mount if user ID is provided
  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId, fetchFavorites]);

  // Add a persona to favorites
  const addFavorite = useCallback(async (personaId: string) => {
    if (!userId) {
      setError('No user ID provided');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      const success = await personaService.addToFavorites(userId, personaId);
      
      if (success) {
        await fetchFavorites();
      }
      
      return success;
    } catch (err: any) {
      setError(err.message || 'Failed to add to favorites');
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId, fetchFavorites]);

  // Remove a persona from favorites
  const removeFavorite = useCallback(async (personaId: string) => {
    if (!userId) {
      setError('No user ID provided');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      const success = await personaService.removeFromFavorites(userId, personaId);
      
      if (success) {
        setFavorites(prev => prev.filter(p => p.id !== personaId));
      }
      
      return success;
    } catch (err: any) {
      setError(err.message || 'Failed to remove from favorites');
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Check if a persona is in favorites
  const isFavorite = useCallback((personaId: string) => {
    return favorites.some(p => p.id === personaId);
  }, [favorites]);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
