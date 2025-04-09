
import { useState, useMemo, useCallback } from 'react';
import { UberPersona } from '@/types/uberPersona';

interface UsePersonaFilterProps {
  initialPersonas: UberPersona[];
}

export const usePersonaFilter = ({ initialPersonas }: UsePersonaFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [roleFilters, setRoleFilters] = useState<Record<string, boolean>>({
    isEscort: false,
    isCreator: false,
    isLivecam: false,
    isAI: false,
    isVerified: false
  });
  const [capabilityFilters, setCapabilityFilters] = useState<Record<string, boolean>>({
    hasPhotos: false,
    hasVideos: false,
    hasStories: false,
    hasBooking: false
  });
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(99);
  
  const toggleRoleFilter = useCallback((role: keyof UberPersona['roleFlags']) => {
    setRoleFilters(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  }, []);
  
  const toggleCapabilityFilter = useCallback((capability: keyof UberPersona['capabilities']) => {
    setCapabilityFilters(prev => ({
      ...prev,
      [capability]: !prev[capability]
    }));
  }, []);
  
  const filteredPersonas = useMemo(() => {
    return initialPersonas.filter(persona => {
      // Filter by search query
      if (searchQuery && !persona.displayName.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !persona.bio.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by location
      if (locationFilter && !persona.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }
      
      // Filter by age
      if (persona.age < minAge || persona.age > maxAge) {
        return false;
      }
      
      // Filter by roles
      const activeRoleFilters = Object.entries(roleFilters).filter(([_, isActive]) => isActive);
      if (activeRoleFilters.length > 0) {
        const matchesRole = activeRoleFilters.some(([role, _]) => 
          persona.roleFlags[role as keyof UberPersona['roleFlags']]
        );
        if (!matchesRole) return false;
      }
      
      // Filter by capabilities
      const activeCapabilityFilters = Object.entries(capabilityFilters).filter(([_, isActive]) => isActive);
      if (activeCapabilityFilters.length > 0) {
        const matchesCapability = activeCapabilityFilters.some(([capability, _]) => 
          persona.capabilities[capability as keyof UberPersona['capabilities']]
        );
        if (!matchesCapability) return false;
      }
      
      return true;
    });
  }, [
    initialPersonas,
    searchQuery,
    locationFilter,
    minAge,
    maxAge,
    roleFilters,
    capabilityFilters
  ]);
  
  return {
    filteredPersonas,
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    roleFilters,
    toggleRoleFilter,
    capabilityFilters,
    toggleCapabilityFilter,
    minAge,
    setMinAge,
    maxAge,
    setMaxAge
  };
};

export default usePersonaFilter;
