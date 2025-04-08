
import { useState, useEffect } from 'react';
import { Escort } from '@/types/escort';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';

interface UseEscortsOptions {
  initialData?: Escort[];
  filters?: {
    location?: string;
    services?: string[];
    gender?: string;
    availability?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  };
}

export const useEscorts = (options: UseEscortsOptions = {}) => {
  const { state, loadEscorts, applyFilters, resetFilters } = useEscortContext();
  const [initialized, setInitialized] = useState(false);
  
  // Apply initial filters if provided
  useEffect(() => {
    if (options.filters && !initialized) {
      applyFilters(options.filters);
      setInitialized(true);
    }
  }, [options.filters, initialized]);
  
  // Function to fetch escorts with optional force refresh
  const fetchEscorts = async (forceRefresh = false) => {
    await loadEscorts(forceRefresh);
  };
  
  // Function to update filters
  const updateFilters = (newFilters: Partial<typeof options.filters>) => {
    applyFilters(newFilters);
  };
  
  return {
    escorts: state.filteredEscorts,
    allEscorts: state.escorts,
    loading: state.isLoading,
    error: state.error,
    filters: state.filters,
    fetchEscorts,
    updateFilters,
    resetFilters
  };
};

export default useEscorts;
