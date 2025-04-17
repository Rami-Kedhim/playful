
// Define service types enum
export enum ServiceType {
  DINNER = 'dinner',
  EVENTS = 'events',
  TRAVEL = 'travel',
  COMPANIONSHIP = 'companionship',
  OVERNIGHT = 'overnight',
  MASSAGE = 'massage',
  ROLEPLAY = 'roleplay'
}

// List of terms that should not be used in service names
export const ForbiddenTerms: string[] = [
  'explicit',
  'sexual',
  'xxx',
  'nsfw',
  'adult',
  'illegal'
];

// Check if a service name is valid
export const isValidServiceType = (name: string): boolean => {
  // Convert to lowercase for comparison
  const normalizedName = name.toLowerCase().trim();
  
  // Check if it's in our ServiceType enum
  return Object.values(ServiceType).includes(normalizedName as ServiceType);
};

// Map unsafe service names to safe ones
export const remapUnsafeService = (name: string): ServiceType | null => {
  const normalizedName = name.toLowerCase().trim();
  
  // Map of unsafe terms to safe alternatives
  const remappings: Record<string, ServiceType> = {
    'date': ServiceType.DINNER,
    'intimate': ServiceType.COMPANIONSHIP,
    'overnight stay': ServiceType.OVERNIGHT,
    'body work': ServiceType.MASSAGE,
    'fantasy': ServiceType.ROLEPLAY
  };
  
  return remappings[normalizedName] || null;
};
