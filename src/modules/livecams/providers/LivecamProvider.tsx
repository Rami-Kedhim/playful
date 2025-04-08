
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { LivecamModel } from '@/types/livecams';
import { LivecamScraper } from '@/services/scrapers/LivecamScraper';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

interface LivecamState {
  livecams: LivecamModel[];
  filteredLivecams: LivecamModel[];
  selectedLivecam: LivecamModel | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: 'all' | 'live' | 'offline';
    categories: string[];
    gender: string;
    region: string;
    minViewers: number;
    sortBy: string;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  }
}

type LivecamAction =
  | { type: 'SET_LIVECAMS'; payload: LivecamModel[] }
  | { type: 'SET_FILTERED_LIVECAMS'; payload: LivecamModel[] }
  | { type: 'SET_SELECTED_LIVECAM'; payload: LivecamModel | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTERS'; payload: Partial<LivecamState['filters']> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_PAGINATION'; payload: Partial<LivecamState['pagination']> };

interface LivecamContextType {
  state: LivecamState;
  dispatch: React.Dispatch<LivecamAction>;
  loadLivecams: (forceRefresh?: boolean) => Promise<void>;
  getLivecamById: (id: string) => Promise<LivecamModel | null>;
  applyFilters: (filters: Partial<LivecamState['filters']>) => void;
  resetFilters: () => void;
  loadMore: () => Promise<void>;
}

const initialFilters = {
  status: 'all' as const,
  categories: [],
  gender: '',
  region: '',
  minViewers: 0,
  sortBy: 'recommended'
};

const initialPagination = {
  page: 1,
  pageSize: 20,
  total: 0,
  hasMore: false
};

const initialState: LivecamState = {
  livecams: [],
  filteredLivecams: [],
  selectedLivecam: null,
  isLoading: false,
  error: null,
  filters: initialFilters,
  pagination: initialPagination
};

const LivecamContext = createContext<LivecamContextType | undefined>(undefined);

const livecamReducer = (state: LivecamState, action: LivecamAction): LivecamState => {
  switch (action.type) {
    case 'SET_LIVECAMS':
      return { ...state, livecams: action.payload };
    case 'SET_FILTERED_LIVECAMS':
      return { ...state, filteredLivecams: action.payload };
    case 'SET_SELECTED_LIVECAM':
      return { ...state, selectedLivecam: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        pagination: { ...initialPagination } // Reset pagination when filters change
      };
    case 'RESET_FILTERS':
      return { 
        ...state, 
        filters: initialFilters,
        pagination: initialPagination
      };
    case 'SET_PAGINATION':
      return { 
        ...state, 
        pagination: { ...state.pagination, ...action.payload }
      };
    default:
      return state;
  }
};

