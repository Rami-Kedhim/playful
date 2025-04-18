
import { useCallback } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { useServiceType } from '@/components/escorts/context/ServiceTypeContext';
import { getServiceTypeBadgeLabel } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

/**
 * A hook to handle service type filtering operations
 */
export const useServiceTypeFilter = () => {
  const {
    serviceType,
    setServiceType,
    selectedSpecializedTypes,
    toggleSpecializedType,
    isInPersonService,
    isVirtualService,
    isBothServiceTypes,
    isAnyServiceType,
    clearServiceType,
    specializedServiceTypes
  } = useServiceType();
  
  // Toggle the service type (select if not selected, or clear if already selected)
  const toggleServiceType = useCallback((type: ServiceTypeFilter) => {
    if (serviceType === type) {
      clearServiceType();
    } else {
      setServiceType(type);
    }
  }, [serviceType, setServiceType, clearServiceType]);
  
  // Check if a service type is selected
  const isServiceTypeSelected = useCallback((type: ServiceTypeFilter) => {
    return serviceType === type;
  }, [serviceType]);
  
  // Filter escorts by service type
  const filterByServiceType = useCallback((escorts: any[]) => {
    if (!serviceType || escorts.length === 0) {
      return escorts;
    }
    
    return escorts.filter(escort => {
      if (serviceType === 'in-person') {
        return escort.providesInPersonServices;
      }
      if (serviceType === 'virtual') {
        return escort.providesVirtualContent;
      }
      if (serviceType === 'both') {
        return escort.providesInPersonServices && escort.providesVirtualContent;
      }
      // For specialized service types like 'massage', 'dinner', etc.
      return escort.serviceTypes?.includes(serviceType) || 
             escort.services?.includes(serviceType) ||
             escort.tags?.includes(serviceType);
    });
  }, [serviceType]);
  
  // Filter by specialized service types
  const filterBySpecializedTypes = useCallback((escorts: any[]) => {
    if (selectedSpecializedTypes.length === 0) {
      return escorts;
    }
    
    return escorts.filter(escort => {
      const services = [
        ...(escort.serviceTypes || []),
        ...(escort.services || []),
        ...(escort.tags || [])
      ];
      
      return selectedSpecializedTypes.some(type => 
        services.some(service => 
          service.toLowerCase() === type.toLowerCase()
        )
      );
    });
  }, [selectedSpecializedTypes]);
  
  return {
    serviceType,
    setServiceType,
    toggleServiceType,
    isServiceTypeSelected,
    clearServiceType,
    filterByServiceType,
    isInPersonService,
    isVirtualService,
    isBothServiceTypes,
    isAnyServiceType,
    selectedSpecializedTypes,
    toggleSpecializedType,
    specializedServiceTypes,
    filterBySpecializedTypes,
    getServiceTypeLabel: getServiceTypeBadgeLabel
  };
};

export default useServiceTypeFilter;
