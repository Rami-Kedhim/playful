
import React, { createContext, useState, useContext } from 'react';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';
import { ServiceType } from '../filters/ServiceTypeFilterRules';

// Add missing types for specialized service types
export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  getLabel: (type: ServiceTypeFilter) => string;
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
  specializedServiceTypes: string[];
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
  validateServiceName: (name: string) => boolean;
  getSafeServiceName: (name: string) => string;
}

// Helper function to get label for service type
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch (type) {
    case 'in-person': return 'In Person';
    case 'virtual': return 'Virtual';
    case 'both': return 'In Person & Virtual';
    case 'massage': return 'Massage';
    case 'dinner': return 'Dinner Date';
    default: return 'Any Service Type';
  }
};

const DEFAULT_SPECIALIZED_SERVICES = [
  'Massage',
  'Dinner Date',
  'Companionship',
  'Travel',
  'Overnight',
  'Events',
  'Roleplay',
  'Escort',
  'Dating',
  'Dancing',
];

const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: '',
  setServiceType: () => {},
  getLabel: () => '',
  selectedSpecializedTypes: [],
  toggleSpecializedType: () => {},
  specializedServiceTypes: DEFAULT_SPECIALIZED_SERVICES,
  isInPersonService: false,
  isVirtualService: false,
  isBothServiceTypes: false,
  isAnyServiceType: true,
  clearServiceType: () => {},
  validateServiceName: () => true,
  getSafeServiceName: (name) => name,
});

interface ServiceTypeProviderProps {
  children: React.ReactNode;
  supportedServiceTypes?: ServiceType[];
  filterForbiddenTerms?: boolean;
  onUnsafeTermRemap?: (original: string, remapped: ServiceType) => void;
}

export const ServiceTypeProvider: React.FC<ServiceTypeProviderProps> = ({ 
  children,
  supportedServiceTypes,
  filterForbiddenTerms = true,
  onUnsafeTermRemap
}) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('');
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  // Define available specialized service types
  const specializedServiceTypes = supportedServiceTypes 
    ? supportedServiceTypes.map(type => typeof type === 'string' ? type : type.toString())
    : DEFAULT_SPECIALIZED_SERVICES;

  // Toggle specialized service type selection
  const toggleSpecializedType = (type: string) => {
    setSelectedSpecializedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Service type checks
  const isInPersonService = serviceType === 'in-person';
  const isVirtualService = serviceType === 'virtual';
  const isBothServiceTypes = serviceType === 'both';
  const isAnyServiceType = serviceType === '';

  // Clear the service type
  const clearServiceType = () => {
    setServiceType('');
    setSelectedSpecializedTypes([]);
  };

  // Validate service name against platform guidelines
  const validateServiceName = (name: string): boolean => {
    // Simplified validation - in real app would check against terms of service
    return !name.toLowerCase().includes('illegal');
  };

  // Get safe version of service name
  const getSafeServiceName = (name: string): string => {
    // Simplified implementation
    return name;
  };

  const getLabel = (type: ServiceTypeFilter): string => {
    return getServiceTypeBadgeLabel(type);
  };

  return (
    <ServiceTypeContext.Provider value={{ 
      serviceType, 
      setServiceType, 
      getLabel,
      selectedSpecializedTypes,
      toggleSpecializedType,
      specializedServiceTypes,
      isInPersonService,
      isVirtualService,
      isBothServiceTypes,
      isAnyServiceType,
      clearServiceType,
      validateServiceName,
      getSafeServiceName
    }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => useContext(ServiceTypeContext);

export default ServiceTypeContext;
