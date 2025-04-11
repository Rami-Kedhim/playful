
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  clearServiceType: () => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

interface ServiceTypeProviderProps {
  children: ReactNode;
  initialServiceType?: ServiceTypeFilter;
}

export const ServiceTypeProvider = ({ 
  children, 
  initialServiceType = "" 
}: ServiceTypeProviderProps) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>(initialServiceType);

  const contextValue: ServiceTypeContextType = {
    serviceType,
    setServiceType,
    isInPersonService: serviceType === 'in-person' || serviceType === 'both',
    isVirtualService: serviceType === 'virtual' || serviceType === 'both',
    isBothServiceTypes: serviceType === 'both',
    clearServiceType: () => setServiceType("")
  };

  return (
    <ServiceTypeContext.Provider value={contextValue}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = (): ServiceTypeContextType => {
  const context = useContext(ServiceTypeContext);
  if (context === undefined) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  return context;
};

export default ServiceTypeContext;
