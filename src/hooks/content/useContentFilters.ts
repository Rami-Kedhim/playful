
import { useState, useCallback, useMemo } from 'react';
import { ContentFilters } from '@/services/messaging/types';

const defaultFilters: ContentFilters = {
  status: undefined,
  searchQuery: '',
  contentType: '',
  sort: 'newest'
};

export const useContentFilters = (initialFilters: Partial<ContentFilters> = {}) => {
  const [filters, setFilters] = useState<ContentFilters>({
    ...defaultFilters,
    ...initialFilters
  });

  const updateFilter = useCallback((
    key: keyof ContentFilters,
    value: string | undefined
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const setMultipleFilters = useCallback((newFilters: Partial<ContentFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // Add updateFilters method for compatibility
  const updateFilters = useCallback((newFilters: Partial<ContentFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // Add filteredContent method
  const filteredContent = useCallback((content: any[]) => {
    return content.filter(item => {
      // Filter by search query
      if (filters.searchQuery && !item.title?.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by content type
      if (filters.contentType && item.contentType !== filters.contentType) {
        return false;
      }
      
      // Filter by status
      if (filters.status && item.status !== filters.status) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    setMultipleFilters,
    updateFilters,
    filteredContent
  };
};
