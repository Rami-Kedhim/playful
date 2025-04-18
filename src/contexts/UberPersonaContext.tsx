
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UberPersona } from '@/types/UberPersona';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { mapEscortsToUberPersonas } from '@/utils/profileMapping';
import { uberCore } from '@/services/neural/UberCore';

interface UberPersonaContextType {
  allPersonas: UberPersona[];
  escortPersonas: UberPersona[];
  creatorPersonas: UberPersona[];
  livecamPersonas: UberPersona[];
  aiPersonas: UberPersona[];
  loading: boolean;
  error: string | null;
  refreshEcosystem: () => Promise<void>;
  getPersonaById: (id: string) => UberPersona | undefined;
  boostedPersonas: UberPersona[];
  rankPersonas: (personas: UberPersona[], boostFactor?: number) => UberPersona[];
  hilbertSpace: {
    dimension: number;
    getCoordinates: (persona: UberPersona) => number[];
  };
}

const defaultHilbertSpace = {
  dimension: 4,
  getCoordinates: (_: UberPersona): number[] => [0.5, 0.5, 0.5, 0.5]
};

const UberPersonaContext = createContext<UberPersonaContextType | undefined>(undefined);

export const UberPersonaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { escorts } = useEscortContext();
  const [allPersonas, setAllPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [hilbertSpace, setHilbertSpace] = useState(defaultHilbertSpace);
  
  // Initialize the UberCore system and populate personas
  useEffect(() => {
    const initSystem = async () => {
      try {
        setLoading(true);
        
        // Initialize UberCore
        await uberCore.initialize();
        
        // Map escorts to UberPersonas
        if (escorts && escorts.length > 0) {
          const mappedPersonas = mapEscortsToUberPersonas(escorts);
          setAllPersonas(mappedPersonas);
        }
        
        // Initialize Hilbert space functionality
        setHilbertSpace({
          dimension: 4,
          getCoordinates: (persona: UberPersona): number[] => {
            // Generate stable coordinates for the persona in Hilbert space
            const seed = persona.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return [
              Math.sin(seed * 0.1) * 0.5 + 0.5,
              Math.cos(seed * 0.1) * 0.5 + 0.5,
              Math.sin(seed * 0.2) * 0.5 + 0.5,
              Math.cos(seed * 0.2) * 0.5 + 0.5
            ];
          }
        });
        
        setInitialized(true);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize UberPersona ecosystem');
        console.error('UberPersona initialization error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    initSystem();
    
    // Cleanup on unmount
    return () => {
      uberCore.shutdown().catch(console.error);
    };
  }, [escorts]);
  
  // Define filter functions for different persona types
  const getEscorts = () => allPersonas.filter(persona => 
    persona.profileType === 'verified' || persona.profileType === 'provisional'
  );
  
  const getCreators = () => allPersonas.filter(persona => {
    // Fix: Check if services exists before calling some() on it
    return persona.services && persona.services.some(s => 
      s.toLowerCase().includes('content') || s.toLowerCase().includes('subscription')
    );
  });
  
  const getLivecams = () => allPersonas.filter(persona => {
    // Fix: Check if services exists before calling some() on it
    return persona.services && persona.services.some(s => 
      s.toLowerCase().includes('cam') || s.toLowerCase().includes('stream') || s.toLowerCase().includes('virtual')
    );
  });
  
  const getAIPersonas = () => allPersonas.filter(persona => 
    persona.isAI === true || persona.profileType === 'ai'
  );
  
  // Get persona by ID
  const getPersonaById = (id: string): UberPersona | undefined => {
    return allPersonas.find(persona => persona.id === id);
  };
  
  // Get boosted personas 
  const getBoostedPersonas = (): UberPersona[] => {
    // In a real app, this would check the active boosts in the database
    return allPersonas.filter((_, index) => index % 3 === 0); // Every 3rd one for demo
  };
  
  // Rank personas using machine learning and boost factors
  const rankPersonas = (personas: UberPersona[], boostFactor = 1.0): UberPersona[] => {
    // Clone to avoid mutations
    const ranked = [...personas];
    
    // Apply ranking algorithm with boost factor
    ranked.sort((a, b) => {
      // Make sure stats exists before accessing its properties
      // Fix: Check if stats exists before accessing its properties
      const aRating = a.stats?.rating || 0;
      const aReviewCount = a.stats?.reviewCount || 0;
      const bRating = b.stats?.rating || 0;
      const bReviewCount = b.stats?.reviewCount || 0;
      
      // Base ranking on stats
      let aScore = (aRating * 2) + (aReviewCount / 10);
      let bScore = (bRating * 2) + (bReviewCount / 10);
      
      // Apply boosting
      if (a.featured) aScore *= boostFactor;
      if (b.featured) bScore *= boostFactor;
      
      return bScore - aScore;
    });
    
    return ranked;
  };
  
  // Function to refresh the ecosystem
  const refreshEcosystem = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would fetch fresh data from API
      // For demo, we'll just map escorts again
      if (escorts && escorts.length > 0) {
        const mappedPersonas = mapEscortsToUberPersonas(escorts);
        setAllPersonas(mappedPersonas);
      }
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh UberPersona ecosystem');
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    allPersonas,
    escortPersonas: getEscorts(),
    creatorPersonas: getCreators(),
    livecamPersonas: getLivecams(),
    aiPersonas: getAIPersonas(),
    loading,
    error,
    refreshEcosystem,
    getPersonaById,
    boostedPersonas: getBoostedPersonas(),
    rankPersonas,
    hilbertSpace
  };
  
  if (loading && !initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing UberPersona ecosystem...</p>
        </div>
      </div>
    );
  }
  
  return (
    <UberPersonaContext.Provider value={value}>
      {children}
    </UberPersonaContext.Provider>
  );
};

export const useUberPersonaContext = (): UberPersonaContextType => {
  const context = useContext(UberPersonaContext);
  if (!context) {
    throw new Error('useUberPersonaContext must be used within UberPersonaProvider');
  }
  return context;
};
