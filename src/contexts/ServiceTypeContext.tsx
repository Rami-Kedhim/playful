
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ServiceTypeFilter = string | null;

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  supportedServiceTypes: string[];
  filterForbiddenTerms: boolean;
  onUnsafeTermRemap: (original: string, remapped: string) => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: null,
  setServiceType: () => {},
  supportedServiceTypes: [],
  filterForbiddenTerms: false,
  onUnsafeTermRemap: () => {},
});

interface ServiceTypeProviderProps {
  children: ReactNode;
  supportedServiceTypes: string[];
  filterForbiddenTerms: boolean;
  onUnsafeTermRemap: (original: string, remapped: string) => void;
}

export const ServiceTypeProvider: React.FC<ServiceTypeProviderProps> = ({
  children,
  supportedServiceTypes,
  filterForbiddenTerms,
  onUnsafeTermRemap,
}) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>(null);

  return (
    <ServiceTypeContext.Provider 
      value={{ 
        serviceType, 
        setServiceType,
        supportedServiceTypes,
        filterForbiddenTerms,
        onUnsafeTermRemap
      }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceTypeContext = () => useContext(ServiceTypeContext);
