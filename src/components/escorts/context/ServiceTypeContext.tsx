
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ServiceTypeFilter, getServiceTypeBadgeLabel } from '../filters/ServiceTypeBadgeLabel';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
  toggleServiceType: (type: ServiceTypeFilter) => void;
  getServiceTypeLabel: () => string;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export function ServiceTypeProvider({ children }: { children: ReactNode }) {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>("");
  
  const isInPersonService = serviceType === 'in-person' || serviceType === 'both';
  const isVirtualService = serviceType === 'virtual' || serviceType === 'both';
  const isBothServiceTypes = serviceType === 'both';
  const isAnyServiceType = serviceType === '';
  
  const clearServiceType = () => setServiceType("");
  
  const toggleServiceType = (type: ServiceTypeFilter) => {
    if (serviceType === type) {
      setServiceType("");
    } else {
      setServiceType(type);
    }
  };
  
  const getServiceTypeLabel = () => getServiceTypeBadgeLabel(serviceType);
  
  return (
    <ServiceTypeContext.Provider
      value={{
        serviceType,
        setServiceType,
        isInPersonService,
        isVirtualService,
        isBothServiceTypes,
        isAnyServiceType,
        clearServiceType,
        toggleServiceType,
        getServiceTypeLabel
      }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
}

export function useServiceType() {
  const context = useContext(ServiceTypeContext);
  if (context === undefined) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  return context;
}
