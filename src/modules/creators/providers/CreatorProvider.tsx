
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Creator } from '@/hooks/useCreators';
import { CreatorScraper } from '@/services/scrapers/CreatorScraper';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

interface CreatorState {
  creators: Creator[];
  filteredCreators: Creator[];
  selectedCreator: Creator | null;
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

type CreatorAction =
  | { type: 'SET_CREATORS'; payload: Creator[] }
  | { type: 'SET_FILTERED_CREATORS'; payload: Creator[] }
  | { type: 'SET_SELECTED_CREATOR'; payload: Creator | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTERS'; payload: Partial<CreatorState['filters']> }
  | { type: 'RESET_FILTERS' };

interface CreatorContextType {
  state: CreatorState;
  dispatch: React.Dispatch<CreatorAction>;
  loadCreators: (forceRefresh?: boolean) => Promise<void>;
  getCreatorById: (id: string) => Promise<Creator | null>;
  applyFilters: (filters: Partial<CreatorState['filters']>) => void;
  resetFilters: () => void;
}

const initialFilters = {
  categories: [],
  priceRange: [0, 100],
  sortBy: 'recommended',
  rating: 0,
  showAI: true
};

const initialState: CreatorState = {
  creators: [],
  filteredCreators: [],
  selectedCreator: null,
  isLoading: false,
  error: null,
  filters: initialFilters
};

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

const creatorReducer = (state: CreatorState, action: CreatorAction): CreatorState => {
  switch (action.type) {
    case 'SET_CREATORS':
      return { ...state, creators: action.payload, filteredCreators: action.payload };
    case 'SET_FILTERED_CREATORS':
      return { ...state, filteredCreators: action.payload };
    case 'SET_SELECTED_CREATOR':
      return { ...state, selectedCreator: action.payload };
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
        filteredCreators: state.creators 
      };
    default:
      return state;
  }
};

export const CreatorProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(creatorReducer, initialState);
  const { toast } = useToast();
  const { user } = useAuth();
  const creatorScraper = CreatorScraper.getInstance();
  
  // Filter creators based on current filter settings
  const filterCreators = (creators: Creator[], filters: CreatorState['filters']) => {
    return creators.filter(creator => {
      // Filter by categories if any selected
      if (filters.categories.length > 0 && 
          !creator.tags.some(tag => filters.categories.includes(tag))) {
        return false;
      }
      
      // Filter by price range
      if (creator.price < filters.priceRange[0] || 
          creator.price > filters.priceRange[1]) {
        return false;
      }
      
      // Filter by minimum rating
      if (creator.rating < filters.rating) {
        return false;
      }
      
      // Filter AI creators if not shown
      if (!filters.showAI && creator.isAI) {
        return false;
      }
      
      return true;
    });
  };
  
  // Sort creators based on sort setting
  const sortCreators = (creators: Creator[], sortBy: string) => {
    return [...creators].sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'mostSubscribers':
          return b.subscriberCount - a.subscriberCount;
        case 'mostContent':
          const aContent = (a.contentCount?.photos || 0) + (a.contentCount?.videos || 0);
          const bContent = (b.contentCount?.photos || 0) + (b.contentCount?.videos || 0);
          return bContent - aContent;
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
  
  // Apply filters and sorting to creators
  const applyFilters = (filters: Partial<CreatorState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    
    const newFilters = { ...state.filters, ...filters };
    const filtered = filterCreators(state.creators, newFilters);
    const sorted = sortCreators(filtered, newFilters.sortBy);
    
    dispatch({ type: 'SET_FILTERED_CREATORS', payload: sorted });
  };
  
  // Reset filters back to defaults
  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };
  
  // Load creators from scraper
  const loadCreators = async (forceRefresh = false) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      // Configure scraper based on user preferences if available
      if (user?.id && neuralHub.isInitialized()) {
        const userPreferences = await neuralHub.getUserPreferences(user.id);
        if (userPreferences.contentPreferences?.categories?.length > 0) {
          creatorScraper.setCategories(userPreferences.contentPreferences.categories);
        }
      }
      
      // Force refresh if requested
      if (forceRefresh) {
        creatorScraper.clearCache();
      }
      
      // Fetch creators from scraper
      const creators = await creatorScraper.scrape();
      
      // Apply neural processing if available
      let processedCreators = creators;
      if (neuralHub.isInitialized()) {
        processedCreators = await neuralHub.processCreatorProfiles(creators, user?.id);
      }
      
      // Update state with fetched creators
      dispatch({ type: 'SET_CREATORS', payload: processedCreators });
      
      // Apply current filters to new data
      const filtered = filterCreators(processedCreators, state.filters);
      const sorted = sortCreators(filtered, state.filters.sortBy);
      dispatch({ type: 'SET_FILTERED_CREATORS', payload: sorted });
      
    } catch (error) {
      console.error('Failed to load creators:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load creators. Please try again.' });
      
      toast({
        title: 'Error',
        description: 'Failed to load creators. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  // Get a specific creator by ID
  const getCreatorById = async (id: string): Promise<Creator | null> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // First check if we already have it
      const existingCreator = state.creators.find(c => c.id === id);
      if (existingCreator) {
        dispatch({ type: 'SET_SELECTED_CREATOR', payload: existingCreator });
        return existingCreator;
      }
      
      // If not found locally, try to fetch it
      // In a real app, we would fetch from API
      // For demo, we'll simulate by loading all and filtering
      await loadCreators();
      
      const creator = state.creators.find(c => c.id === id) || null;
      dispatch({ type: 'SET_SELECTED_CREATOR', payload: creator });
      
      if (!creator) {
        dispatch({ type: 'SET_ERROR', payload: 'Creator not found' });
      }
      
      return creator;
    } catch (error) {
      console.error('Failed to get creator by ID:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load creator details' });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  // Initialize by loading creators on mount
  useEffect(() => {
    loadCreators();
  }, []);
  
  const contextValue: CreatorContextType = {
    state,
    dispatch,
    loadCreators,
    getCreatorById,
    applyFilters,
    resetFilters
  };
  
  return (
    <CreatorContext.Provider value={contextValue}>
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreatorContext = () => {
  const context = useContext(CreatorContext);
  
  if (context === undefined) {
    throw new Error('useCreatorContext must be used within a CreatorProvider');
  }
  
  return context;
};
