import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UberPersona } from '@/types/UberPersona';
import { UberCoreSettings, UberSearchFilters } from '@/types/uber-ecosystem';
import { uberCoreInstance } from '@/services/neural/UberCore';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { toast } from '@/components/ui/use-toast';

// Context interface for the Uber ecosystem
interface UberEcosystemContextType {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  personas: UberPersona[];
  settings: UberCoreSettings;
  updateSettings: (newSettings: Partial<UberCoreSettings>) => void;
  searchPersonas: (filters: UberSearchFilters) => UberPersona[];
  findSimilarProfiles: (personaId: string, count?: number) => UberPersona[];
  getPersonaById: (id: string) => UberPersona | undefined;
  refreshEcosystem: () => Promise<void>;
}

// Create context with default values
const UberEcosystemContext = createContext<UberEcosystemContextType>({
  isInitialized: false,
  isLoading: false,
  error: null,
  personas: [],
  settings: {
    boostingEnabled: true,
    boostingAlgorithm: 'OxumAlgorithm',
    orderByBoost: true,
    autonomyLevel: 65,
    resourceAllocation: 80,
    hilbertDimension: 8,
    aiEnhancementLevel: 40
  },
  updateSettings: () => {},
  searchPersonas: () => [],
  findSimilarProfiles: () => [],
  getPersonaById: () => undefined,
  refreshEcosystem: async () => {}
});

