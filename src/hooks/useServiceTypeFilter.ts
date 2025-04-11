
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useServiceType } from '@/components/escorts/context/ServiceTypeContext';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook to manage service type filtering with URL param sync
 */
export const useServiceTypeFilter = (options?: {
  onChange?: (type: ServiceTypeFilter) => void;
  syncWithUrl?: boolean;
  paramName?: string;
  initialType?: ServiceTypeFilter;
}) => {
  const {
    syncWithUrl = true,
    paramName = 'service_type',
    initialType = '',
    onChange
  } = options || {};
  
  // Get search params for URL sync
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get context if available
  const serviceTypeContext = useServiceType();
  
  // Local state as fallback if context is not available
  const [localServiceType, setLocalServiceType] = useState<ServiceTypeFilter>(initialType);
  
  const { toast } = useToast();
  
  // Determine if we should use context or local state
  const useContextState = !!serviceTypeContext;
  
  // Current service type is from context if available, otherwise local state
  const serviceType = useContextState 
    ? serviceTypeContext.serviceType
    : localServiceType;
  
  // Initialize from URL if needed
  useEffect(() => {
    if (syncWithUrl) {
      const urlType = searchParams.get(paramName) as ServiceTypeFilter;
      if (urlType && ['in-person', 'virtual', 'both'].includes(urlType)) {
        if (useContextState) {
          serviceTypeContext.setServiceType(urlType);
        } else {
          setLocalServiceType(urlType);
        }
      }
    }
  }, [syncWithUrl, paramName, searchParams, useContextState]);
  
  // Update service type
  const setServiceType = useCallback((type: ServiceTypeFilter) => {
    // Update state (context or local)
    if (useContextState) {
      serviceTypeContext.setServiceType(type);
    } else {
      setLocalServiceType(type);
    }
    
    // Sync with URL if enabled
    if (syncWithUrl) {
      // Create a new URL params object
      const newParams = new URLSearchParams(searchParams.toString());
      
      // If type is empty, remove the param, otherwise set it
      if (!type) {
        newParams.delete(paramName);
      } else {
        newParams.set(paramName, type);
      }
      
      // Update the URL
      setSearchParams(newParams);
    }
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(type);
    }
  }, [useContextState, syncWithUrl, searchParams, setSearchParams, paramName, onChange]);
  
  // Toggle service type
  const toggleServiceType = useCallback((type: ServiceTypeFilter) => {
    const newType = serviceType === type ? '' : type;
    setServiceType(newType);
    
    // Show toast notification
    if (newType) {
      toast({
        title: "Service Type Updated",
        description: useContextState 
          ? serviceTypeContext.getServiceTypeLabel()
          : `Showing ${type === 'in-person' ? 'In-Person' : type === 'virtual' ? 'Virtual' : type === 'both' ? 'Both' : 'All'} Service Types`,
      });
    } else {
      toast({
        title: "Service Type Cleared",
        description: "Showing all service types",
      });
    }
  }, [serviceType, setServiceType, toast, useContextState]);
  
  // Clear service type
  const clearServiceType = useCallback(() => {
    setServiceType('');
  }, [setServiceType]);
  
  return {
    serviceType,
    setServiceType,
    toggleServiceType,
    clearServiceType,
    isInPersonService: serviceType === 'in-person' || serviceType === 'both',
    isVirtualService: serviceType === 'virtual' || serviceType === 'both',
    isBothServiceTypes: serviceType === 'both',
    isAnyServiceType: serviceType === '',
  };
};

export default useServiceTypeFilter;
