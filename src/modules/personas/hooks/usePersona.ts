
/**
 * usePersona Hook
 * React hook for interacting with the UberPersona system
 */
import { useState, useEffect, useCallback } from 'react';
import { personaService } from '../service';
import type { PersonaFilters, PersonaSearchResult, PersonaViewData } from '../types';
import type { UberPersona } from '@/types/UberPersona';

export function usePersona(personaId?: string) {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [similarPersonas, setSimilarPersonas] = useState<UberPersona[]>([]);
  const [boostStatus, setBoostStatus] = useState<{isActive: boolean, remainingTime?: string}>({isActive: false});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPersona = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await personaService.getPersonaViewData(id);
      
      if (result) {
        setPersona(result.persona);
        setSimilarPersonas(result.similarPersonas);
        setBoostStatus(result.boostStatus);
      } else {
        setError('Persona not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load persona');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (personaId) {
      fetchPersona(personaId);
    }
  }, [personaId, fetchPersona]);
  
  const search = async (filters: PersonaFilters): Promise<PersonaSearchResult> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await personaService.searchPersonas(filters);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to search personas');
      return {
        personas: [],
        total: 0,
        page: 1,
        pageSize: 20,
        hasMore: false
      };
    } finally {
      setLoading(false);
    }
  };
  
  const updatePersona = async (id: string, updates: Partial<Omit<UberPersona, 'id' | 'type'>>): Promise<UberPersona | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updated = await personaService.updatePersona({id, updates});
      
      if (updated && persona && persona.id === id) {
        setPersona(updated);
      }
      
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update persona');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    persona,
    similarPersonas,
    boostStatus,
    loading,
    error,
    fetchPersona,
    search,
    updatePersona
  };
}

export default usePersona;
