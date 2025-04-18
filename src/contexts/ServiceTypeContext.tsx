
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  specializedServiceTypes: string[];
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
  clearSpecializedTypes: () => void;
  hasActiveFilters: boolean;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export const ServiceTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>(null);
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  // Predefined specialized service types
  const specializedServiceTypes = [
    'Massage',
    'Dinner Date',
    'Travel Companion',
    'Role Play',
    'Coaching',
    'Event Companion',
    'Video Chat',
    'Photo Content'
  ];
  
  const toggleSpecializedType = (type: string) => {
    setSelectedSpecializedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const clearSpecializedTypes = () => {
    setSelectedSpecializedTypes([]);
  };
  
  const hasActiveFilters = serviceType !== null || selectedSpecializedTypes.length > 0;
  
  return (
    <ServiceTypeContext.Provider value={{
      serviceType,
      setServiceType,
      specializedServiceTypes,
      selectedSpecializedTypes,
      toggleSpecializedType,
      clearSpecializedTypes,
      hasActiveFilters
    }}>
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
