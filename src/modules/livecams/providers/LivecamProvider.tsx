
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { LivecamModel } from '@/types/livecams';
import { LivecamScraper } from '@/services/scrapers/LivecamScraper';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { livecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

// Types
interface LivecamState {
  livecams: LivecamModel[];
  featuredLivecams: LivecamModel[];
  isLoading: boolean;
  error: string | null;
  filters: {
    categories: string[];
    viewers: [number, number]; // Min, Max
    sortBy: string;
    showOffline: boolean;
  };
}

interface LivecamContextValue {
  state: LivecamState;
  loadLivecams: (useNeuralProcessing?: boolean) => Promise<LivecamModel[]>;
  getLivecamById: (id: string) => LivecamModel | undefined;
  getFeaturedLivecams: () => LivecamModel[];
  updateFilters: (newFilters: Partial<LivecamState['filters']>) => void;
  livecamScraper: LivecamScraper;
}

interface LivecamProviderProps {
  children: React.ReactNode;
}

// Actions
type LivecamAction =
  | { type: 'SET_LIVECAMS'; payload: LivecamModel[] }
  | { type: 'SET_FEATURED_LIVECAMS'; payload: LivecamModel[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_FILTERS'; payload: Partial<LivecamState['filters']> };

// Initial state
const initialState: LivecamState = {
  livecams: [],
  featuredLivecams: [],
  isLoading: false,
  error: null,
  filters: {
    categories: [],
    viewers: [0, 10000],
    sortBy: 'recommended',
    showOffline: false,
  },
};

// Reducer
const livecamReducer = (state: LivecamState, action: LivecamAction): LivecamState => {
  switch (action.type) {
    case 'SET_LIVECAMS':
      return { ...state, livecams: action.payload };
    case 'SET_FEATURED_LIVECAMS':
      return { ...state, featuredLivecams: action.payload };
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
const LivecamContext = createContext<LivecamContextValue | undefined>(undefined);

// Helper function for sorting
const sortLivecams = (models: LivecamModel[], sortBy: string): LivecamModel[] => {
  const sortedModels = [...models];
  
  switch (sortBy) {
    case 'viewers-high':
      return sortedModels.sort((a, b) => (b.viewerCount || 0) - (a.viewerCount || 0));
    case 'viewers-low':
      return sortedModels.sort((a, b) => (a.viewerCount || 0) - (b.viewerCount || 0));
    case 'newest':
      return sortedModels.sort((a, b) => {
        return 0; // In a real app, sort by start time
      });
    default:
      return sortedModels;
  }
};

// Provider
export const LivecamProvider: React.FC<LivecamProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(livecamReducer, initialState);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Initialize livecam scraper
  const livecamScraper = React.useMemo(() => LivecamScraper.getInstance(), []);

  const loadLivecams = useCallback(async (useNeuralProcessing = false): Promise<LivecamModel[]> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Apply filters to scraper
      if (state.filters.categories.length > 0) {
        // When implemented, set categories in scraper
      }
      
      // Fetch livecams through the scraper
      const fetchedLivecams = await livecamScraper.scrape();
      
      // Process through neural hub if enabled
      let processedLivecams = [...fetchedLivecams];
      if (useNeuralProcessing) {
        try {
          // Sort livecams based on preferences and relevancy
          // This is a placeholder until we have actual neural scoring
        } catch (err) {
          console.error("Error in neural processing:", err);
        }
      }

      // Apply filters client-side
      let filteredLivecams = processedLivecams;
      
      // Filter by status (online/offline)
      if (!state.filters.showOffline) {
        filteredLivecams = filteredLivecams.filter(model => model.isLive);
      }
      
      // Filter by viewer count
      filteredLivecams = filteredLivecams.filter(
        model => 
          (model.viewerCount || 0) >= state.filters.viewers[0] && 
          (model.viewerCount || 0) <= state.filters.viewers[1]
      );
      
      // Filter by categories
      if (state.filters.categories.length > 0) {
        filteredLivecams = filteredLivecams.filter(model => 
          state.filters.categories.some(cat => 
            model.categories?.includes(cat)
          )
        );
      }

      // Sort livecams
      filteredLivecams = sortLivecams(filteredLivecams, state.filters.sortBy);

      // Extract featured livecams - prioritize those currently live
      const featured = filteredLivecams
        .filter(model => model.isLive)
        .sort((a, b) => (b.viewerCount || 0) - (a.viewerCount || 0))
        .slice(0, 8);

      dispatch({ type: 'SET_LIVECAMS', payload: filteredLivecams });
      dispatch({ type: 'SET_FEATURED_LIVECAMS', payload: featured });
      return filteredLivecams;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load livecams";
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast({
        title: "Failed to load livecams",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [livecamScraper, state.filters, toast]);

  const getLivecamById = useCallback(
    (id: string) => state.livecams.find(model => model.id === id),
    [state.livecams]
  );

  const getFeaturedLivecams = useCallback(
    () => state.featuredLivecams,
    [state.featuredLivecams]
  );

  const updateFilters = useCallback((newFilters: Partial<LivecamState['filters']>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: newFilters });
  }, []);

  // Initial load effect
  useEffect(() => {
    // Set up neural service if available
    try {
      if (livecamsNeuralService) {
        // Initialize with user preferences if available
        const userPrefs = user ? { userId: user.id } : {};
        livecamsNeuralService.configure({ 
          ...userPrefs,
          resourcePriority: 'high'
        });
      }
    } catch (err) {
      console.error("Error initializing neural service:", err);
    }

    // Load initial livecam data
    loadLivecams();
  }, [loadLivecams, user]);

  // Context value
  const value: LivecamContextValue = {
    state,
    loadLivecams,
    getLivecamById,
    getFeaturedLivecams,
    updateFilters,
    livecamScraper,
  };

  return <LivecamContext.Provider value={value}>{children}</LivecamContext.Provider>;
};

// Hook for using the livecam context
export const useLivecamContext = (): LivecamContextValue => {
  const context = useContext(LivecamContext);
  if (context === undefined) {
    throw new Error('useLivecamContext must be used within a LivecamProvider');
  }
  return context;
};
