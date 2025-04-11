import { useCallback } from 'react';
import { useServiceType } from '@/components/escorts/context/ServiceTypeContext';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { useEscortFilter } from './useEscortFilter';

/**
 * Hook that combines the service type context with escort filtering
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
    getServiceTypeLabel
  } = useServiceType();
  
  const {
    serviceTypeFilter,
    setServiceTypeFilter,
    // Include other filter properties as needed
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
    
    // Additional actions
    resetServiceTypeFilters,
    
    // Filter state if needed
    filterServiceType: serviceTypeFilter,
  };
};

export default useEscortServiceTypeFilter;
