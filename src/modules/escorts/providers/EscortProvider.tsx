
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Escort } from '@/types/escort';
import escortService from '../../../services/escortService';

// Define the EscortFilterOptions interface
export interface EscortFilterOptions {
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  serviceType?: string;
  services?: string[];
  rating?: number;
  verifiedOnly?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
}

interface EscortContextState {
  escorts: Escort[];
  loading: boolean;
  error: string | null;
  filters: EscortFilterOptions;
  totalPages: number;
  currentPage: number;
}

export interface EscortContextProps {
  state: EscortContextState;
  loadEscorts: (filters?: EscortFilterOptions | boolean) => Promise<void>;
  getEscortById: (id: string) => Promise<Escort | null>;
  updateFilters: (filters: Partial<EscortFilterOptions>) => void;
}

export const EscortContext = createContext<EscortContextProps>({
  state: {
    escorts: [],
    loading: false,
    error: null,
    filters: {},
    totalPages: 1,
    currentPage: 1
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
    filters: {},
    totalPages: 1,
    currentPage: 1
  });

  // Fetch escorts on initial load
  useEffect(() => {
    loadEscorts();
  }, []);

  // Fetch escorts when filters change
  useEffect(() => {
    loadEscorts(state.filters);
  }, [state.filters]);

  const loadEscorts = async (filters: EscortFilterOptions | boolean = {}) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // If filters is a boolean, it's the useNeuralProcessing flag
      const actualFilters = typeof filters === 'boolean' ? state.filters : filters;
      
      const data = await escortService.getEscorts(actualFilters);
      
      setState(prev => ({ 
        ...prev,
        escorts: data.escorts || [],
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
        loading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
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
