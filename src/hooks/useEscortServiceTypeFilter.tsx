
import { useCallback } from 'react';
import { useServiceType } from '@/components/escorts/context/ServiceTypeContext';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { useEscortFilter } from './useEscortFilter';

/**
 * Hook that combines the service type context with escort filtering
 * to provide a unified interface for service-based escort filtering.
 * 
 * This hook can be extended to support metaverse integration by adding
 * virtual location and enhanced experience parameters.
 */
export const useEscortServiceTypeFilter = () => {
  const {
    serviceType,
    setServiceType,
    isInPersonService,
    isVirtualService,
    isBothServiceTypes,
    isAnyServiceType,
    clearServiceType,
    toggleServiceType,
    getServiceTypeLabel,
    selectedSpecializedTypes,
    toggleSpecializedType,
    validateServiceName,
    getSafeServiceName
  } = useServiceType();
  
  const {
    serviceTypeFilter,
    setServiceTypeFilter,
    clearFilters
  } = useEscortFilter({ escorts: [] }); // Empty array as we're not using the filtering here
  
  // Keep context and filter state in sync
  const updateServiceType = useCallback((type: ServiceTypeFilter) => {
    setServiceType(type);
    setServiceTypeFilter(type);
  }, [setServiceType, setServiceTypeFilter]);
  
  // Clear both context and filter state
  const resetServiceTypeFilters = useCallback(() => {
    clearServiceType();
    clearFilters();
  }, [clearServiceType, clearFilters]);
  
  // Filter escorts based on specialized service types
  const filterBySpecializedTypes = useCallback((escorts) => {
    if (!selectedSpecializedTypes.length) {
      return escorts;
    }
    
    return escorts.filter(escort => 
      escort.tags && selectedSpecializedTypes.some(type => 
        escort.tags.includes(type)
      )
    );
  }, [selectedSpecializedTypes]);

  // Helper method to check if an escort offers metaverse experiences
  // This supports the Sacred Grid concept mentioned in the document
  const isMetaverseCompatible = useCallback((escort) => {
    return escort.metaverse_enabled || 
           (escort.tags && escort.tags.some(tag => 
             tag.toLowerCase().includes('virtual') || 
             tag.toLowerCase().includes('metaverse')
           ));
  }, []);
  
  return {
    // Service type state and actions from context
    serviceType,
    setServiceType: updateServiceType,
    isInPersonService,
    isVirtualService,
    isBothServiceTypes,
    isAnyServiceType,
    toggleServiceType,
    getServiceTypeLabel,
    
    // Specialized service types
    selectedSpecializedTypes,
    toggleSpecializedType,
    validateServiceName,
    getSafeServiceName,
    filterBySpecializedTypes,
    
    // Metaverse compatibility check
    isMetaverseCompatible,
    
    // Additional actions
    resetServiceTypeFilters,
    
    // Filter state if needed
    filterServiceType: serviceTypeFilter,
  };
};

export default useEscortServiceTypeFilter;
