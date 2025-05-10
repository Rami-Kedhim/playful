
import { Escort as EscortType } from '@/types/Escort';
import { Escort as EscortTypeNew } from '@/types/escort';
import { EscortAvailabilityDay } from '@/types/Escort';

/**
 * Converts between different Escort types to resolve the type incompatibilities
 * This is needed because we have two different Escort types with slightly different structures
 */
export function convertEscortType(escort: any): EscortTypeNew {
  if (!escort) return null;
  
  const convertedEscort: EscortTypeNew = {
    ...escort,
    id: escort.id,
    name: escort.name,
    gender: escort.gender || 'unknown',
    price: escort.price || 0,
  };

  // Handle availability specifically to resolve the type incompatibility
  if (escort.availability) {
    if (typeof escort.availability === 'string' || Array.isArray(escort.availability)) {
      convertedEscort.availability = escort.availability;
    } else {
      // Convert the availability object
      const availability = { ...escort.availability };
      
      // Ensure days property is properly typed
      if (availability.days) {
        // If it's a string array, convert it to a compatible format
        if (Array.isArray(availability.days)) {
          if (typeof availability.days[0] === 'string') {
            availability.days = availability.days.map(day => ({
              day,
              available: true
            }));
          }
        }
      }
      
      convertedEscort.availability = availability;
    }
  }

  // Add a type cast to force TypeScript to accept the converted escort
  return convertedEscort as EscortTypeNew;
}

/**
 * Helper function to ensure EscortAvailabilityDay[] compatibility
 * This resolves the issue with 'days' property in EscortAvailability
 */
export function ensureCompatibleAvailabilityDays(days: any): EscortAvailabilityDay[] {
  if (!days) return [];
  
  if (Array.isArray(days)) {
    if (days.length === 0) return [];
    
    // If it's already in the right format
    if (typeof days[0] === 'object' && 'day' in days[0]) {
      return days as EscortAvailabilityDay[];
    }
    
    // If it's a string array, convert it
    if (typeof days[0] === 'string') {
      return days.map(day => ({
        day,
        available: true
      }));
    }
  }
  
  return [];
}
