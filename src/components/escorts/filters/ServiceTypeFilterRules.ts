
// Define service type enum
export enum ServiceType {
  IN_PERSON = 'in-person',
  VIRTUAL = 'virtual',
  BOTH = 'both',
  MASSAGE = 'massage',
  DINNER = 'dinner'
}

// Define filter rules
export const filterRules = {
  // Allowed service types based on platform policy
  allowedServiceTypes: [
    ServiceType.IN_PERSON,
    ServiceType.VIRTUAL,
    ServiceType.BOTH,
    ServiceType.MASSAGE,
    ServiceType.DINNER
  ],

  // Terms that should be remapped to appropriate service types
  remappings: {
    // In-person remappings
    physical: ServiceType.IN_PERSON,
    real: ServiceType.IN_PERSON,
    "in person": ServiceType.IN_PERSON,
    
    // Virtual remappings
    online: ServiceType.VIRTUAL,
    digital: ServiceType.VIRTUAL,
    remote: ServiceType.VIRTUAL,
    
    // Both remappings
    all: ServiceType.BOTH,
    "in-person & virtual": ServiceType.BOTH,
    "in person & virtual": ServiceType.BOTH,
    
    // Special services
    "dinner date": ServiceType.DINNER
  },

  // Terms that should be blocked
  blockedTerms: [
    "illegal",
    "explicit",
    "underage"
  ]
};

// Utility function to check if a service type is allowed
export const isServiceTypeAllowed = (type: string): boolean => {
  return Object.values(ServiceType).includes(type as ServiceType);
};

// Utility function to safely format a service type
export const formatServiceType = (
  input: string, 
  callback?: (original: string, remapped: ServiceType) => void
): ServiceType | '' => {
  // Check if it's already a valid service type
  if (isServiceTypeAllowed(input)) {
    return input as ServiceType;
  }
  
  // Check if it's in the remappings
  const remapped = filterRules.remappings[input.toLowerCase() as keyof typeof filterRules.remappings];
  if (remapped) {
    if (callback) {
      callback(input, remapped);
    }
    return remapped;
  }
  
  // Check if it contains blocked terms
  if (filterRules.blockedTerms.some(term => 
    input.toLowerCase().includes(term.toLowerCase())
  )) {
    return '';
  }
  
  // Return empty if no match
  return '';
};

export default { ServiceType, filterRules, isServiceTypeAllowed, formatServiceType };
