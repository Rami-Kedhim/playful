
import { UberPersona } from '@/types/UberPersona';

/**
 * Helper functions to safely check UberPersona capabilities
 */

export const hasCapability = (
  persona: UberPersona, 
  capability: string
): boolean => {
  // Check if capabilities exists and is an object
  if (!persona.capabilities) return false;
  
  // If capabilities is an array of strings
  if (Array.isArray(persona.capabilities)) {
    return persona.capabilities.includes(capability);
  }
  
  // If capabilities is an object with boolean properties
  if (typeof persona.capabilities === 'object') {
    return Boolean(persona.capabilities[capability as keyof typeof persona.capabilities]);
  }
  
  return false;
};

export const hasRealMeets = (persona: UberPersona): boolean => {
  return hasCapability(persona, 'hasRealMeets') || 
    (persona.roleFlags?.isEscort === true) ||
    persona.type === 'escort';
};

export const hasVirtualMeets = (persona: UberPersona): boolean => {
  return hasCapability(persona, 'hasVirtualMeets') || 
    (persona.roleFlags?.isLivecam === true) ||
    persona.type === 'livecam';
};

export const hasContent = (persona: UberPersona): boolean => {
  return hasCapability(persona, 'hasContent') || 
    (persona.roleFlags?.isCreator === true) ||
    persona.type === 'creator';
};

export const hasLiveStream = (persona: UberPersona): boolean => {
  return hasCapability(persona, 'hasLiveStream') || 
    (persona.roleFlags?.isLivecam === true) ||
    persona.type === 'livecam';
};

export const hasExclusiveContent = (persona: UberPersona): boolean => {
  return hasCapability(persona, 'hasExclusiveContent') || 
    (persona.roleFlags?.isCreator === true && persona.monetization?.subscriptionPrice !== 0);
};

export const hasChat = (persona: UberPersona): boolean => {
  return hasCapability(persona, 'hasChat') || 
    persona.type === 'ai' ||
    persona.roleFlags?.isAI === true;
};

export const hasStories = (persona: UberPersona): boolean => {
  return hasCapability(persona, 'hasStories');
};

/**
 * Get verification level with proper type
 */
export const getVerificationLevel = (
  level: string | undefined
): "basic" | "advanced" | "premium" => {
  if (level === "basic" || level === "advanced" || level === "premium") {
    return level;
  }
  return "basic"; // Default to basic if undefined or invalid
};
