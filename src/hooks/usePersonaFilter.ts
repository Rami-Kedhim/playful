
import { useState, useEffect, useMemo } from 'react';
import { UberPersona } from '@/types/UberPersona';
import { useDebounce } from '@/hooks/useDebounce';

interface UsePersonaFilterProps {
  initialPersonas: UberPersona[];
}

interface RoleFilters {
  [key: string]: boolean;
}

interface CapabilityFilters {
  [key: string]: boolean;
}

export function usePersonaFilter({ initialPersonas }: UsePersonaFilterProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [roleFilters, setRoleFilters] = useState<RoleFilters>({
    isEscort: false,
    isCreator: false,
    isLivecam: false,
    isAI: false,
    isVerified: false,
    isFeatured: false
  });
  const [capabilityFilters, setCapabilityFilters] = useState<CapabilityFilters>({
    hasPhotos: false,
    hasVideos: false,
    hasStories: false,
    hasChat: false,
    hasVoice: false,
    hasBooking: false,
    hasLiveStream: false,
    hasExclusiveContent: false
  });

  // Debounce search queries for performance
  const debouncedSearch = useDebounce(searchQuery, 300);
  const debouncedLocation = useDebounce(locationFilter, 300);

  // Toggle a role filter
  const toggleRoleFilter = (role: string) => {
    setRoleFilters(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  // Toggle a capability filter
  const toggleCapabilityFilter = (capability: string) => {
    setCapabilityFilters(prev => ({
      ...prev,
      [capability]: !prev[capability]
    }));
  };

  // Apply filters to personas
  const filteredPersonas = useMemo(() => {
    return initialPersonas.filter(persona => {
      // Search filter
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const matchesSearch = 
          persona.displayName?.toLowerCase().includes(searchLower) || 
          persona.bio?.toLowerCase().includes(searchLower) ||
          persona.tags?.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }
      
      // Location filter
      if (debouncedLocation && persona.location) {
        const locationLower = debouncedLocation.toLowerCase();
        if (!persona.location.toLowerCase().includes(locationLower)) {
          return false;
        }
      }
      
      // Role filters
      const hasActiveRoleFilters = Object.values(roleFilters).some(value => value);
      if (hasActiveRoleFilters && persona.roleFlags) {
        const matchesRoleFilter = Object.entries(roleFilters).some(([role, isActive]) => {
          return isActive && persona.roleFlags && persona.roleFlags[role as keyof typeof persona.roleFlags];
        });
        
        if (!matchesRoleFilter) return false;
      }
      
      // Capability filters
      const hasActiveCapabilityFilters = Object.values(capabilityFilters).some(value => value);
      if (hasActiveCapabilityFilters && persona.capabilities) {
        const matchesCapabilityFilter = Object.entries(capabilityFilters).some(([capability, isActive]) => {
          if (!isActive) return false;
          
          // Handle different capability structures
          if (typeof persona.capabilities === 'object' && !Array.isArray(persona.capabilities)) {
            return persona.capabilities[capability as keyof typeof persona.capabilities];
          } else if (Array.isArray(persona.capabilities)) {
            return persona.capabilities.includes(capability);
          }
          return false;
        });
        
        if (!matchesCapabilityFilter) return false;
      }
      
      return true;
    });
  }, [initialPersonas, debouncedSearch, debouncedLocation, roleFilters, capabilityFilters]);

  return {
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    roleFilters,
    toggleRoleFilter,
    capabilityFilters,
    toggleCapabilityFilter,
    filteredPersonas
  };
}
