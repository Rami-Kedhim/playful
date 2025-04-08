import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Creator } from '@/hooks/useCreators';
import { CreatorScraper } from '@/services/scrapers/CreatorScraper';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { creatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

interface CreatorState {
  creators: Creator[];
  featuredCreators: Creator[];
  isLoading: boolean;
  error: string | null;
  filters: {
    categories: string[];
    priceRange: [number, number];
    sortBy: string;
    rating: number;
    showAI: boolean;
  };
}

interface CreatorContextValue {
  state: CreatorState;
  loadCreators: (useNeuralProcessing?: boolean) => Promise<Creator[]>;
  getCreatorById: (id: string) => Creator | undefined;
  getFeaturedCreators: () => Creator[];
  updateFilters: (newFilters: Partial<CreatorState['filters']>) => void;
  creatorScraper: CreatorScraper;
}

interface CreatorProviderProps {
  children: React.ReactNode;
}

type CreatorAction =
  | { type: 'SET_CREATORS'; payload: Creator[] }
  | { type: 'SET_FEATURED_CREATORS'; payload: Creator[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_FILTERS'; payload: Partial<CreatorState['filters']> };

const initialState: CreatorState = {
  creators: [],
  featuredCreators: [],
  isLoading: false,
  error: null,
  filters: {
    categories: [],
    priceRange: [0, 100],
    sortBy: 'recommended',
    rating: 0,
    showAI: true,
  },
};

const creatorReducer = (state: CreatorState, action: CreatorAction): CreatorState => {
  switch (action.type) {
    case 'SET_CREATORS':
      return { ...state, creators: action.payload };
    case 'SET_FEATURED_CREATORS':
      return { ...state, featuredCreators: action.payload };
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

const CreatorContext = createContext<CreatorContextValue | undefined>(undefined);

export const CreatorProvider: React.FC<CreatorProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(creatorReducer, initialState);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const creatorScraper = React.useMemo(() => CreatorScraper.getInstance(), []);

  const loadCreators = useCallback(async (useNeuralProcessing = false): Promise<Creator[]> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (state.filters.categories.length > 0) {
        // Set categories in the scraper when implemented
      }
      
      const fetchedCreators = await creatorScraper.scrape();
      
      let processedCreators = [...fetchedCreators];
      if (useNeuralProcessing) {
        try {
          processedCreators = processedCreators.sort((a, b) => {
            const scoreA = a.rating || 0;
            const scoreB = b.rating || 0;
            return scoreB - scoreA;
          });
        } catch (err) {
          console.error("Error in neural processing:", err);
        }
      }

      let filteredCreators = processedCreators;
      
      if (!state.filters.showAI) {
        filteredCreators = filteredCreators.filter(creator => !creator.isAI);
      }
      
      if (state.filters.rating > 0) {
        filteredCreators = filteredCreators.filter(
          creator => (creator.rating || 0) >= state.filters.rating
        );
      }
      
      filteredCreators = filteredCreators.filter(
        creator => 
          creator.price >= state.filters.priceRange[0] && 
          creator.price <= state.filters.priceRange[1]
      );

      switch (state.filters.sortBy) {
        case 'priceAsc':
          filteredCreators.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          filteredCreators.sort((a, b) => b.price - a.price);
          break;
        case 'mostSubscribers':
          filteredCreators.sort((a, b) => (b.subscriberCount || 0) - (a.subscriberCount || 0));
          break;
        case 'rating':
          filteredCreators.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }

      const featured = filteredCreators
        .filter(creator => creator.isPremium)
        .slice(0, 8);

      dispatch({ type: 'SET_CREATORS', payload: filteredCreators });
      dispatch({ type: 'SET_FEATURED_CREATORS', payload: featured });
      return filteredCreators;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load creators";
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast({
        title: "Failed to load creators",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [creatorScraper, state.filters, toast]);

  const getCreatorById = useCallback(
    (id: string) => state.creators.find(creator => creator.id === id),
    [state.creators]
  );

  const getFeaturedCreators = useCallback(
    () => state.featuredCreators,
    [state.featuredCreators]
  );

  const updateFilters = useCallback((newFilters: Partial<CreatorState['filters']>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: newFilters });
  }, []);

  useEffect(() => {
    try {
      if (creatorsNeuralService) {
        const userPrefs = user ? { userId: user.id } : {};
        creatorsNeuralService.configure({ 
          ...userPrefs,
          resourcePriority: 'medium'
        });
      }
    } catch (err) {
      console.error("Error initializing neural service:", err);
    }

    loadCreators();
  }, [loadCreators, user]);

  const value: CreatorContextValue = {
    state,
    loadCreators,
    getCreatorById,
    getFeaturedCreators,
    updateFilters,
    creatorScraper,
  };

  return <CreatorContext.Provider value={value}>{children}</CreatorContext.Provider>;
};

export const useCreatorContext = (): CreatorContextValue => {
  const context = useContext(CreatorContext);
  if (context === undefined) {
    throw new Error('useCreatorContext must be used within a CreatorProvider');
  }
  return context;
};
