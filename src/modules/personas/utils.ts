
import { UberPersona } from '@/types/uberPersona';

/**
 * Format a persona's display name according to UberCore standards
 */
export const formatPersonaName = (persona: UberPersona): string => {
  if (persona.displayName) return persona.displayName;
  return persona.name;
};

/**
 * Get a persona's primary type as string
 */
export const getPersonaType = (persona: UberPersona): string => {
  if (typeof persona.type === 'string') return persona.type;
  return 'escort';
};

/**
 * Check if a persona is available now based on their availability settings
 */
export const isPersonaAvailableNow = (persona: UberPersona): boolean => {
  if (!persona.availability) return false;
  
  if (Array.isArray(persona.availability)) {
    // If availability is an array of time slots, check if current time is in any of them
    return persona.availability.length > 0;
  }
  
  if (typeof persona.availability === 'object' && persona.availability.nextAvailable) {
    // Check if nextAvailable timestamp is in the past
    const nextAvailable = new Date(persona.availability.nextAvailable);
    return nextAvailable <= new Date();
  }
  
  return false;
};

/**
 * Get persona's primary location for display
 */
export const getPersonaLocation = (persona: UberPersona): string => {
  return persona.location || 'Location not specified';
};

/**
 * Get persona avatar with fallback to default
 */
export const getPersonaAvatar = (persona: UberPersona): string => {
  return (
    persona.avatarUrl || 
    persona.profileImageUrl || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(persona.name)}&background=random`
  );
};

/**
 * Sort personas by boost score (if available)
 */
export const sortPersonasByBoost = (personas: UberPersona[]): UberPersona[] => {
  return [...personas].sort((a, b) => {
    const aBoost = a.systemMetadata?.boostScore || 0;
    const bBoost = b.systemMetadata?.boostScore || 0;
    return bBoost - aBoost;
  });
};
