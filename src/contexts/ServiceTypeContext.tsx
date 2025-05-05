
import React, { createContext, useContext, useState } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  specializedServiceTypes?: string[];
  selectedSpecializedTypes?: string[];
  toggleSpecializedType?: (type: string) => void;
}

const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: 'any', // Use 'any' instead of empty string
  setServiceType: () => {}
});

export const ServiceTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('any'); // Use 'any' instead of empty string
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  
  // Sample specialized service types
  const specializedServiceTypes = [
    "Massage",
    "Dinner Date",
    "Travel Companion",
    "BDSM",
    "Roleplay",
    "Couples",
    "Groups",
    "Fetish"
  ];
  
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
      specializedServiceTypes,
      selectedSpecializedTypes,
      toggleSpecializedType
    }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => useContext(ServiceTypeContext);

export default ServiceTypeContext;
