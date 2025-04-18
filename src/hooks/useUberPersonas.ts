
import { useState, useCallback, useEffect } from 'react';
import { UberPersona, Capabilities } from '@/types/uberPersona';

export const useUberPersonas = (initialList: UberPersona[] = []) => {
  const [personas, setPersonas] = useState<UberPersona[]>(initialList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Add a new persona
  const addPersona = useCallback((persona: UberPersona) => {
    setPersonas(prev => [...prev, persona]);
  }, []);
  
  // Update an existing persona
  const updatePersona = useCallback((id: string, updates: Partial<UberPersona>) => {
    setPersonas(prev => 
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  }, []);
  
  // Update capability properties for a persona
  const updateCapabilities = useCallback((id: string, capabilities: Partial<Capabilities>) => {
    setPersonas(prev => 
      prev.map(p => p.id === id ? { 
        ...p, 
        capabilities: {
          ...p.capabilities,
          ...capabilities,
          // Make sure we're consistent with property names
          hasLivestream: capabilities.hasLivestream ?? p.capabilities.hasLivestream
        }
      } : p)
    );
  }, []);
  
  // Add or update metadata for a persona
  const updateMetadata = useCallback((id: string, metadata: Record<string, any>) => {
    setPersonas(prev => 
      prev.map(p => p.id === id ? { 
        ...p, 
        systemMetadata: {
          ...p.systemMetadata,
          ...metadata,
          // Only include properties that exist in the type
          lastActiveAt: metadata.lastActiveAt || p.systemMetadata?.lastActiveAt,
          createdAt: metadata.createdAt || p.systemMetadata?.createdAt,
          updatedAt: metadata.updatedAt || p.systemMetadata?.updatedAt,
          totalViews: metadata.totalViews || p.systemMetadata?.totalViews,
          totalLikes: metadata.totalLikes || p.systemMetadata?.totalLikes,
          rank: metadata.rank || p.systemMetadata?.rank,
          isAI: metadata.isAI ?? p.systemMetadata?.isAI
        }
      } : p)
    );
  }, []);
  
  // Remove a persona
  const removePersona = useCallback((id: string) => {
    setPersonas(prev => prev.filter(p => p.id !== id));
  }, []);
  
  // Fetch personas from API
  const fetchPersonas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be a real API call in production
      const response = await mockFetchPersonas();
      setPersonas(response);
    } catch (err: any) {
      setError(err.message || 'Failed to load personas');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Update personas when initialList changes
  useEffect(() => {
    if (initialList?.length > 0) {
      setPersonas(initialList);
    }
  }, [initialList]);
  
  // Mock personas fetch - this would come from a real API
  const mockFetchPersonas = async (): Promise<UberPersona[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(generateMockPersonas());
      }, 500);
    });
  };
  
  // Generate mock personas for testing
  const generateMockPersonas = (): UberPersona[] => {
    const mockPersonas: UberPersona[] = [];
    
    for (let i = 0; i < 5; i++) {
      mockPersonas.push({
        id: `persona-${i}`,
        displayName: `Persona ${i}`,
        username: `persona_${i}`,
        avatarUrl: `https://picsum.photos/200/300?random=${i}`,
        location: 'New York',
        bio: 'Lorem ipsum dolor sit amet',
        language: 'English',
        age: 25 + i,
        ethnicity: 'Mixed',
        tags: ['VIP', 'Elite', 'Featured'],
        createdAt: new Date(),
        updatedAt: new Date(),
        roleFlags: {
          isEscort: true,
          isCreator: i % 2 === 0,
          isAI: i % 3 === 0,
          isVerified: i % 2 === 1,
          isFeatured: i === 0
        },
        capabilities: {
          hasPhotos: true,
          hasVideos: i % 2 === 0,
          hasStories: i % 3 === 0,
          hasChat: true,
          hasVoice: i % 2 === 1,
          hasBooking: true,
          hasLivestream: i === 0,
          hasExclusiveContent: i % 2 === 0
        },
        monetization: {
          acceptsLucoin: true,
          acceptsTips: true,
          subscriptionPrice: 9.99 * (i + 1),
          unlockingPrice: 4.99 * (i + 1),
          boostingActive: i === 0
        },
        systemMetadata: {
          source: i % 2 === 0 ? 'manual' : (i % 3 === 0 ? 'scraped' : 'ai_generated'),
          lastSynced: new Date().toISOString(),
          aiPersonality: i % 3 === 0 ? 'friendly' : undefined,
          aiMood: i % 3 === 0 ? 'happy' : undefined,
          aiEngine: i % 3 === 0 ? 'GPT' : undefined,
          tagsGeneratedByAI: i % 3 === 0
        }
      });
    }
    
    return mockPersonas;
  };
  
  return {
    personas,
    isLoading,
    error,
    addPersona,
    updatePersona,
    updateCapabilities,
    updateMetadata,
    removePersona,
    fetchPersonas
  };
};

export default useUberPersonas;
