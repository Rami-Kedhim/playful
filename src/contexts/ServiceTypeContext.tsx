
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the service type filter
export type ServiceTypeFilter = 'in-call' | 'out-call' | 'virtual' | 'massage' | 'dinner' | 'any';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  clearFilter: () => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export const ServiceTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('any');

  // Load service type filter from localStorage on initial render
  useEffect(() => {
    const savedServiceType = localStorage.getItem('serviceTypeFilter');
    if (savedServiceType) {
      try {
        // Validate that the saved value is a valid ServiceTypeFilter
        const parsedType = savedServiceType as ServiceTypeFilter;
        if (['in-call', 'out-call', 'virtual', 'massage', 'dinner', 'any'].includes(parsedType)) {
          setServiceType(parsedType);
        }
      } catch (error) {
        console.error('Error parsing saved service type filter:', error);
      }
    }
  }, []);

  // Save service type filter to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('serviceTypeFilter', serviceType);
  }, [serviceType]);

  // Clear the filter
  const clearFilter = () => {
    setServiceType('any');
  };

  return (
    <ServiceTypeContext.Provider value={{ serviceType, setServiceType, clearFilter }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

// Custom hook for using the service type context
export const useServiceType = (): ServiceTypeContextType => {
  const context = useContext(ServiceTypeContext);
  
  if (context === undefined) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  
  return context;
};
