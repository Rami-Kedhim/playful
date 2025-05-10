
import { Escort as EscortType } from '@/types/Escort';
import { Escort as EscortTypeNew } from '@/types/escort';

/**
 * Converts between different Escort types to resolve the type incompatibilities
 * This is needed because we have two different Escort types with slightly different structures
 */
export function convertEscortType(escort: any): EscortTypeNew {
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
        if (Array.isArray(availability.days) && typeof availability.days[0] === 'string') {
          availability.days = availability.days.map(day => ({
            day,
            available: true
          }));
        }
      }
      
      convertedEscort.availability = availability;
    }
  }

  return convertedEscort;
}
