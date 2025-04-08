
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Escort } from '@/types/escort';
import { EscortScraper } from '@/services/scrapers/EscortScraper';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

interface EscortState {
  escorts: Escort[];
  filteredEscorts: Escort[];
  selectedEscort: Escort | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    location: string;
    services: string[];
    gender: string;
    availability: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
  };
}

type EscortAction =
  | { type: 'SET_ESCORTS'; payload: Escort[] }
  | { type: 'SET_FILTERED_ESCORTS'; payload: Escort[] }
  | { type: 'SET_SELECTED_ESCORT'; payload: Escort | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTERS'; payload: Partial<EscortState['filters']> }
  | { type: 'RESET_FILTERS' };

interface EscortContextType {
  state: EscortState;
  dispatch: React.Dispatch<EscortAction>;
  loadEscorts: (forceRefresh?: boolean) => Promise<void>;
  getEscortById: (id: string) => Promise<Escort | null>;
  applyFilters: (filters: Partial<EscortState['filters']>) => void;
  resetFilters: () => void;
}

const initialFilters = {
  location: '',
  services: [],
  gender: '',
  availability: '',
  minPrice: 0,
  maxPrice: 1000,
  sortBy: 'recommended'
};

const initialState: EscortState = {
  escorts: [],
  filteredEscorts: [],
  selectedEscort: null,
  isLoading: false,
  error: null,
  filters: initialFilters
};

const EscortContext = createContext<EscortContextType | undefined>(undefined);

const escortReducer = (state: EscortState, action: EscortAction): EscortState => {
  switch (action.type) {
    case 'SET_ESCORTS':
      return { ...state, escorts: action.payload, filteredEscorts: action.payload };
    case 'SET_FILTERED_ESCORTS':
      return { ...state, filteredEscorts: action.payload };
    case 'SET_SELECTED_ESCORT':
      return { ...state, selectedEscort: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload }
      };
    case 'RESET_FILTERS':
      return { 
        ...state, 
        filters: initialFilters,
        filteredEscorts: state.escorts 
      };
    default:
      return state;
  }
};

export const EscortProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(escortReducer, initialState);
  const { toast } = useToast();
  const { user } = useAuth();
  const escortScraper = EscortScraper.getInstance();
  
  // Filter escorts based on current filter settings
  const filterEscorts = (escorts: Escort[], filters: EscortState['filters']) => {
    return escorts.filter(escort => {
      // Location filter
      if (filters.location && !escort.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Services filter
      if (filters.services.length > 0 && 
          !filters.services.some(service => escort.services?.includes(service))) {
        return false;
      }
      
      // Gender filter
      if (filters.gender && escort.gender !== filters.gender) {
        return false;
      }
      
      // Availability filter
      if (filters.availability === 'availableNow' && !escort.availableNow) {
        return false;
      }
      
      // Price filter
      const price = escort.price || escort.rates?.hourly || 0;
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }
      
      return true;
    });
  };
  
  // Sort escorts based on sort setting
  const sortEscorts = (escorts: Escort[], sortBy: string) => {
    return [...escorts].sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return (a.price || a.rates?.hourly || 0) - (b.price || b.rates?.hourly || 0);
        case 'priceDesc':
          return (b.price || b.rates?.hourly || 0) - (a.price || a.rates?.hourly || 0);
        case 'rating':
          return b.rating - a.rating;
        case 'recommended':
          // Use neural hub to get recommendations if available
          const aScore = a.neuralScore || a.rating || 0;
          const bScore = b.neuralScore || b.rating || 0;
          return bScore - aScore;
        default:
          return 0;
      }
    });
  };
  
  // Apply filters and sorting to escorts
  const applyFilters = (filters: Partial<EscortState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    
    const newFilters = { ...state.filters, ...filters };
    const filtered = filterEscorts(state.escorts, newFilters);
    const sorted = sortEscorts(filtered, newFilters.sortBy);
    
    dispatch({ type: 'SET_FILTERED_ESCORTS', payload: sorted });
  };
  
  // Reset filters back to defaults
  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };
  
  // Load escorts from scraper
  const loadEscorts = async (forceRefresh = false) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      // Configure scraper based on user preferences if available
      if (user?.id && neuralHub.isInitialized()) {
        const userPreferences = await neuralHub.getUserPreferences(user.id);
        if (userPreferences.region) {
          escortScraper.setRegion(userPreferences.region);
        }
      }
      
      // Force refresh if requested
      if (forceRefresh) {
        escortScraper.clearCache();
      }
      
      // Fetch escorts from scraper
      const escorts = await escortScraper.scrape();
      
      // Apply neural processing if available
      let processedEscorts = escorts;
      if (neuralHub.isInitialized()) {
        processedEscorts = await neuralHub.processEscortProfiles(escorts, user?.id);
      }
      
      // Update state with fetched escorts
      dispatch({ type: 'SET_ESCORTS', payload: processedEscorts });
      
      // Apply current filters to new data
      const filtered = filterEscorts(processedEscorts, state.filters);
      const sorted = sortEscorts(filtered, state.filters.sortBy);
      dispatch({ type: 'SET_FILTERED_ESCORTS', payload: sorted });
      
    } catch (error) {
      console.error('Failed to load escorts:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load escorts. Please try again.' });
      
      toast({
        title: 'Error',
        description: 'Failed to load escorts. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  // Get a specific escort by ID
  const getEscortById = async (id: string): Promise<Escort | null> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // First check if we already have it
      const existingEscort = state.escorts.find(e => e.id === id);
      if (existingEscort) {
        dispatch({ type: 'SET_SELECTED_ESCORT', payload: existingEscort });
        return existingEscort;
      }
      
      // If not found locally, try to fetch it
      // In a real app, we would fetch from API
      // For demo, we'll simulate by loading all and filtering
      await loadEscorts();
      
      const escort = state.escorts.find(e => e.id === id) || null;
      dispatch({ type: 'SET_SELECTED_ESCORT', payload: escort });
      
      if (!escort) {
        dispatch({ type: 'SET_ERROR', payload: 'Escort not found' });
      }
      
      return escort;
    } catch (error) {
      console.error('Failed to get escort by ID:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load escort details' });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  // Initialize by loading escorts on mount
  useEffect(() => {
    loadEscorts();
  }, []);
  
  const contextValue: EscortContextType = {
    state,
    dispatch,
    loadEscorts,
    getEscortById,
    applyFilters,
    resetFilters
  };
  
  return (
    <EscortContext.Provider value={contextValue}>
      {children}
    </EscortContext.Provider>
  );
};

export const useEscortContext = () => {
  const context = useContext(EscortContext);
  
  if (context === undefined) {
    throw new Error('useEscortContext must be used within an EscortProvider');
  }
  
  return context;
};
