
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Escort, EscortFilterOptions } from '@/types/escort';
import { EscortScraper } from '@/services/scrapers/EscortScraper';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
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
    escortType: "verified" | "ai" | "provisional" | "all";  // Added escort type filter
    language: string[];  // Added language filter
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
    escortType: "all", // Default to showing all escort types
    language: [], // Default to no language filter
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
  const { user } = useAuth();
  
  // Initialize escort scraper
  const escortScraper = React.useMemo(() => EscortScraper.getInstance(), []);

  const loadEscorts = useCallback(async (useNeuralProcessing = false): Promise<Escort[]> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Apply filters to scraper
      if (state.filters.location) {
        escortScraper.setFilters({
          region: state.filters.location,
        });
      }
      
      let processedEscorts: Escort[] = [];
      
      // Only perform scraping if neural processing is not enabled
      // This addresses the premature scraping issue
      if (!useNeuralProcessing) {
        // Fetch escorts directly from cache if available
        processedEscorts = escortScraper.getCachedResults();
      } else {
        try {
          // Process through neural hub if enabled
          // This will use BrainHub.query() as specified in requirements
          const neuralQuery = {
            filters: state.filters,
            boostingEnabled: escortsNeuralService.getConfig().boostingEnabled,
            boostingAlgorithm: escortsNeuralService.getConfig().boostingAlgorithm,
            orderByBoost: escortsNeuralService.getConfig().orderByBoost
          };
          
          // Use BrainHub to fetch and process escorts
          processedEscorts = await neuralHub.processQuery(
            'escorts',
            neuralQuery
          ) as Escort[];
          
          // Tag escorts based on their profile type for differentiation
          processedEscorts = processedEscorts.map(escort => ({
            ...escort,
            profileType: escort.verified ? 'verified' : 
                       escort.isAI ? 'ai' : 'provisional'
          }));
          
          // Apply sorting based on boost level if enabled
          if (escortsNeuralService.getConfig().orderByBoost) {
            processedEscorts = processedEscorts.sort((a, b) => {
              // First sort by boost level
              const boostDiff = (b.boostLevel || 0) - (a.boostLevel || 0);
              if (boostDiff !== 0) return boostDiff;
              
              // Then by other criteria like verification status
              if (a.verified && !b.verified) return -1;
              if (!a.verified && b.verified) return 1;
              
              // Then by rating
              return b.rating - a.rating;
            });
          }
        } catch (err) {
          console.error("Error in neural processing:", err);
          // Fallback to cached results if neural processing fails
          processedEscorts = escortScraper.getCachedResults();
        }
      }

      // Extract featured escorts
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

  // Initialize escorts and setup neural service
  useEffect(() => {
    // Set up neural service if available
    try {
      if (escortsNeuralService) {
        // Initialize with user preferences if available
        const userPrefs = user ? { userId: user.id } : {};
        escortsNeuralService.updateConfig({ 
          ...userPrefs,
          resourceAllocation: 'high',
          boostingEnabled: true,
          boostingAlgorithm: "OxumAlgorithm",
          orderByBoost: true
        });
      }
    } catch (err) {
      console.error("Error initializing neural service:", err);
    }

    // Delay initial load until neural system is ready 
    // (prevents premature scraping)
    const timer = setTimeout(() => {
      loadEscorts(true); // Always use neural processing for initial load
    }, 500);
    
    return () => clearTimeout(timer);
  }, [loadEscorts, user]);

  // Context value
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

// Hook for using the escort context
export const useEscortContext = (): EscortContextValue => {
  const context = useContext(EscortContext);
  if (context === undefined) {
    throw new Error('useEscortContext must be used within an EscortProvider');
  }
  return context;
};