export const LivecamProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(livecamReducer, initialState);
  const { toast } = useToast();
  const { user } = useAuth();
  const livecamScraper = LivecamScraper.getInstance();
  
  // Filter livecams based on current filter settings
  const filterLivecams = (livecams: LivecamModel[], filters: LivecamState['filters']) => {
    return livecams.filter(livecam => {
      // Status filter
      if (filters.status === 'live' && !livecam.isLive) {
        return false;
      }
      if (filters.status === 'offline' && livecam.isLive) {
        return false;
      }
      
      // Categories filter
      if (filters.categories.length > 0 && 
          !livecam.categories?.some(cat => filters.categories.includes(cat))) {
        return false;
      }
      
      // Gender filter (if implemented in livecam model)
      if (filters.gender && livecam.gender && livecam.gender !== filters.gender) {
        return false;
      }
      
      // Region filter
      if (filters.region && livecam.country && !livecam.country.includes(filters.region)) {
        return false;
      }
      
      // Minimum viewers filter
      if (livecam.viewerCount && livecam.viewerCount < filters.minViewers) {
        return false;
      }
      
      return true;
    });
  };
  
  // Sort livecams based on sort setting
  const sortLivecams = (livecams: LivecamModel[], sortBy: string) => {
    return [...livecams].sort((a, b) => {
      switch (sortBy) {
        case 'viewers':
          return (b.viewerCount || 0) - (a.viewerCount || 0);
        case 'newest':
          return new Date(b.startTime || '').getTime() - new Date(a.startTime || '').getTime();
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'recommended':
          // Use neural hub to get recommendations if available
          const aScore = a.boostScore || a.rating || 0;
          const bScore = b.boostScore || b.rating || 0;
          return bScore - aScore;
        default:
          return 0;
      }
    });
  };
  
  // Apply filters and sorting to livecams
  const applyFilters = (filters: Partial<LivecamState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    
    const newFilters = { ...state.filters, ...filters };
    const filtered = filterLivecams(state.livecams, newFilters);
    const sorted = sortLivecams(filtered, newFilters.sortBy);
    
    dispatch({ type: 'SET_FILTERED_LIVECAMS', payload: sorted });
    dispatch({ 
      type: 'SET_PAGINATION', 
      payload: { 
        total: filtered.length,
        hasMore: filtered.length > state.pagination.pageSize 
      } 
    });
  };
  
  // Reset filters back to defaults
  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
    
    const filtered = filterLivecams(state.livecams, initialFilters);
    const sorted = sortLivecams(filtered, initialFilters.sortBy);
    
    dispatch({ type: 'SET_FILTERED_LIVECAMS', payload: sorted });
    dispatch({ 
      type: 'SET_PAGINATION', 
      payload: { 
        total: filtered.length,
        hasMore: filtered.length > initialPagination.pageSize 
      } 
    });
  };
  
  // Load more livecams (pagination)
  const loadMore = async () => {
    const { page, pageSize, hasMore } = state.pagination;
    
    if (!hasMore) {
      return;
    }
    
    const nextPage = page + 1;
    const filtered = filterLivecams(state.livecams, state.filters);
    const sorted = sortLivecams(filtered, state.filters.sortBy);
    
    const start = 0;
    const end = nextPage * pageSize;
    const paginated = sorted.slice(start, end);
    
    dispatch({ type: 'SET_FILTERED_LIVECAMS', payload: paginated });
    dispatch({ 
      type: 'SET_PAGINATION', 
      payload: { 
        page: nextPage,
        hasMore: end < filtered.length 
      } 
    });
  };
  
  // Load livecams from scraper
  const loadLivecams = async (forceRefresh = false) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      // Configure scraper based on user preferences if available
      if (user?.id && neuralHub.isInitialized()) {
        const userPreferences = await neuralHub.getUserPreferences(user.id);
        if (userPreferences.contentPreferences?.categories?.length > 0) {
          livecamScraper.setCategories(userPreferences.contentPreferences.categories);
        }
      }
      
      // Force refresh if requested
      if (forceRefresh) {
        livecamScraper.clearCache();
      }
      
      // Fetch livecams from scraper
      const livecams = await livecamScraper.scrape();
      
      // Apply neural processing if available
      let processedLivecams = livecams;
      if (neuralHub.isInitialized()) {
        processedLivecams = await neuralHub.processLivecams(livecams, user?.id);
      }
      
      // Update state with fetched livecams
      dispatch({ type: 'SET_LIVECAMS', payload: processedLivecams });
      
      // Apply current filters to new data
      const filtered = filterLivecams(processedLivecams, state.filters);
      const sorted = sortLivecams(filtered, state.filters.sortBy);
      
      // Apply pagination
      const { pageSize } = state.pagination;
      const paginated = sorted.slice(0, pageSize);
      
      dispatch({ type: 'SET_FILTERED_LIVECAMS', payload: paginated });
      dispatch({ 
        type: 'SET_PAGINATION', 
        payload: { 
          page: 1,
          total: filtered.length,
          hasMore: filtered.length > pageSize 
        } 
      });
      
    } catch (error) {
      console.error('Failed to load livecams:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load livecams. Please try again.' });
      
      toast({
        title: 'Error',
        description: 'Failed to load livecams. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  // Get a specific livecam by ID
  const getLivecamById = async (id: string): Promise<LivecamModel | null> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // First check if we already have it
      const existingLivecam = state.livecams.find(l => l.id === id);
      if (existingLivecam) {
        dispatch({ type: 'SET_SELECTED_LIVECAM', payload: existingLivecam });
        return existingLivecam;
      }
      
      // If not found locally, try to fetch it
      // In a real app, we would fetch from API
      // For demo, we'll simulate by loading all and filtering
      await loadLivecams();
      
      const livecam = state.livecams.find(l => l.id === id) || null;
      dispatch({ type: 'SET_SELECTED_LIVECAM', payload: livecam });
      
      if (!livecam) {
        dispatch({ type: 'SET_ERROR', payload: 'Livecam not found' });
      }
      
      return livecam;
    } catch (error) {
      console.error('Failed to get livecam by ID:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load livecam details' });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  // Initialize by loading livecams on mount
  useEffect(() => {
    loadLivecams();
  }, []);
  
  const contextValue: LivecamContextType = {
    state,
    dispatch,
    loadLivecams,
    getLivecamById,
    applyFilters,
    resetFilters,
    loadMore
  };
  
  return (
    <LivecamContext.Provider value={contextValue}>
      {children}
    </LivecamContext.Provider>
  );
};

export const useLivecamContext = () => {
  const context = useContext(LivecamContext);
  
  if (context === undefined) {
    throw new Error('useLivecamContext must be used within a LivecamProvider');
  }
  
  return context;
};
