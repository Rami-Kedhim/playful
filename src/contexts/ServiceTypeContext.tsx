
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ServiceTypeFilter } from '@/types/serviceType';

export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
  toggleServiceType?: (type: ServiceTypeFilter) => void;
  getServiceTypeLabel?: (type: ServiceTypeFilter) => string;
  // Add these properties to fix errors
  specializedServiceTypes: string[];
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
  validateServiceName: (name: string) => boolean;
  getSafeServiceName: (name: string) => string;
}

const defaultServiceTypeContext: ServiceTypeContextType = {
  serviceType: "any",
  setServiceType: () => {},
  isInPersonService: false,
  isVirtualService: false,
  isBothServiceTypes: false,
  isAnyServiceType: true,
  clearServiceType: () => {},
  // Implement the missing properties
  specializedServiceTypes: ['massage', 'dinner', 'in-call', 'out-call', 'companionship'],
  selectedSpecializedTypes: [],
  toggleSpecializedType: () => {},
  validateServiceName: () => true,
  getSafeServiceName: (name) => name,
};

const ServiceTypeContext = createContext<ServiceTypeContextType>(defaultServiceTypeContext);

export function useServiceType() {
  return useContext(ServiceTypeContext);
}

interface ServiceTypeProviderProps {
  children: ReactNode;
}

export const ServiceTypeProvider: React.FC<ServiceTypeProviderProps> = ({ children }) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>("any");
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  const specializedServiceTypes = ['massage', 'dinner', 'in-call', 'out-call', 'companionship'];

  const isInPersonService = serviceType === "in-person" || serviceType === "both" || serviceType === "in-call" || serviceType === "out-call";
  const isVirtualService = serviceType === "virtual" || serviceType === "both";
  const isBothServiceTypes = serviceType === "both";
  const isAnyServiceType = serviceType === "any" || serviceType === "all";

  const clearServiceType = () => setServiceType("any");

  const toggleServiceType = (type: ServiceTypeFilter) => {
    if (serviceType === type) {
      clearServiceType();
    } else {
      setServiceType(type);
    }
  };

  const toggleSpecializedType = (type: string) => {
    setSelectedSpecializedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const getServiceTypeLabel = (type: ServiceTypeFilter): string => {
    switch(type) {
      case "in-person": return "In-Person";
      case "virtual": return "Virtual";
      case "both": return "In-Person & Virtual";
      case "in-call": return "Incall";
      case "out-call": return "Outcall";
      case "massage": return "Massage";
      case "dinner": return "Dinner Date";
      case "any": return "Any Service";
      case "all": return "All Services";
      default: return "Any Service";
    }
  };

  const validateServiceName = (name: string): boolean => {
    return specializedServiceTypes.includes(name.toLowerCase()) || 
      ["in-person", "virtual", "both", "all", "any", "in-call", "out-call"].includes(name.toLowerCase());
  };

  const getSafeServiceName = (name: string): string => {
    return validateServiceName(name) ? name.toLowerCase() : "any";
  };

  return (
    <ServiceTypeContext.Provider value={{
      serviceType,
      setServiceType,
      isInPersonService,
      isVirtualService,
      isBothServiceTypes,
      isAnyServiceType,
      clearServiceType,
      toggleServiceType,
      getServiceTypeLabel,
      specializedServiceTypes,
      selectedSpecializedTypes,
      toggleSpecializedType,
      validateServiceName,
      getSafeServiceName,
    }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export default ServiceTypeContext;
