
import { useState, useCallback } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

interface UseEscortServiceTypeFilterResult {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  isServiceTypeSelected: (type: ServiceTypeFilter) => boolean;
  clearServiceType: () => void;
}

export const useEscortServiceTypeFilter = (
  initialValue: ServiceTypeFilter = 'any'
): UseEscortServiceTypeFilterResult => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>(initialValue);
  
  const isServiceTypeSelected = useCallback((type: ServiceTypeFilter) => {
    return serviceType === type;
  }, [serviceType]);
  
  const clearServiceType = useCallback(() => {
    setServiceType('any');
  }, []);
  
  return {
    serviceType,
    setServiceType,
    isServiceTypeSelected,
    clearServiceType
  };
};

export default useEscortServiceTypeFilter;
