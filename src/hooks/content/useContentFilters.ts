
import { useState, useCallback } from 'react';
import { ContentFilters } from '@/services/messaging/types';

const defaultFilters: ContentFilters = {
  status: undefined,
  searchQuery: '',
  contentType: '',
  sort: 'newest'
};

export const useContentFilters = () => {
  const [filters, setFilters] = useState<ContentFilters>(defaultFilters);

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

  return {
    filters,
    updateFilter,
    resetFilters,
    setMultipleFilters
  };
};
