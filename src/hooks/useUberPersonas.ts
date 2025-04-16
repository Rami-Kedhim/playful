
import { useState, useEffect, useCallback } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { uberPersonaService } from '@/services/UberPersonaService';
import useScrapers from '@/hooks/useScrapers';
import { toast } from 'sonner';
import { ContentCreator } from '@/types/creator';
import { Escort } from '@/types/escort';

// Define a Creator type that's compatible with what scrapeCreators returns
export interface Creator extends Partial<ContentCreator> {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  isPremium?: boolean; // Make this optional to match what the scraper returns
}

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
        if (escorts && Array.isArray(escorts)) {
          const escortPromises = escorts.map(escort => {
            try {
              return uberPersonaService.escortToUberPersona(escort);
            } catch (e) {
              console.error("Error mapping escort to persona:", e);
              return null;
            }
          }).filter(Boolean);
          
          const escortPersonas = await Promise.all(escortPromises);
          results.push(...escortPersonas.filter(Boolean) as UberPersona[]);
        }
      } catch (e) {
        console.error("Error loading escorts:", e);
      }
      
      // Load creators
      try {
        const creators = await scrapeCreators();
        if (creators && Array.isArray(creators)) {
          // Convert Creator to ContentCreator with default values for required fields
          const contentCreators = creators.map((creator: Creator): ContentCreator => {
            return {
              id: creator.id,
              name: creator.name,
              username: creator.username,
              profileImage: creator.profileImage || creator.imageUrl,
              avatarUrl: creator.avatarUrl || creator.imageUrl,
              imageUrl: creator.imageUrl, // Add imageUrl from creator
              location: creator.location || '',
              languages: creator.languages || ['English'],
              bio: creator.bio || '',
              description: creator.description || '',
              age: creator.age || 0,
              ethnicity: creator.ethnicity || '',
              tags: creator.tags || [],
              createdAt: creator.createdAt || new Date(),
              updatedAt: creator.updatedAt || new Date(),
              isAI: creator.isAI || false,
              isVerified: creator.isVerified || false,
              isFeatured: creator.isFeatured || false,
              isScraped: creator.isScraped || true,
              hasLiveStream: creator.hasLiveStream || false,
              subscriptionPrice: creator.subscriptionPrice || creator.price || 0,
              isPremium: creator.isPremium || false,
              isLive: creator.isLive || false,
              subscriberCount: creator.subscriberCount || 0,
              contentCount: creator.contentCount || { photos: 0, videos: 0 },
              price: creator.price || 0,
              lastSynced: new Date(),
              rating: creator.rating || 0,
              region: creator.location || '',
              language: (creator.languages && creator.languages[0]) || 'English'
            };
          });
          
          const creatorPromises = contentCreators.map(creator => {
            try {
              return uberPersonaService.creatorToUberPersona(creator);
            } catch (e) {
              console.error("Error mapping creator to persona:", e);
              return null;
            }
          }).filter(Boolean);
          
          const creatorPersonas = await Promise.all(creatorPromises);
          results.push(...creatorPersonas.filter(Boolean) as UberPersona[]);
        }
      } catch (e) {
        console.error("Error loading creators:", e);
      }
      
      // Load livecams
      try {
        const livecamResponse = await scrapeLivecams();
        if (livecamResponse && Array.isArray(livecamResponse.models)) {
          const livecamPromises = livecamResponse.models.map(model => {
            try {
              return uberPersonaService.livecamToUberPersona(model);
            } catch (e) {
              console.error("Error mapping livecam to persona:", e);
              return null;
            }
          }).filter(Boolean);
          
          const livecamPersonas = await Promise.all(livecamPromises);
          results.push(...livecamPersonas.filter(Boolean) as UberPersona[]);
        }
      } catch (e) {
        console.error("Error loading livecams:", e);
      }
      
      // Register all personas with visibility system
      for (const persona of results) {
        try {
          if (persona && persona.id) {
            uberPersonaService.registerWithVisibilitySystem(persona.id, persona.systemMetadata?.source || 'manual');
          }
        } catch (e) {
          console.error("Error registering persona with visibility system:", e);
        }
      }

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
    return personas.filter(persona => persona && persona.roleFlags && persona.roleFlags.isEscort);
  }, [personas]);
  
  const getCreators = useCallback(() => {
    return personas.filter(persona => persona && persona.roleFlags && persona.roleFlags.isCreator);
  }, [personas]);
  
  const getLivecams = useCallback(() => {
    return personas.filter(persona => persona && persona.roleFlags && persona.roleFlags.isLivecam);
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
