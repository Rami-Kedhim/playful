
import { useState } from 'react';

export interface PersonaFilters {
  searchQuery: string;
  types: string[];
  tags: string[];
  verifiedOnly: boolean;
  onlineOnly: boolean;
  premiumOnly: boolean;
  location?: string;
  roleFilters?: string[];
  capabilityFilters?: string[];
}

export const usePersonaFilters = (initialFilters?: Partial<PersonaFilters>) => {
  const [filters, setFilters] = useState<PersonaFilters>({
    searchQuery: '',
    types: [],
    tags: [],
    verifiedOnly: false,
    onlineOnly: false,
    premiumOnly: false,
    location: '',
    roleFilters: [],
    capabilityFilters: [],
    ...initialFilters
  });

  const updateFilters = (newFilters: Partial<PersonaFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      types: [],
      tags: [],
      verifiedOnly: false,
      onlineOnly: false,
      premiumOnly: false,
      location: '',
      roleFilters: [],
      capabilityFilters: []
    });
  };

  return {
    filters,
    updateFilters,
    clearFilters,
    loading: false,
    error: null
  };
};

export default usePersonaFilters;
