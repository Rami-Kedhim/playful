
// Define specialized service type enum
export enum ServiceType {
  MASSAGE = 'Massage',
  COMPANIONSHIP = 'Companionship',
  ROLE_PLAY = 'Role Play',
  DINNER_DATE = 'Dinner Date',
  TRAVEL_COMPANION = 'Travel Companion',
  SOCIAL_EVENTS = 'Social Events',
  COUPLES_DATE = 'Couples Date',
  VIDEO_CHAT = 'Video Chat',
  PHONE_CHAT = 'Phone Chat',
  LIVE_STREAM = 'Live Stream',
  CONTENT_CREATION = 'Content Creation',
  PRIVATE_SHOWS = 'Private Shows',
}

// List of forbidden terms for safety/compliance
export const ForbiddenTerms = [
  'illegal',
  'drugs',
  'weapons',
  'underage',
  'trafficking',
  'exploitation',
  // Add other terms that should be filtered
];

// Map of potentially unsafe terms to safe alternatives
const UnsafeTermMappings: Record<string, ServiceType> = {
  'explicit': ServiceType.CONTENT_CREATION,
  'adult': ServiceType.CONTENT_CREATION,
  'exotic': ServiceType.MASSAGE,
  'special': ServiceType.COMPANIONSHIP,
  // Add other mappings as needed
};

// Helper function to check if a service type is valid
export function isValidServiceType(type: string): boolean {
  return Object.values(ServiceType).includes(type as ServiceType);
}

// Helper function to remap potentially unsafe terms to safe service types
export function remapUnsafeService(term: string): ServiceType | null {
  const lowerTerm = term.toLowerCase();
  
  for (const [unsafeTerm, safeType] of Object.entries(UnsafeTermMappings)) {
    if (lowerTerm.includes(unsafeTerm.toLowerCase())) {
      return safeType;
    }
  }
  
  return null;
}
