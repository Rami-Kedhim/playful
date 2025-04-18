
// Define possible service types
export type ServiceType = 
  | 'Massage'
  | 'Dinner Date'
  | 'Companionship'
  | 'Travel'
  | 'Overnight'
  | 'Events'
  | 'Roleplay'
  | 'Escort'
  | 'Dating'
  | 'Dancing'
  | string;

// Function to check if a service type is allowed
export const isAllowedServiceType = (type: string): boolean => {
  // This would be more complex in a real application with forbidden terms checking
  const forbiddenTerms = [
    'illegal',
    'underage',
    'trafficking'
  ];
  
  return !forbiddenTerms.some(term => 
    type.toLowerCase().includes(term.toLowerCase())
  );
};

// Function to return a safe version of a service name
export const getSafeServiceName = (name: string): ServiceType => {
  // In a real app, this would sanitize or remap problematic terms
  return name as ServiceType;
};

// Maps services to their categories
export const serviceCategories = {
  'Massage': 'Wellness',
  'Dinner Date': 'Social',
  'Companionship': 'Social',
  'Travel': 'Companion',
  'Overnight': 'Extended',
  'Events': 'Social',
  'Roleplay': 'Entertainment',
  'Escort': 'Companion',
  'Dating': 'Social',
  'Dancing': 'Entertainment'
};

// Export default service categories
export const DEFAULT_SERVICE_CATEGORIES = [
  'Social',
  'Companion',
  'Entertainment',
  'Wellness',
  'Extended'
];
