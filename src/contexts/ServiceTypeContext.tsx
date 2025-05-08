
import React, { createContext, useContext, useState } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  clearServiceType: () => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export const ServiceTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('any');
  
  const clearServiceType = () => {
    setServiceType('any');
  };

  return (
    <ServiceTypeContext.Provider value={{ 
      serviceType, 
      setServiceType, 
      clearServiceType 
    }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => {
  const context = useContext(ServiceTypeContext);
  if (context === undefined) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  return context;
};
