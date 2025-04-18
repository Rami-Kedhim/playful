
import { UberPersona } from '@/types/UberPersona';

/**
 * Helper to check for persona capabilities safely
 */
export const hasCapability = (persona: UberPersona, capability: string): boolean => {
  if (!persona) return false;
  
  // Check roleFlags first
  if (persona.roleFlags) {
    const roleKey = `is${capability.charAt(0).toUpperCase() + capability.slice(1)}` as keyof typeof persona.roleFlags;
    if (persona.roleFlags[roleKey] === true) return true;
  }
  
  // Check type (e.g., type === 'escort')
  if (persona.type && persona.type.toLowerCase() === capability.toLowerCase()) {
    return true;
  }
  
  // Check capabilities as object
  if (persona.capabilities && typeof persona.capabilities === 'object' && !Array.isArray(persona.capabilities)) {
    const capKey = `has${capability.charAt(0).toUpperCase() + capability.slice(1)}` as keyof typeof persona.capabilities;
    return Boolean(persona.capabilities[capKey]);
  }
  
  // Check capabilities as array
  if (persona.capabilities && Array.isArray(persona.capabilities)) {
    return persona.capabilities.includes(capability);
  }
  
  return false;
};

/**
 * Helper to get monetization data safely
 */
export const getMonetizationValue = (
  persona: UberPersona, 
  key: keyof Required<UberPersona>['monetization'], 
  defaultValue: number = 0
): number => {
  if (!persona.monetization) return defaultValue;
  
  if (typeof persona.monetization === 'object' && key in persona.monetization) {
    return (persona.monetization[key] as number) || defaultValue;
  }
  
  if (key === 'meetingPrice' && typeof persona.price === 'number') {
    return persona.price;
  }
  
  return defaultValue;
};
