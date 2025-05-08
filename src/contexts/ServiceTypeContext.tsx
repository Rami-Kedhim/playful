
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ServiceType } from '@/types/serviceType';

// Export ServiceTypeFilter type to fix import errors
export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "all";

export interface ServiceTypeContextType {
  serviceType: ServiceType;
  setServiceType: (type: ServiceType) => void;
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
  toggleServiceType?: (type: ServiceType) => void;
  getServiceTypeLabel?: (type: ServiceType) => string;
  // Add these properties to fix errors
  specializedServiceTypes: string[];
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
  validateServiceName: (name: string) => boolean;
  getSafeServiceName: (name: string) => string;
}

const defaultServiceTypeContext: ServiceTypeContextType = {
  serviceType: "",
  setServiceType: () => {},
  isInPersonService: false,
  isVirtualService: false,
  isBothServiceTypes: false,
  isAnyServiceType: true,
  clearServiceType: () => {},
  // Implement the missing properties
  specializedServiceTypes: ['massage', 'dinner', 'incall', 'outcall', 'companionship'],
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
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<string[]>([]);
  const specializedServiceTypes = ['massage', 'dinner', 'incall', 'outcall', 'companionship'];

  const isInPersonService = serviceType === "in-person" || serviceType === "both" || serviceType === "incall" || serviceType === "outcall";
  const isVirtualService = serviceType === "virtual" || serviceType === "both";
  const isBothServiceTypes = serviceType === "both";
  const isAnyServiceType = serviceType === "" || serviceType === "all" || serviceType === "any";

  const clearServiceType = () => setServiceType("");

  const toggleServiceType = (type: ServiceType) => {
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

  const getServiceTypeLabel = (type: ServiceType): string => {
    switch(type) {
      case "in-person": return "In-Person";
      case "virtual": return "Virtual";
      case "both": return "In-Person & Virtual";
      case "incall": return "Incall";
      case "outcall": return "Outcall";
      case "massage": return "Massage";
      case "dinner": return "Dinner Date";
      default: return "Any Service";
    }
  };

  const validateServiceName = (name: string): boolean => {
    return specializedServiceTypes.includes(name.toLowerCase()) || 
      ["in-person", "virtual", "both", "all", "any"].includes(name.toLowerCase());
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
