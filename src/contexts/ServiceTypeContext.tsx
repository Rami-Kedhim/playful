
import React, { createContext, useContext, useState } from 'react';

// Define and export the ServiceTypeFilter type 
export type ServiceTypeFilter = 'all' | 'incall' | 'outcall' | 'virtual' | '';

export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: 'all',
  setServiceType: () => {}
});

export const ServiceTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('all');

  return (
    <ServiceTypeContext.Provider value={{ serviceType, setServiceType }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => useContext(ServiceTypeContext);

export default ServiceTypeContext;
