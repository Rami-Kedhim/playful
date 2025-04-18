
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceTypeFilter as ServiceTypeFilterType } from '@/types/filters';

export { ServiceTypeFilterType as ServiceTypeFilter };

// Define the context type
export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilterType;
  setServiceType: (type: ServiceTypeFilterType) => void;
  specializedServiceTypes: string[];
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
  supportedServiceTypes?: string[];
  filterForbiddenTerms?: boolean;
  onUnsafeTermRemap?: (original: string, remapped: ServiceTypeFilterType) => void;
}

// Create the context with default values
const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: '',
  setServiceType: () => {},
  specializedServiceTypes: [],
  selectedSpecializedTypes: [],
  toggleSpecializedType: () => {}
});

// Create the provider component
export const ServiceTypeProvider: React.FC<{
  children: ReactNode;
  supportedServiceTypes?: string[];
  filterForbiddenTerms?: boolean;
  onUnsafeTermRemap?: (original: string, remapped: ServiceTypeFilterType) => void;
}> = ({ 
  children,
  supportedServiceTypes = ['massage', 'escort', 'dinner', 'companionship', 'travel', 'events'],
  filterForbiddenTerms = true,
  onUnsafeTermRemap
}) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilterType>('');
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);

  const toggleSpecializedType = (type: string) => {
    setSelectedSpecializedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <ServiceTypeContext.Provider value={{
      serviceType,
      setServiceType,
      specializedServiceTypes: supportedServiceTypes,
      selectedSpecializedTypes,
      toggleSpecializedType,
      supportedServiceTypes,
      filterForbiddenTerms,
      onUnsafeTermRemap
    }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

// Create a custom hook for using this context
export const useServiceType = () => {
  const context = useContext(ServiceTypeContext);
  
  if (context === undefined) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  
  return context;
};
