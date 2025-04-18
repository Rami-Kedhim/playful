
import { useState, useCallback } from 'react';
import { ServiceType, ForbiddenTerms, isAllowedServiceType, remapUnsafeService } from '@/components/escorts/filters/ServiceTypeFilterRules';
import { toast } from '@/components/ui/use-toast';

export const useServiceTypeRules = (filterEnabled = true) => {
  const [unsafeTermAttempts, setUnsafeTermAttempts] = useState<string[]>([]);

  const handleServiceTypeValidation = useCallback((term: string): {
    isValid: boolean;
    remappedTerm?: ServiceType;
    message?: string;
  } => {
    // Skip validation if filtering is disabled
    if (!filterEnabled) {
      return { isValid: true };
    }

    // Check if the term is allowed
    const isValid = isAllowedServiceType(term);

    if (!isValid) {
      // Add the term to the attempts list
      setUnsafeTermAttempts(prev => [...prev, term]);
      
      // Get a remapped safe term
      const remappedTerm = remapUnsafeService(term);
      
      return {
        isValid: false,
        remappedTerm,
        message: `The term "${term}" is not allowed. It has been remapped to "${remappedTerm}".`
      };
    }

    return { isValid: true };
  }, [filterEnabled]);

  const validateServiceType = useCallback((term: string): ServiceType | null => {
    const result = handleServiceTypeValidation(term);
    
    if (!result.isValid) {
      if (result.message) {
        toast({
          title: 'Term Remapped',
          description: result.message,
          variant: 'warning',
        });
      }
      return result.remappedTerm || null;
    }
    
    // Try to match to an existing ServiceType
    const knownTypes = Object.values(ServiceType) as string[];
    const matchingType = knownTypes.find(type => 
      type.toLowerCase() === term.toLowerCase()
    );
    
    if (matchingType) {
      return matchingType as ServiceType;
    }
    
    // If no match, use a default method to categorize
    const lowerTerm = term.toLowerCase();
    
    if (lowerTerm.includes('virtual') || lowerTerm.includes('online')) {
      return ServiceType.VIRTUAL;
    }
    
    if (lowerTerm.includes('massage')) {
      return ServiceType.MASSAGE;
    }
    
    if (lowerTerm.includes('dinner') || lowerTerm.includes('date')) {
      return ServiceType.DINNER;
    }
    
    // Default to in-person
    return ServiceType.IN_PERSON;
  }, [handleServiceTypeValidation]);

  return {
    validateServiceType,
    unsafeTermAttempts,
    resetUnsafeTerms: () => setUnsafeTermAttempts([]),
    forbiddenTerms: ForbiddenTerms
  };
};

export default useServiceTypeRules;
