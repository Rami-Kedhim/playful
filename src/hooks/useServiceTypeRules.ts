
import { useState, useCallback } from 'react';
import { ServiceTypeFilter } from '@/types/filters';
import { 
  ForbiddenTerms,
  isAllowedServiceType,
  remapUnsafeService 
} from '@/components/escorts/filters/ServiceTypeFilterRules';

interface ServiceTypeRulesResult {
  checkServiceType: (type: string) => boolean;
  transformUnsafeType: (type: string) => ServiceTypeFilter;
  forbiddenTerms: string[];
  detectedUnsafeTerms: string[];
  hasDetectedUnsafeTerms: boolean;
  clearDetectedTerms: () => void;
}

/**
 * Hook for handling service type content safety rules
 */
export const useServiceTypeRules = (
  enableFiltering: boolean = true,
  onUnsafeTermDetected?: (term: string, replacement: ServiceTypeFilter) => void
): ServiceTypeRulesResult => {
  const [detectedUnsafeTerms, setDetectedUnsafeTerms] = useState<string[]>([]);
  
  /**
   * Check if a service type is allowed based on configured rules
   */
  const checkServiceType = useCallback((type: string): boolean => {
    if (!enableFiltering) return true;
    return isAllowedServiceType(type);
  }, [enableFiltering]);
  
  /**
   * Transform an unsafe service type to a safe alternative
   */
  const transformUnsafeType = useCallback((type: string): ServiceTypeFilter => {
    if (!enableFiltering) return type as ServiceTypeFilter;
    
    if (!isAllowedServiceType(type)) {
      const safeType = remapUnsafeService(type);
      
      // Add to detected terms if not already present
      setDetectedUnsafeTerms(prev => {
        if (!prev.includes(type)) {
          // Call the callback if provided
          if (onUnsafeTermDetected) {
            onUnsafeTermDetected(type, safeType);
          }
          return [...prev, type];
        }
        return prev;
      });
      
      return safeType;
    }
    
    return type as ServiceTypeFilter;
  }, [enableFiltering, onUnsafeTermDetected]);
  
  const clearDetectedTerms = useCallback(() => {
    setDetectedUnsafeTerms([]);
  }, []);
  
  return {
    checkServiceType,
    transformUnsafeType,
    forbiddenTerms: ForbiddenTerms,
    detectedUnsafeTerms,
    hasDetectedUnsafeTerms: detectedUnsafeTerms.length > 0,
    clearDetectedTerms
  };
};

export default useServiceTypeRules;
