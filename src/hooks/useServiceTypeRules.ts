
import { useCallback } from 'react';
import { ServiceType, isAllowedServiceType, getSafeServiceName } from '@/components/escorts/filters/ServiceTypeFilterRules';

// Define forbidden terms locally
const FORBIDDEN_TERMS = [
  'illegal',
  'underage',
  'trafficking'
];

/**
 * Hook for validating and processing service types according to platform rules
 */
export const useServiceTypeRules = () => {
  /**
   * Checks if a service name is allowed by platform rules
   */
  const isValidServiceType = useCallback((name: string): boolean => {
    return isAllowedServiceType(name);
  }, []);

  /**
   * Remaps potentially problematic service names to safe alternatives
   */
  const remapUnsafeService = useCallback((name: string): string => {
    if (name.toLowerCase().includes('escort')) {
      return 'Companionship';
    }

    // Check against forbidden terms
    for (const term of FORBIDDEN_TERMS) {
      if (name.toLowerCase().includes(term)) {
        return 'Service';
      }
    }

    return name;
  }, []);

  /**
   * Maps service types to their display names for UI
   */
  const getServiceDisplayName = useCallback((type: string): string => {
    const displayMap: Record<string, string> = {
      'GFE': 'Girlfriend Experience',
      'BDSM': 'BDSM Services',
      'RolePlay': 'Role Play',
      'Massage': 'Professional Massage',
      'Travel': 'Travel Companion',
      'Overnight': 'Overnight Companion',
      'Dinner': 'Dinner Date',
      'Events': 'Event Companion'
    };

    return displayMap[type] || type;
  }, []);

  /**
   * Gets the supported service types based on user role
   */
  const getSupportedServiceTypes = useCallback((userRole: string): string[] => {
    // Base services available to all roles
    const baseServices = [
      'Massage', 
      'Companionship', 
      'Dinner Date', 
      'Events'
    ];

    // Premium services for certain roles
    const premiumServices = [
      'Travel', 
      'Overnight', 
      'Dancing'
    ];

    // Role-specific services
    const roleSpecificServices: Record<string, string[]> = {
      'escort': [...baseServices, ...premiumServices, 'Dating'],
      'premium': [...baseServices, ...premiumServices],
      'creator': [...baseServices, 'Entertainment', 'Roleplay'],
      'admin': [...baseServices, ...premiumServices, 'Dating', 'Entertainment', 'Roleplay']
    };

    return roleSpecificServices[userRole.toLowerCase()] || baseServices;
  }, []);

  /**
   * Maps a user-defined service to a platform-supported service type
   */
  const mapToSupportedServiceType = useCallback((customService: string): string => {
    // Convert to lowercase for comparison
    const service = customService.toLowerCase();
    
    // Define mapping of terms to standard service types
    const serviceMap: Record<string, string> = {
      'massage': 'Massage',
      'spa': 'Massage',
      'dinner': 'Dinner Date',
      'meals': 'Dinner Date',
      'dining': 'Dinner Date',
      'travel': 'Travel',
      'trip': 'Travel',
      'vacation': 'Travel',
      'overnight': 'Overnight',
      'sleepover': 'Overnight',
      'event': 'Events',
      'party': 'Events',
      'dance': 'Dancing',
      'dancing': 'Dancing',
      'role': 'Roleplay',
      'roleplay': 'Roleplay',
      'escort': 'Companionship',
      'companion': 'Companionship',
      'date': 'Dating'
    };
    
    // Find matching terms
    for (const [key, value] of Object.entries(serviceMap)) {
      if (service.includes(key)) {
        return value;
      }
    }
    
    // Default fallback
    return String(customService);
  }, []);

  return {
    isValidServiceType,
    remapUnsafeService,
    getServiceDisplayName,
    getSupportedServiceTypes,
    mapToSupportedServiceType,
    forbiddenTerms: FORBIDDEN_TERMS
  };
};

export default useServiceTypeRules;
