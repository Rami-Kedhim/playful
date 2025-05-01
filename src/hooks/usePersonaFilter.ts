
import { useState, useCallback } from 'react';
import { UberPersona } from '@/types/uberPersona';

export const usePersonaFilter = (personas: UberPersona[] = []) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    types: [] as string[],
    tags: [] as string[],
    verifiedOnly: false,
    onlineOnly: false,
    premiumOnly: false
  });

  const filteredPersonas = personas.filter(persona => {
    // Filter by type
    if (filters.types.length > 0) {
      if (!filters.types.includes(persona.type)) {
        return false;
      }
    }
    
    // Filter by roleFlags
    if (filters.verifiedOnly && (!persona.roleFlags || !persona.roleFlags.isVerified)) {
      return false;
    }
    
    // Filter by capabilities
    if (filters.onlineOnly && (!persona.isOnline)) {
      return false;
    }
    
    // Filter by premium status
    if (filters.premiumOnly && !persona.isPremium) {
      return false;
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = persona.name.toLowerCase().includes(query);
      const matchesDisplayName = persona.displayName ? persona.displayName.toLowerCase().includes(query) : false;
      const matchesLocation = persona.location ? persona.location.toLowerCase().includes(query) : false;
      const matchesTags = persona.tags ? persona.tags.some(tag => tag.toLowerCase().includes(query)) : false;
      
      if (!matchesName && !matchesDisplayName && !matchesLocation && !matchesTags) {
        return false;
      }
    }
    
    // Filter by tags
    if (filters.tags.length > 0) {
      if (!persona.tags || !filters.tags.some(tag => persona.tags!.includes(tag))) {
        return false;
      }
    }
    
    return true;
  });

  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    filters,
    updateFilters,
    filteredPersonas
  };
};

export default usePersonaFilter;
