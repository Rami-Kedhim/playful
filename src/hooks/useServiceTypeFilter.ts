
import { useState, useCallback } from 'react';
import { getServiceTypeBadgeLabel } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

export const useServiceTypeFilter = (initialTypes: string[] = []) => {
  const [serviceTypes, setServiceTypes] = useState<string[]>(initialTypes);

  const toggleServiceType = useCallback((type: string) => {
    setServiceTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  }, []);

  const clearServiceTypes = useCallback(() => {
    setServiceTypes([]);
  }, []);

  const isServiceTypeSelected = useCallback((type: string) => {
    return serviceTypes.includes(type);
  }, [serviceTypes]);

  return {
    serviceTypes,
    toggleServiceType,
    clearServiceTypes,
    isServiceTypeSelected,
    setServiceTypes
  };
};

export default useServiceTypeFilter;
