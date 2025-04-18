
import { useState, useCallback, useEffect } from 'react';
import { ServiceType, ServiceTypeContextType } from '@/types/serviceType';

export const getServiceTypeBadgeLabel = (type: ServiceType): string => {
  switch (type) {
    case "in-person":
      return "In-person";
    case "virtual":
      return "Virtual";
    case "both":
      return "In-person & Virtual";
    case "all":
      return "All Types";
    default:
      return "";
  }
};

export const useServiceTypeFilter = (): ServiceTypeContextType => {
  const [serviceType, setServiceType] = useState<ServiceType>("");
  
  const clearServiceType = useCallback(() => {
    setServiceType("");
  }, []);
  
  const isInPersonService = serviceType === "in-person" || serviceType === "both";
  const isVirtualService = serviceType === "virtual" || serviceType === "both";
  const isBothServiceTypes = serviceType === "both";
  const isAnyServiceType = serviceType === "" || serviceType === "all";
  
  return {
    serviceType,
    setServiceType,
    isInPersonService,
    isVirtualService,
    isBothServiceTypes,
    isAnyServiceType,
    clearServiceType
  };
};
