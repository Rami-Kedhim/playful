
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';
import { useToast } from '@/hooks/use-toast';

interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
  toggleServiceType: (type: ServiceTypeFilter) => void;
  getServiceTypeLabel: () => string;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

interface ServiceTypeProviderProps {
  children: ReactNode;
  initialServiceType?: ServiceTypeFilter;
  onServiceTypeChange?: (type: ServiceTypeFilter) => void;
}

export const ServiceTypeProvider = ({ 
  children, 
  initialServiceType = "",
  onServiceTypeChange
}: ServiceTypeProviderProps) => {
  const [serviceType, setServiceTypeState] = useState<ServiceTypeFilter>(initialServiceType);
  const { toast } = useToast();

  // Wrap the setState to call the callback if provided
  const setServiceType = (type: ServiceTypeFilter) => {
    setServiceTypeState(type);
    if (onServiceTypeChange) {
      onServiceTypeChange(type);
    }
  };
  
  // Clear the service type selection
  const clearServiceType = () => {
    setServiceType("");
  };
  
  // Toggle service type - if the current type is passed, it will be cleared
  const toggleServiceType = (type: ServiceTypeFilter) => {
    if (serviceType === type) {
      clearServiceType();
      toast({
        title: "Service Type Cleared",
        description: "Showing all service types",
      });
    } else {
      setServiceType(type);
      toast({
        title: "Service Type Updated",
        description: getServiceTypeLabel(),
      });
    }
  };
  
  // Get a human-readable label for the current service type
  const getServiceTypeLabel = () => {
    switch(serviceType) {
      case "in-person": return "Showing In-Person Services";
      case "virtual": return "Showing Virtual Services";
      case "both": return "Showing Services with Both Options";
      default: return "Showing All Service Types";
    }
  };
  
  // Derived state
  const contextValue = useMemo(() => ({
    serviceType,
    setServiceType,
    isInPersonService: serviceType === 'in-person' || serviceType === 'both',
    isVirtualService: serviceType === 'virtual' || serviceType === 'both',
    isBothServiceTypes: serviceType === 'both',
    isAnyServiceType: serviceType === '',
    clearServiceType,
    toggleServiceType,
    getServiceTypeLabel
  }), [serviceType]);

  return (
    <ServiceTypeContext.Provider value={contextValue}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = (): ServiceTypeContextType => {
  const context = useContext(ServiceTypeContext);
  if (context === undefined) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  return context;
};

export default ServiceTypeContext;
