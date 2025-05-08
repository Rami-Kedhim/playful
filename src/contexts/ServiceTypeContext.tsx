
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import ServiceTypeFilter from the correct location
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  clearFilter: () => void;
  specializedServiceTypes?: string[];
  selectedSpecializedTypes?: string[];
  toggleSpecializedType?: (type: string) => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export const ServiceTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('any');
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  // Sample specialized service types
  const specializedServiceTypes = [
    'massage', 'dinner', 'travel', 'events', 'overnight',
    'couples', 'fetish', 'domination', 'submission'
  ];

  // Load service type filter from localStorage on initial render
  useEffect(() => {
    const savedServiceType = localStorage.getItem('serviceTypeFilter');
    if (savedServiceType) {
      try {
        // Validate that the saved value is a valid ServiceTypeFilter
        const parsedType = savedServiceType as ServiceTypeFilter;
        if (['in-call', 'out-call', 'virtual', 'massage', 'dinner', 'any', 'in-person', 'both'].includes(parsedType)) {
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

  // Toggle specialized type selection
  const toggleSpecializedType = (type: string) => {
    if (!type || type === "") return;
    
    setSelectedSpecializedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  return (
    <ServiceTypeContext.Provider value={{ 
      serviceType, 
      setServiceType, 
      clearFilter,
      specializedServiceTypes,
      selectedSpecializedTypes,
      toggleSpecializedType
    }}>
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
