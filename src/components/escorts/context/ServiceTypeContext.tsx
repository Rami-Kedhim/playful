
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ServiceTypeFilter } from '@/types/filters';

export interface ServiceTypeContextType {
  selectedServiceType: ServiceTypeFilter;
  setSelectedServiceType: (type: ServiceTypeFilter) => void;
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
  specializedServiceTypes: string[];
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export interface ServiceTypeProviderProps {
  children: ReactNode;
  supportedServiceTypes?: ServiceTypeFilter[];
  filterForbiddenTerms?: boolean;
  onUnsafeTermRemap?: (original: string, remapped: ServiceTypeFilter) => void;
}

export const ServiceTypeProvider: React.FC<ServiceTypeProviderProps> = ({
  children,
  supportedServiceTypes = ['in-person', 'virtual', 'both', 'massage', 'dinner'],
  filterForbiddenTerms = true,
  onUnsafeTermRemap = () => {}
}) => {
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceTypeFilter>('');
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  // Define specialized service types
  const specializedServiceTypes = [
    'Dinner Date',
    'Massage',
    'Event Companion',
    'Travel Companion',
    'GFE',
    'Overnight'
  ];
  
  const isInPersonService = selectedServiceType === 'in-person';
  const isVirtualService = selectedServiceType === 'virtual';
  const isBothServiceTypes = selectedServiceType === 'both';
  const isAnyServiceType = selectedServiceType === '';
  
  const toggleSpecializedType = (type: string) => {
    setSelectedSpecializedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const clearServiceType = () => {
    setSelectedServiceType('');
    setSelectedSpecializedTypes([]);
  };

  return (
    <ServiceTypeContext.Provider
      value={{
        selectedServiceType,
        setSelectedServiceType,
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

export const useServiceType = (): ServiceTypeContextType => {
  const context = useContext(ServiceTypeContext);
  if (context === undefined) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  return context;
};

export default ServiceTypeContext;
