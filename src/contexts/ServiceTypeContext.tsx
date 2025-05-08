
import React, { createContext, useContext, useState } from 'react';
export type ServiceTypeFilter = 'any' | 'in-call' | 'out-call' | 'virtual' | 'massage' | 'dinner';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  clearServiceType: () => void;
  specializedServiceTypes: string[];
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export const ServiceTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('any');
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  // Available specialized service types
  const specializedServiceTypes = [
    'BDSM', 'GFE', 'Massage', 'Roleplay', 'Fetish', 'Couples'
  ];
  
  const clearServiceType = () => {
    setServiceType('any');
  };
  
  const toggleSpecializedType = (type: string) => {
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
      clearServiceType,
      specializedServiceTypes,
      selectedSpecializedTypes,
      toggleSpecializedType
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
