
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ServiceTypeFilter = string | null;

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  supportedServiceTypes: string[];
  specializedServiceTypes?: string[];
  selectedSpecializedTypes?: string[];
  toggleSpecializedType?: (type: string) => void;
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
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  const toggleSpecializedType = (type: string) => {
    setSelectedSpecializedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <ServiceTypeContext.Provider 
      value={{ 
        serviceType, 
        setServiceType,
        supportedServiceTypes,
        specializedServiceTypes: supportedServiceTypes,
        selectedSpecializedTypes,
        toggleSpecializedType,
        filterForbiddenTerms,
        onUnsafeTermRemap
      }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceTypeContext = () => useContext(ServiceTypeContext);
export const useServiceType = useServiceTypeContext;
