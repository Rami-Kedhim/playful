
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Escort } from '@/types/escort';
import escortService from '../../../services/escortService';
import { EscortFilterOptions } from '@/types/escortTypes';

// Define the EscortContextState interface
export interface EscortContextState {
  escorts: Escort[];
  loading: boolean;
  error: string | null;
  filters: EscortFilterOptions;
  totalPages: number;
  currentPage: number;
  featuredEscorts: Escort[];
  isLoading: boolean;
}

export interface EscortContextProps {
  state: EscortContextState;
  loadEscorts: (filters?: EscortFilterOptions | boolean) => Promise<void>;
  getEscortById: (id: string) => Promise<Escort | null>;
  updateFilters: (filters: Partial<EscortFilterOptions>) => void;
}

// Default empty filter object
const defaultFilters: EscortFilterOptions = {
  gender: [],
  serviceType: [],
  serviceTypes: [],
  priceRange: [0, 1000],
  ageRange: [18, 99],
  language: [],
  location: "",
  verified: false,
  rating: 0,
  availableNow: false,
  escortType: "all"
};

export const EscortContext = createContext<EscortContextProps>({
  state: {
    escorts: [],
    loading: false,
    error: null,
    filters: defaultFilters,
    totalPages: 1,
    currentPage: 1,
    featuredEscorts: [],
    isLoading: false
  },
  loadEscorts: async () => {},
  getEscortById: async () => null,
  updateFilters: () => {}
});

// Add this hook for consuming the context
export const useEscortContext = () => useContext(EscortContext);

export const EscortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<EscortContextState>({
    escorts: [],
    loading: false,
    error: null,
    filters: defaultFilters,
    totalPages: 1,
    currentPage: 1,
    featuredEscorts: [],
    isLoading: false
  });

  // Whenever state.loading changes, update isLoading
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isLoading: prev.loading
    }));
  }, [state.loading]);

  // Fetch escorts on initial load
  useEffect(() => {
    loadEscorts(defaultFilters);
  }, []);

  // Fetch escorts when filters change
  useEffect(() => {
    loadEscorts(state.filters);
  }, [state.filters]);

  const loadEscorts = async (filters: EscortFilterOptions | boolean = defaultFilters) => {
    try {
      setState(prev => ({ ...prev, loading: true, isLoading: true, error: null }));
      
      // If filters is a boolean, it's the useNeuralProcessing flag
      const actualFilters = typeof filters === 'boolean' ? state.filters : filters;
      
      const data = await escortService.getEscorts(actualFilters);
      
      // Extract featured escorts
      const featured = data.escorts ? data.escorts.filter(escort => escort.featured) : [];
      
      setState(prev => ({ 
        ...prev,
        escorts: data.escorts || [],
        featuredEscorts: featured,
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
        loading: false,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false,
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load escorts'
      }));
    }
  };

  const getEscortById = async (id: string): Promise<Escort | null> => {
    try {
      return await escortService.getEscortById(id);
    } catch (error) {
      console.error('Error fetching escort by ID:', error);
      return null;
    }
  };

  const updateFilters = (filters: Partial<EscortFilterOptions>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  };

  const contextValue: EscortContextProps = {
    state,
    loadEscorts,
    getEscortById,
    updateFilters
  };

  return (
    <EscortContext.Provider value={contextValue}>
      {children}
    </EscortContext.Provider>
  );
};