export const UberEcosystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [settings, setSettings] = useState<UberCoreSettings>({
    boostingEnabled: true,
    boostingAlgorithm: 'OxumAlgorithm',
    orderByBoost: true,
    autonomyLevel: 65,
    resourceAllocation: 80,
    hilbertDimension: 8,
    aiEnhancementLevel: 40
  });
  
  // Get data sources
  const { escorts } = useEscortContext();
  
  // Initialize UberCore and ecosystem
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        
        // Initialize UberCore
        const initialized = await uberCoreInstance.initialize();
        
        if (initialized) {
          setIsInitialized(true);
          
          // Load data from available sources
          if (escorts && escorts.length > 0) {
            const uberPersonas: UberPersona[] = [];
            
            // Convert escorts to UberPersonas
            for (const escort of escorts) {
              const persona = convertToUberPersona(escort);
              if (persona) {
                uberPersonas.push(persona);
              }
            }
            
            // Update personas state
            setPersonas(uberPersonas);
            
            console.log(`UberEcosystem: Converted ${uberPersonas.length} entities to UberPersonas`);
          }
          
          setError(null);
        } else {
          setError('Failed to initialize UberCore');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to initialize Uber ecosystem');
        toast({
          title: "Initialization Error",
          description: "Failed to initialize the Uber ecosystem. Some features may not work correctly.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    initialize();
    
    // Cleanup on unmount
    return () => {
      uberCoreInstance.shutdown().catch(console.error);
    };
  }, [escorts]);
  
  // Helper function to convert escort to UberPersona
  const convertToUberPersona = (escort: any): UberPersona => {
    return {
      id: escort.id,
      name: escort.name,
      displayName: escort.displayName || escort.name,
      type: 'escort',
      avatarUrl: escort.profileImage || escort.images?.[0],
      imageUrl: escort.images?.[0],
      bio: escort.description || escort.bio,
      description: escort.description || escort.bio,
      location: escort.location,
      age: escort.age,
      ethnicity: escort.ethnicity,
      isVerified: escort.isVerified || false,
      isActive: escort.isActive || true,
      isAI: false,
      isPremium: escort.isPremium || false,
      isOnline: escort.isOnline || false,
      rating: escort.rating,
      languages: escort.languages || [],
      services: escort.services || [],
      traits: escort.traits || [],
      tags: escort.tags || [],
      featured: escort.featured || false,
      roleFlags: {
        isEscort: true,
        isCreator: false,
        isLivecam: false,
        isAI: false,
        isVerified: escort.isVerified || false,
        isFeatured: escort.featured || false
      },
      capabilities: {
        hasPhotos: true,
        hasVideos: !!escort.videos?.length,
        hasStories: false,
        hasChat: true,
        hasVoice: false,
        hasBooking: true,
        hasLiveStream: false,
        hasExclusiveContent: false,
        hasContent: !!escort.videos?.length || !!escort.images?.length,
        hasRealMeets: true,
        hasVirtualMeets: false
      },
      stats: {
        rating: escort.rating || 0,
        reviewCount: escort.reviewCount || 0,
        viewCount: escort.viewCount || 0,
        favoriteCount: escort.favoriteCount || 0,
        bookingCount: escort.bookingCount || 0,
        responseTime: escort.responseTime || 30
      },
      monetization: {
        acceptsLucoin: true,
        acceptsTips: true,
        subscriptionPrice: 0,
        unlockingPrice: 0,
        boostingActive: escort.featured || false,
        meetingPrice: escort.price || 0
      },
      price: escort.price || 0,
      availability: {
        schedule: escort.availability || {},
        nextAvailable: escort.nextAvailable || 'Available now'
      },
      systemMetadata: {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        personalityIndex: Math.random(),
        statusFlags: {
          needsModeration: false,
          isPromoted: escort.featured || false,
          isArchived: false
        }
      }
    };
  };
  
  // Update settings function
  const updateSettings = (newSettings: Partial<UberCoreSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };
  
  // Search personas function
  const searchPersonas = (filters: UberSearchFilters): UberPersona[] => {
    if (!isInitialized) return [];
    
    // Simple search implementation
    return personas.filter(persona => {
      // Type filter
      if (filters.type && filters.type.length > 0 && !filters.type.includes(persona.type)) {
        return false;
      }
      
      // Location filter
      if (filters.location && 
          persona.location && 
          !persona.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Rating filter
      if (typeof filters.minRating === 'number' && 
          (typeof persona.rating !== 'number' || persona.rating < filters.minRating)) {
        return false;
      }
      
      // Price filter
      if (typeof filters.maxPrice === 'number' && 
          (typeof persona.price === 'number' && persona.price > filters.maxPrice)) {
        return false;
      }
      
      // Verification filter
      if (filters.isVerified === true && !persona.isVerified) {
        return false;
      }
      
      // Tags filter
      if (filters.tags && 
          filters.tags.length > 0 && 
          (!persona.tags || !filters.tags.some(tag => persona.tags!.includes(tag)))) {
        return false;
      }
      
      return true;
    });
  };
  
  // Find similar profiles function
  const findSimilarProfiles = (personaId: string, count: number = 5): UberPersona[] => {
    if (!isInitialized) return [];
    
    const sourcePersona = personas.find(p => p.id === personaId);
    if (!sourcePersona) return [];
    
    // Simple similarity calculation based on tags and type
    return personas
      .filter(p => p.id !== personaId)
      .map(p => {
        // Calculate similarity score
        let score = 0;
        
        // Same type
        if (p.type === sourcePersona.type) score += 2;
        
        // Similar age (within 5 years)
        if (typeof p.age === 'number' && 
            typeof sourcePersona.age === 'number' && 
            Math.abs(p.age - sourcePersona.age) <= 5) {
          score += 1;
        }
        
        // Tags overlap
        if (p.tags && sourcePersona.tags) {
          const overlap = p.tags.filter(tag => sourcePersona.tags!.includes(tag)).length;
          score += overlap * 0.5;
        }
        
        return { persona: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(item => item.persona);
  };
  
  // Get persona by ID function
  const getPersonaById = (id: string): UberPersona | undefined => {
    return personas.find(persona => persona.id === id);
  };
  
  // Refresh ecosystem function
  const refreshEcosystem = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Refresh data from available sources
      if (escorts && escorts.length > 0) {
        const uberPersonas: UberPersona[] = [];
        
        // Convert escorts to UberPersonas
        for (const escort of escorts) {
          const persona = convertToUberPersona(escort);
          if (persona) {
            uberPersonas.push(persona);
          }
        }
        
        // Update personas state
        setPersonas(uberPersonas);
      }
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh Uber ecosystem');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Context value
  const value: UberEcosystemContextType = {
    isInitialized,
    isLoading,
    error,
    personas,
    settings,
    updateSettings,
    searchPersonas,
    findSimilarProfiles,
    getPersonaById,
    refreshEcosystem
  };
  
  // Render provider
  return (
    <UberEcosystemContext.Provider value={value}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

// Custom hook to use the Uber ecosystem
export const useUberEcosystem = (): UberEcosystemContextType => {
  const context = useContext(UberEcosystemContext);
  if (!context) {
    throw new Error('useUberEcosystem must be used within an UberEcosystemProvider');
  }
  return context;
};
