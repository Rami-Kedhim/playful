
import { useState, useEffect, useCallback } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { uberPersonaService } from '@/services/UberPersonaService';
import useScrapers from '@/hooks/useScrapers';
import { toast } from 'sonner';

export function useUberPersonas() {
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { scrapeLivecams, scrapeCreators, scrapeEscorts } = useScrapers();

  // Load personas from multiple sources
  const loadPersonas = useCallback(async (useCache = true) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to get cached data first if allowed
      if (useCache) {
        const cachedData = localStorage.getItem('cachedUberPersonas');
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          if (parsed.expiry > Date.now()) {
            setPersonas(parsed.personas);
            setIsLoading(false);
            return;
          }
        }
      }
      
      const results: UberPersona[] = [];
      
      // Load escorts
      try {
        const escorts = await scrapeEscorts();
        const escortPersonas = escorts.map(escort => uberPersonaService.escortToUberPersona(escort));
        results.push(...escortPersonas);
      } catch (e) {
        console.error("Error loading escorts:", e);
      }
      
      // Load creators
      try {
        const creators = await scrapeCreators();
        const creatorPersonas = creators.map(creator => uberPersonaService.creatorToUberPersona(creator));
        results.push(...creatorPersonas);
      } catch (e) {
        console.error("Error loading creators:", e);
      }
      
      // Load livecams
      try {
        const livecamResponse = await scrapeLivecams();
        const livecamPersonas = livecamResponse.models.map(model => 
          uberPersonaService.livecamToUberPersona(model)
        );
        results.push(...livecamPersonas);
      } catch (e) {
        console.error("Error loading livecams:", e);
      }
      
      // Register all personas with visibility system
      results.forEach(persona => {
        try {
          uberPersonaService.registerWithVisibilitySystem(persona);
        } catch (e) {
          console.error("Error registering persona with visibility system:", e);
        }
      });

      // Cache the results
      localStorage.setItem('cachedUberPersonas', JSON.stringify({
        personas: results,
        expiry: Date.now() + (30 * 60 * 1000) // 30 minutes
      }));
      
      setPersonas(results);
    } catch (err: any) {
      setError(err.message || 'Failed to load personas');
      toast.error('Failed to load profiles', {
        description: 'There was an error loading the profiles. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [scrapeEscorts, scrapeCreators, scrapeLivecams]);

  // Filter personas by role
  const getEscorts = useCallback(() => {
    return personas.filter(persona => persona.roleFlags.isEscort);
  }, [personas]);
  
  const getCreators = useCallback(() => {
    return personas.filter(persona => persona.roleFlags.isCreator);
  }, [personas]);
  
  const getLivecams = useCallback(() => {
    return personas.filter(persona => persona.roleFlags.isLivecam);
  }, [personas]);

  // Find persona by ID
  const getPersonaById = useCallback((id: string) => {
    return personas.find(persona => persona.id === id);
  }, [personas]);

  return {
    personas,
    isLoading,
    error,
    loadPersonas,
    getEscorts,
    getCreators,
    getLivecams,
    getPersonaById
  };
}

export default useUberPersonas;
