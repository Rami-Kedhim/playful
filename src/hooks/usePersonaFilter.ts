
import { useState, useEffect, useMemo } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { getPersonaType } from '@/utils/personaHelpers';

export interface FilterOptions {
  searchTerm: string;
  location: string;
  roleFilters: Record<string, boolean>;
  capabilityFilters: Record<string, boolean>;
}

const filterByTypeFlag = (personas: UberPersona[], typeFlag: string) => {
  if (!personas) return [];
  
  return personas.filter(persona => {
    // Check if roleFlags exists and if the specific typeFlag is true
    if (persona.roleFlags && persona.roleFlags[typeFlag as keyof typeof persona.roleFlags]) {
      return true;
    }
    return false;
  });
};

const filterByCapabilityFlag = (personas: UberPersona[], capabilityFlag: string) => {
  if (!personas) return [];
  
  return personas.filter(persona => {
    // Check if capabilities exists and if the specific capabilityFlag is true
    if (persona.capabilities && persona.capabilities[capabilityFlag as keyof typeof persona.capabilities]) {
      return true;
    }
    return false;
  });
};

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
          results = filterByTypeFlag(results, role);
        }
      });
    }

    if (filterOptions.capabilityFilters) {
      Object.entries(filterOptions.capabilityFilters).forEach(([capability, active]) => {
        if (active) {
          results = filterByCapabilityFlag(results, capability);
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
