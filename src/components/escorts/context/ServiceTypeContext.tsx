
import React, { createContext, useState, useContext, useCallback } from 'react';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  isServiceTypeAllowed: (serviceType: ServiceTypeFilter) => boolean;
  formatServiceType: (serviceType: string) => ServiceTypeFilter;
  getServiceTypeLabel: (serviceType: ServiceTypeFilter) => string;
  // Add missing properties
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
  specializedServiceTypes: string[];
}

const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: '',
  setServiceType: () => {},
  isServiceTypeAllowed: () => true,
  formatServiceType: () => '',
  getServiceTypeLabel: () => '',
  // Initialize new properties
  selectedSpecializedTypes: [],
  toggleSpecializedType: () => {},
  isInPersonService: false,
  isVirtualService: false,
  isBothServiceTypes: false,
  isAnyServiceType: true,
  clearServiceType: () => {},
  specializedServiceTypes: [],
});

export const ServiceTypeProvider: React.FC<{ 
  children: React.ReactNode;
  supportedServiceTypes?: string[];
  filterForbiddenTerms?: boolean;
  onUnsafeTermRemap?: (original: string, remapped: ServiceTypeFilter) => void;
}> = ({ 
  children, 
  supportedServiceTypes = [], 
  filterForbiddenTerms = true,
  onUnsafeTermRemap 
}) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('');
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  // Define specialized service types
  const specializedServiceTypes = [
    "Massage",
    "Dinner Date",
    "Roleplay",
    "GFE",
    "Overnight",
    "Travel Companion",
    "BDSM",
    "Couples"
  ];
  
  const isServiceTypeAllowed = (type: ServiceTypeFilter): boolean => {
    const allowedTypes: ServiceTypeFilter[] = ['in-person', 'virtual', 'both', 'massage', 'dinner', ''];
    return allowedTypes.includes(type);
  };
  
  const formatServiceType = (inputType: string): ServiceTypeFilter => {
    switch (inputType.toLowerCase()) {
      case 'in-person':
      case 'in person':
      case 'inperson':
      case 'real':
      case 'physical':
        return 'in-person';
      case 'virtual':
      case 'online':
      case 'digital':
      case 'remote':
        return 'virtual';
      case 'both':
      case 'all':
      case 'in-person & virtual':
      case 'inperson & virtual':
        return 'both';
      case 'massage':
        return 'massage';
      case 'dinner':
      case 'dinner date':
        return 'dinner';
      default:
        return '';
    }
  };
  
  const getServiceTypeLabel = (type: ServiceTypeFilter): string => {
    switch (type) {
      case 'in-person':
        return 'In-Person';
      case 'virtual':
        return 'Virtual';
      case 'both':
        return 'In-Person & Virtual';
      case 'massage':
        return 'Massage';
      case 'dinner':
        return 'Dinner Date';
      default:
        return '';
    }
  };
  
  // Toggle a specialized service type
  const toggleSpecializedType = useCallback((type: string) => {
    setSelectedSpecializedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(item => item !== type);
      } else {
        return [...prev, type];
      }
    });
  }, []);
  
  // Clear service type
  const clearServiceType = useCallback(() => {
    setServiceType('');
  }, []);
  
  // Computed properties for service type states
  const isInPersonService = serviceType === 'in-person';
  const isVirtualService = serviceType === 'virtual';
  const isBothServiceTypes = serviceType === 'both';
  const isAnyServiceType = serviceType === '' || !serviceType;
  
  return (
    <ServiceTypeContext.Provider
      value={{
        serviceType,
        setServiceType,
        isServiceTypeAllowed,
        formatServiceType,
        getServiceTypeLabel,
        // Add new properties
        selectedSpecializedTypes,
        toggleSpecializedType,
        isInPersonService,
        isVirtualService,
        isBothServiceTypes,
        isAnyServiceType,
        clearServiceType,
        specializedServiceTypes,
      }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => useContext(ServiceTypeContext);
