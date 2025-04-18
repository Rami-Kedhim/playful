
import React, { createContext, useState, useContext } from 'react';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  isServiceTypeAllowed: (serviceType: ServiceTypeFilter) => boolean;
  formatServiceType: (serviceType: string) => ServiceTypeFilter;
  getServiceTypeLabel: (serviceType: ServiceTypeFilter) => string;
}

const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: '',
  setServiceType: () => {},
  isServiceTypeAllowed: () => true,
  formatServiceType: () => '',
  getServiceTypeLabel: () => '',
});

export const ServiceTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('');
  
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
  
  return (
    <ServiceTypeContext.Provider
      value={{
        serviceType,
        setServiceType,
        isServiceTypeAllowed,
        formatServiceType,
        getServiceTypeLabel,
      }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => useContext(ServiceTypeContext);
