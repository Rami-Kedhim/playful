
import { ServiceTypeFilter } from '@/types/filters';

/**
 * List of forbidden terms that should not be displayed as service types
 */
export const ForbiddenTerms = [
  'explicit', 'sex', 'intercourse', 'prostitution', 'illegal',
  'trafficking', 'drugs', 'underage', 'exploitation'
];

/**
 * Checks if a service type is allowed based on content rules
 */
export const isAllowedServiceType = (serviceType: string): boolean => {
  if (!serviceType) return true;
  
  const lowerType = serviceType.toLowerCase();
  return !ForbiddenTerms.some(term => lowerType.includes(term.toLowerCase()));
};

/**
 * Maps unsafe service descriptions to acceptable terms
 */
export const remapUnsafeService = (serviceType: string): ServiceTypeFilter => {
  const lowerType = serviceType.toLowerCase();
  
  // Map potentially problematic terms to acceptable alternatives
  if (lowerType.includes('sex') || 
      lowerType.includes('explicit') || 
      lowerType.includes('full service')) {
    return 'in-person';
  }
  
  if (lowerType.includes('cam') || 
      lowerType.includes('online') || 
      lowerType.includes('virtual')) {
    return 'virtual';
  }
  
  // Default safe fallback
  return 'both';
};

export default {
  ForbiddenTerms,
  isAllowedServiceType,
  remapUnsafeService
};
