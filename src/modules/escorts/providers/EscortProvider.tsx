import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Escort, EscortFilterOptions } from '@/types/escort';
import { EscortScraper } from '@/services/scrapers/EscortScraper';
import { useToast } from '@/components/ui/use-toast';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

// Types
interface EscortState {
  escorts: Escort[];
  featuredEscorts: Escort[];
  isLoading: boolean;
  error: string | null;
  filters: {
    location: string;
    serviceTypes: string[];
    priceRange: [number, number];
    gender: string[];
    orientation: string[];
    ageRange: [number, number];
    rating: number;
    verified: boolean;
    availableNow: boolean;
    escortType: "verified" | "ai" | "provisional" | "all";
    language: string[];
  };
}

interface EscortContextValue {
  state: EscortState;
  loadEscorts: (useNeuralProcessing?: boolean) => Promise<Escort[]>;
  getEscortById: (id: string) => Escort | undefined;
  getFeaturedEscorts: () => Escort[];
  updateFilters: (newFilters: Partial<EscortState['filters']>) => void;
  escortScraper: EscortScraper;
}

interface EscortProviderProps {
  children: React.ReactNode;
}

// Actions
type EscortAction =
  | { type: 'SET_ESCORTS'; payload: Escort[] }
  | { type: 'SET_FEATURED_ESCORTS'; payload: Escort[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_FILTERS'; payload: Partial<EscortState['filters']> };

// Initial state
const initialState: EscortState = {
  escorts: [],
  featuredEscorts: [],
  isLoading: false,
  error: null,
  filters: {
    location: '',
    serviceTypes: [],
    priceRange: [0, 1000],
    gender: [],
    orientation: [],
    ageRange: [18, 99],
    rating: 0,
    verified: false,
    availableNow: false,
    escortType: "all",
    language: [],
  },
};

// Reducer
const escortReducer = (state: EscortState, action: EscortAction): EscortState => {
  switch (action.type) {
    case 'SET_ESCORTS':
      return { ...state, escorts: action.payload };
    case 'SET_FEATURED_ESCORTS':
      return { ...state, featuredEscorts: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    default:
      return state;
  }
};

// Context
const EscortContext = createContext<EscortContextValue | undefined>(undefined);

// Provider
export const EscortProvider: React.FC<EscortProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(escortReducer, initialState);
  const { toast } = useToast();
  
  let user = null;
  try {
    const { useAuth } = require('@/hooks/auth/useAuthContext');
    try {
      const auth = useAuth();
      user = auth?.user || null;
    } catch (error) {
      console.log('Auth not available, proceeding without user data');
    }
  } catch (error) {
    console.log('Auth module not available');
  }
  
  const escortScraper = React.useMemo(() => EscortScraper.getInstance(), []);

  const loadEscorts = useCallback(async (useNeuralProcessing = false): Promise<Escort[]> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (state.filters.location) {
        escortScraper.setFilters({
          region: state.filters.location,
        });
      }
      
      let processedEscorts: Escort[] = [];
      
      if (!useNeuralProcessing) {
        processedEscorts = escortScraper.getCachedResults();
      } else {
        try {
          const neuralQuery = {
            filters: state.filters,
            boostingEnabled: escortsNeuralService.getConfig().boostingEnabled,
            boostingAlgorithm: escortsNeuralService.getConfig().boostingAlgorithm,
            orderByBoost: escortsNeuralService.getConfig().orderByBoost
          };
          
          processedEscorts = await neuralHub.processQuery(
            'escorts',
            neuralQuery
          ) as Escort[];
          
          processedEscorts = processedEscorts.map(escort => ({
            ...escort,
            profileType: escort.verified ? 'verified' : 
                       escort.isAI ? 'ai' : 'provisional'
          }));
          
          if (escortsNeuralService.getConfig().orderByBoost) {
            processedEscorts = processedEscorts.sort((a, b) => {
              const boostDiff = (b.boostLevel || 0) - (a.boostLevel || 0);
              if (boostDiff !== 0) return boostDiff;
              
              if (a.verified && !b.verified) return -1;
              if (!a.verified && b.verified) return 1;
              
              return b.rating - a.rating;
            });
          }
        } catch (err) {
          console.error("Error in neural processing:", err);
          processedEscorts = escortScraper.getCachedResults();
        }
      }

      const featured = processedEscorts
        .filter(escort => escort.featured || (escort.boostLevel && escort.boostLevel > 2))
        .slice(0, 8);

      dispatch({ type: 'SET_ESCORTS', payload: processedEscorts });
      dispatch({ type: 'SET_FEATURED_ESCORTS', payload: featured });
      return processedEscorts;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load escorts";
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast({
        title: "Failed to load escorts",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [escortScraper, state.filters, toast]);

  const getEscortById = useCallback(
    (id: string) => state.escorts.find(escort => escort.id === id),
    [state.escorts]
  );

  const getFeaturedEscorts = useCallback(
    () => state.featuredEscorts,
    [state.featuredEscorts]
  );

  const updateFilters = useCallback((newFilters: Partial<EscortState['filters']>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: newFilters });
  }, []);

  useEffect(() => {
    try {
      if (escortsNeuralService) {
        const userPrefs = user ? { userId: user.id } : {};
        escortsNeuralService.updateConfig({ 
          ...userPrefs,
          enabled: true,
          priority: 70,
          autonomyLevel: 60,
          resourceAllocation: 50,
          boostingEnabled: true,
          boostingAlgorithm: "OxumAlgorithm",
          orderByBoost: true
        });
      }
    } catch (err) {
      console.error("Error initializing neural service:", err);
    }

    const timer = setTimeout(() => {
      loadEscorts(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [loadEscorts, user]);

  const value: EscortContextValue = {
    state,
    loadEscorts,
    getEscortById,
    getFeaturedEscorts,
    updateFilters,
    escortScraper,
  };

  return <EscortContext.Provider value={value}>{children}</EscortContext.Provider>;
};

export const useEscortContext = (): EscortContextValue => {
  const context = useContext(EscortContext);
  if (context === undefined) {
    throw new Error('useEscortContext must be used within an EscortProvider');
  }
  return context;
};
