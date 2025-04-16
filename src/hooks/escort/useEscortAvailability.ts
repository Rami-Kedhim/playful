
import { useState, useCallback } from 'react';
import { Escort, Availability } from '@/types/escort';

export const useEscortAvailability = (updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>) => {
  const [availability, setAvailability] = useState<Availability>({
    days: [],
    hours: [],
    timeZone: 'UTC',
    availableNow: false
  });
  
  const updateAvailability = useCallback(async (
    escortId: string, 
    updatedAvailability: Availability
  ) => {
    try {
      const result = await updateEscortProfile(escortId, {
        availability: updatedAvailability
      });
      
      if (result) {
        setAvailability(updatedAvailability);
      }
      
      return result;
    } catch (error) {
      console.error('Error updating availability:', error);
      return null;
    }
  }, [updateEscortProfile]);
  
  const setAvailableNow = useCallback(async (
    escortId: string,
    isAvailableNow: boolean
  ) => {
    return updateAvailability(escortId, {
      ...availability,
      availableNow: isAvailableNow
    });
  }, [availability, updateAvailability]);
  
  const setDays = useCallback(async (
    escortId: string,
    days: string[]
  ) => {
    return updateAvailability(escortId, {
      ...availability,
      days
    });
  }, [availability, updateAvailability]);
  
  const setHours = useCallback(async (
    escortId: string,
    hours: string[]
  ) => {
    return updateAvailability(escortId, {
      ...availability,
      hours
    });
  }, [availability, updateAvailability]);
  
  const setTimeZone = useCallback(async (
    escortId: string,
    timeZone: string
  ) => {
    return updateAvailability(escortId, {
      ...availability,
      timeZone
    });
  }, [availability, updateAvailability]);
  
  return {
    availability,
    updateAvailability,
    setAvailableNow,
    setDays,
    setHours,
    setTimeZone
  };
};
