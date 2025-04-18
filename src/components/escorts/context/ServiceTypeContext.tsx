
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceType } from '../filters/ServiceTypeFilterRules';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | 'massage' | 'dinner';

export interface ServiceTypeContextType {
  selectedType: ServiceTypeFilter | null;
  setSelectedType: (type: ServiceTypeFilter | null) => void;
  toggleType: (type: ServiceTypeFilter) => void;
  isTypeSelected: (type: ServiceTypeFilter) => boolean;
  
  // Add these missing properties
  selectedSpecializedTypes: ServiceTypeFilter[];
  toggleSpecializedType: (type: ServiceTypeFilter) => void;
  specializedServiceTypes: ServiceTypeFilter[];
  
  // Add utility methods
  isInPersonService: () => boolean;
  isVirtualService: () => boolean;
  isBothServiceTypes: () => boolean;
  isAnyServiceType: (type: ServiceTypeFilter) => boolean;
  clearServiceType: () => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export const ServiceTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedType, setSelectedType] = useState<ServiceTypeFilter | null>(null);
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<ServiceTypeFilter[]>([]);
  
  // Available specialized service types
  const specializedServiceTypes: ServiceTypeFilter[] = ['massage', 'dinner'];
  
  // Toggle specialized service type selection
  const toggleSpecializedType = (type: ServiceTypeFilter) => {
    setSelectedSpecializedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const toggleType = (type: ServiceTypeFilter) => {
    setSelectedType(prev => (prev === type ? null : type));
  };

  const isTypeSelected = (type: ServiceTypeFilter): boolean => {
    return selectedType === type;
  };
  
  const isInPersonService = (): boolean => selectedType === 'in-person';
  const isVirtualService = (): boolean => selectedType === 'virtual';
  const isBothServiceTypes = (): boolean => selectedType === 'both';
  const isAnyServiceType = (type: ServiceTypeFilter): boolean => selectedType === type;
  const clearServiceType = () => setSelectedType(null);

  return (
    <ServiceTypeContext.Provider
      value={{
        selectedType,
        setSelectedType,
        toggleType,
        isTypeSelected,
        selectedSpecializedTypes,
        toggleSpecializedType,
        specializedServiceTypes,
        isInPersonService,
        isVirtualService,
        isBothServiceTypes,
        isAnyServiceType,
        clearServiceType
      }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceTypeContext = (): ServiceTypeContextType => {
  const context = useContext(ServiceTypeContext);
  if (!context) {
    throw new Error('useServiceTypeContext must be used within a ServiceTypeProvider');
  }
  return context;
};

export default ServiceTypeContext;
