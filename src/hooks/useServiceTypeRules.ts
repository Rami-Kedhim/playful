
import { useState, useCallback } from 'react';
import { 
  ServiceType, 
  ForbiddenTerms, 
  isValidServiceType, 
  remapUnsafeService 
} from '@/components/escorts/filters/ServiceTypeFilterRules';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook that provides utilities for working with service type rules
 */
export const useServiceTypeRules = () => {
  const [checkedServices, setCheckedServices] = useState<string[]>([]);
  const { toast } = useToast();
  
  /**
   * Validates if a service name is compliant with platform rules
   */
  const validateServiceName = useCallback((serviceName: string): boolean => {
    // Check for forbidden terms
    const containsForbiddenTerm = ForbiddenTerms.some(term => 
      serviceName.toLowerCase().includes(term.toLowerCase())
    );
    
    if (containsForbiddenTerm) {
      return false;
    }
    
    // Check if it's a valid service type or has a valid mapping
    return isValidServiceType(serviceName) || remapUnsafeService(serviceName) !== null;
  }, []);
  
  /**
   * Gets a safe service name, remapping if necessary
   */
  const getSafeServiceName = useCallback((serviceName: string): string => {
    // If it's already valid, just return it
    if (isValidServiceType(serviceName)) {
      return serviceName;
    }
    
    // Try to remap it
    const remappedService = remapUnsafeService(serviceName);
    if (remappedService) {
      return remappedService;
    }
    
    // Nothing worked, just return the original
    return serviceName;
  }, []);
  
  /**
   * Adds a service to the checked list if it complies with rules
   */
  const addCheckedService = useCallback((serviceName: string): boolean => {
    if (!validateServiceName(serviceName)) {
      toast({
        title: "Service not available",
        description: "This service does not comply with our platform guidelines.",
        variant: "destructive",
      });
      return false;
    }
    
    const safeName = getSafeServiceName(serviceName);
    setCheckedServices(prev => [...prev, safeName]);
    return true;
  }, [validateServiceName, getSafeServiceName, toast]);
  
  /**
   * Removes a service from the checked list
   */
  const removeCheckedService = useCallback((serviceName: string) => {
    setCheckedServices(prev => prev.filter(name => name !== serviceName));
  }, []);
  
  /**
   * Toggles a service in the checked list
   */
  const toggleCheckedService = useCallback((serviceName: string): boolean => {
    if (checkedServices.includes(serviceName)) {
      removeCheckedService(serviceName);
      return true;
    } else {
      return addCheckedService(serviceName);
    }
  }, [checkedServices, addCheckedService, removeCheckedService]);
  
  /**
   * Clears all checked services
   */
  const clearCheckedServices = useCallback(() => {
    setCheckedServices([]);
  }, []);
  
  /**
   * Gets all valid service types for display in UI
   */
  const getAllValidServiceTypes = useCallback((): ServiceType[] => {
    return Object.values(ServiceType);
  }, []);
  
  return {
    checkedServices,
    validateServiceName,
    getSafeServiceName,
    addCheckedService,
    removeCheckedService,
    toggleCheckedService,
    clearCheckedServices,
    getAllValidServiceTypes,
  };
};

export default useServiceTypeRules;
