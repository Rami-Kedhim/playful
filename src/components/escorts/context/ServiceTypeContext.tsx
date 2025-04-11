
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { ServiceTypeFilter, getServiceTypeBadgeLabel } from '../filters/ServiceTypeBadgeLabel';
import { 
  ServiceType, 
  ForbiddenTerms, 
  isValidServiceType, 
  remapUnsafeService 
} from '../filters/ServiceTypeFilterRules';

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
  // New methods for specialized service types
  specializedServiceTypes: ServiceType[];
  selectedSpecializedTypes: ServiceType[];
  addSpecializedType: (type: ServiceType) => void;
  removeSpecializedType: (type: ServiceType) => void;
  toggleSpecializedType: (type: ServiceType) => void;
  clearSpecializedTypes: () => void;
  // Service validation methods
  validateServiceName: (name: string) => boolean;
  getSafeServiceName: (name: string) => string;
}

interface ServiceTypeProviderProps {
  children: ReactNode;
  supportedServiceTypes?: ServiceType[];
  filterForbiddenTerms?: boolean;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(undefined);

export function ServiceTypeProvider({ 
  children,
  supportedServiceTypes,
  filterForbiddenTerms = true
}: ServiceTypeProviderProps) {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>("");
  const [selectedSpecializedTypes, setSelectedSpecializedTypes] = useState<ServiceType[]>([]);
  
  const isInPersonService = serviceType === 'in-person' || serviceType === 'both';
  const isVirtualService = serviceType === 'virtual' || serviceType === 'both';
  const isBothServiceTypes = serviceType === 'both';
  const isAnyServiceType = serviceType === '';
  
  // Available specialized service types (can be filtered by provider)
  const specializedServiceTypes = supportedServiceTypes || Object.values(ServiceType);
  
  // Basic service type methods
  const clearServiceType = () => setServiceType("");
  
  const toggleServiceType = (type: ServiceTypeFilter) => {
    if (serviceType === type) {
      setServiceType("");
    } else {
      setServiceType(type);
    }
  };
  
  const getServiceTypeLabel = () => getServiceTypeBadgeLabel(serviceType);
  
  // Specialized service type methods
  const addSpecializedType = useCallback((type: ServiceType) => {
    if (!selectedSpecializedTypes.includes(type)) {
      setSelectedSpecializedTypes(prev => [...prev, type]);
    }
  }, [selectedSpecializedTypes]);
  
  const removeSpecializedType = useCallback((type: ServiceType) => {
    setSelectedSpecializedTypes(prev => prev.filter(t => t !== type));
  }, []);
  
  const toggleSpecializedType = useCallback((type: ServiceType) => {
    if (selectedSpecializedTypes.includes(type)) {
      removeSpecializedType(type);
    } else {
      addSpecializedType(type);
    }
  }, [selectedSpecializedTypes, addSpecializedType, removeSpecializedType]);
  
  const clearSpecializedTypes = useCallback(() => {
    setSelectedSpecializedTypes([]);
  }, []);
  
  // Service validation methods
  const validateServiceName = useCallback((name: string): boolean => {
    // Check for forbidden terms if filtering is enabled
    if (filterForbiddenTerms) {
      const containsForbiddenTerm = ForbiddenTerms.some(term => 
        name.toLowerCase().includes(term.toLowerCase())
      );
      
      if (containsForbiddenTerm) {
        return false;
      }
    }
    
    // Check if it's a valid service type or has a valid mapping
    return isValidServiceType(name) || remapUnsafeService(name) !== null;
  }, [filterForbiddenTerms]);
  
  const getSafeServiceName = useCallback((name: string): string => {
    // If it's already valid, just return it
    if (isValidServiceType(name)) {
      return name;
    }
    
    // Try to remap it
    const remappedService = remapUnsafeService(name);
    if (remappedService) {
      return remappedService;
    }
    
    // Nothing worked, just return the original
    return name;
  }, []);
  
  return (
    <ServiceTypeContext.Provider
      value={{
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
        addSpecializedType,
        removeSpecializedType,
        toggleSpecializedType,
        clearSpecializedTypes,
        validateServiceName,
        getSafeServiceName
      }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
}

export function useServiceType() {
  const context = useContext(ServiceTypeContext);
  if (context === undefined) {
    throw new Error('useServiceType must be used within a ServiceTypeProvider');
  }
  return context;
}
