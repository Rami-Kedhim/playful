import { useState, useEffect } from 'react';
import { UberPersona } from '@/types/UberPersona';

interface FilterOptions {
  searchTerm: string;
  category: string;
  location: string;
  minRating: number;
  isVerified: boolean;
}

export function usePersonaFilter(personas: UberPersona[]) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchTerm: '',
    category: 'all',
    location: 'any',
    minRating: 0,
    isVerified: false,
  });
  const [filteredPersonas, setFilteredPersonas] = useState<UberPersona[]>(personas);

  useEffect(() => {
    let results = [...personas];

    if (filterOptions.searchTerm) {
      results = results.filter(persona =>
        persona.displayName?.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())
      );
    }

    if (filterOptions.category !== 'all') {
      results = results.filter(persona => persona.roleFlags?.[filterOptions.category] === true);
    }

    if (filterOptions.location !== 'any') {
      results = results.filter(persona =>
        persona.location?.toLowerCase() === filterOptions.location.toLowerCase()
      );
    }

    if (filterOptions.minRating > 0) {
      results = results.filter(persona => (persona.stats?.rating || 0) >= filterOptions.minRating);
    }

    if (filterOptions.isVerified) {
      results = results.filter(persona => persona.roleFlags?.isVerified === true);
    }

    setFilteredPersonas(results);
  }, [filterOptions, personas]);

  const updateFilterOptions = (newOptions: Partial<FilterOptions>) => {
    setFilterOptions(prevOptions => ({
      ...prevOptions,
      ...newOptions,
    }));
  };

  return {
    filterOptions,
    filteredPersonas,
    updateFilterOptions,
  };
}

export default usePersonaFilter;
