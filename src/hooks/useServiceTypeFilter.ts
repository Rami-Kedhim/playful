
import { useState, useCallback, useEffect } from 'react';
import { ServiceType, ServiceTypeContextType } from '@/types/serviceType';
import { getServiceTypeBadgeLabel } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

export const useServiceTypeFilter = (): ServiceTypeContextType => {
  const [serviceType, setServiceType] = useState<ServiceType>("");
  
  const clearServiceType = useCallback(() => {
    setServiceType("");
  }, []);
  
  const isInPersonService = serviceType === "in-person" || serviceType === "both";
  const isVirtualService = serviceType === "virtual" || serviceType === "both";
  const isBothServiceTypes = serviceType === "both";
  const isAnyServiceType = serviceType === "" || serviceType === "all";
  
  const toggleServiceType = useCallback((type: ServiceType) => {
    setServiceType(current => current === type ? "" : type);
  }, []);
  
  const getServiceTypeLabel = useCallback((type: ServiceType): string => {
    return getServiceTypeBadgeLabel(type);
  }, []);
  
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  const toggleSpecializedType = useCallback((type: string) => {
    setSelectedSpecializedTypes(current => 
      current.includes(type) 
        ? current.filter(t => t !== type) 
        : [...current, type]
    );
  }, []);
  
  const validateServiceName = useCallback((name: string): boolean => {
    return /^[a-zA-Z0-9_\- ]{3,30}$/.test(name);
  }, []);
  
  const getSafeServiceName = useCallback((name: string): string => {
    return name.trim().toLowerCase().replace(/[^a-z0-9_\-]/g, "-");
  }, []);
  
  return {
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
  };
};
