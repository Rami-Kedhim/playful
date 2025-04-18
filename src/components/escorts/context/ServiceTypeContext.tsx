
import React, { createContext, useState, useContext } from 'react';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';
import { getServiceTypeBadgeLabel } from '../filters/ServiceTypeBadgeLabel';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  getLabel: (type: ServiceTypeFilter) => string;
}

const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: '',
  setServiceType: () => {},
  getLabel: () => ''
});

export const ServiceTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('');

  const getLabel = (type: ServiceTypeFilter): string => {
    return getServiceTypeBadgeLabel(type);
  };

  return (
    <ServiceTypeContext.Provider value={{ serviceType, setServiceType, getLabel }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => useContext(ServiceTypeContext);

export default ServiceTypeContext;
