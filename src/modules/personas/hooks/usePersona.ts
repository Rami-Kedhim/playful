
import { useState, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { personaService } from '../service';

export function usePersona(personaId?: string) {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (!personaId) {
      setLoading(false);
      return;
    }
    
    const fetchPersona = async () => {
      try {
        setLoading(true);
        const data = await personaService.getPersonaById(personaId);
        setPersona(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch persona'));
        console.error('Error fetching persona:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersona();
  }, [personaId]);
  
  return { persona, loading, error };
}

export function usePersonas(filters?: Record<string, any>) {
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        setLoading(true);
        const data = await personaService.getPersonas(filters);
        setPersonas(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch personas'));
        console.error('Error fetching personas:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonas();
  }, [filters]);
  
  return { personas, loading, error };
}
