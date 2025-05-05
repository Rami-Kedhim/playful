
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ServiceTypeFilter = 'all' | 'in-person' | 'virtual' | 'both';

export interface ServiceTypeContextType {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  supportedServiceTypes?: string[];
  selectedSpecializedTypes?: string[];
  toggleSpecializedType?: (type: string) => void;
  specializedServiceTypes?: string[];
}

const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceTypeFilter: 'all',
  setServiceTypeFilter: () => {},
});

export interface ServiceTypeProviderProps {
  children: ReactNode;
  supportedServiceTypes?: string[];
  filterForbiddenTerms?: boolean;
  onUnsafeTermRemap?: (original: string, remapped: string) => void;
}

export const ServiceTypeProvider: React.FC<ServiceTypeProviderProps> = ({ 
  children,
  supportedServiceTypes = [],
  filterForbiddenTerms = false,
  onUnsafeTermRemap = () => {}
}) => {
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>('all');
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  // Sample specialized service types
  const specializedServiceTypes = [
    'massage', 'dinner', 'travel', 'events', 'overnight',
    'couples', 'fetish', 'domination', 'submission'
  ];
  
  // Toggle specialized type selection with safe handling
  const toggleSpecializedType = (type: string) => {
    if (!type || type === "") return; // Prevent empty strings
    
    setSelectedSpecializedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Safe setter for service type filter
  const safeSetServiceTypeFilter = (type: ServiceTypeFilter | string) => {
    // Default to 'all' if empty or invalid
    const safeType = !type || type === "" ? 'all' : type as ServiceTypeFilter;
    setServiceTypeFilter(safeType);
  };

  return (
    <ServiceTypeContext.Provider value={{
      serviceTypeFilter,
      setServiceTypeFilter: safeSetServiceTypeFilter,
      supportedServiceTypes,
      selectedSpecializedTypes,
      toggleSpecializedType,
      specializedServiceTypes
    }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => {
  const context = useContext(ServiceTypeContext);
  if (!context) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  return context;
};
