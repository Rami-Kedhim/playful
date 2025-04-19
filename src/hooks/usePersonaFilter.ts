
import { useState, useEffect } from 'react';
import { UberPersona } from '@/types/UberPersona';

export interface FilterOptions {
  searchTerm: string;
  location: string;
  roleFilters: Record<string, boolean>;
  capabilityFilters: Record<string, boolean>;
}

export function usePersonaFilter(personas: UberPersona[]) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchTerm: '',
    location: '',
    roleFilters: {},
    capabilityFilters: {},
  });
  const [filteredPersonas, setFilteredPersonas] = useState<UberPersona[]>(personas);

  useEffect(() => {
    let results = [...personas];

    const searchTerm = filterOptions.searchTerm.toLowerCase();
    if (searchTerm) {
      results = results.filter(persona =>
        persona.displayName?.toLowerCase().includes(searchTerm)
      );
    }

    if (filterOptions.location) {
      results = results.filter(persona =>
        persona.location?.toLowerCase().includes(filterOptions.location.toLowerCase())
      );
    }

    if (filterOptions.roleFilters) {
      Object.entries(filterOptions.roleFilters).forEach(([role, active]) => {
        if (active) {
          results = results.filter(persona =>
            persona.roleFlags ? persona.roleFlags[role as keyof typeof persona.roleFlags] === true : false
          );
        }
      });
    }

    if (filterOptions.capabilityFilters) {
      Object.entries(filterOptions.capabilityFilters).forEach(([capability, active]) => {
        if (active) {
          results = results.filter(persona =>
            persona.capabilities ? Boolean(persona.capabilities[capability as keyof typeof persona.capabilities]) : false
          );
        }
      });
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
