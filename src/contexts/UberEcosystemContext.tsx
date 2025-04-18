
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { UberCoreSettings, UberSearchFilters } from '@/types/uber-ecosystem';
import { uberCore } from '@/services/neural/UberCore';
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
  const [settings, setSettings] = useState<UberCoreSettings>(uberCore.getSettings());
  
  // Get data sources
  const { escorts } = useEscortContext();
  
  // Initialize UberCore and ecosystem
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        
        // Initialize UberCore
        const initialized = await uberCore.initialize();
        
        if (initialized) {
          setIsInitialized(true);
          
          // Load data from available sources
          if (escorts && escorts.length > 0) {
            const uberPersonas: UberPersona[] = [];
            
            // Convert escorts to UberPersonas
            for (const escort of escorts) {
              const persona = uberCore.convertToUberPersona(escort);
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
      uberCore.shutdown().catch(console.error);
    };
  }, [escorts]);
  
  // Update settings function
  const updateSettings = (newSettings: Partial<UberCoreSettings>) => {
    uberCore.updateSettings(newSettings);
    setSettings(uberCore.getSettings());
  };
  
  // Search personas function
  const searchPersonas = (filters: UberSearchFilters): UberPersona[] => {
    if (!isInitialized) return [];
    return uberCore.searchPersonas(filters);
  };
  
  // Find similar profiles function
  const findSimilarProfiles = (personaId: string, count: number = 5): UberPersona[] => {
    if (!isInitialized) return [];
    return uberCore.findNearestNeighbors(personaId, count);
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
          const persona = uberCore.convertToUberPersona(escort);
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
