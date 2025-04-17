
import { useState } from 'react';
import { Availability, ExtendedAvailability } from '@/types/escort';

export const useEscortAvailability = (initialAvailability?: Availability[] | Availability) => {
  const defaultAvailability: ExtendedAvailability = {
    day: 'all',
    available: true,
    days: [],
    hours: [],
    customNotes: '',
    timeZone: 'UTC'
  };

  const [availability, setAvailability] = useState<ExtendedAvailability>(
    Array.isArray(initialAvailability) ? 
      initialAvailability[0] || defaultAvailability : 
      initialAvailability || defaultAvailability
  );

  // Function to update availability
  const updateAvailability = (updates: Partial<ExtendedAvailability>) => {
    setAvailability(prev => ({ ...prev, ...updates }));
  };

  // Function to set specific days
  const updateDays = (days: string[]) => {
    updateAvailability({ days });
  };

  // Function to set hours
  const updateHours = (hours: string[]) => {
    updateAvailability({ hours });
  };

  // Function to set custom notes
  const updateCustomNotes = (customNotes: string) => {
    updateAvailability({ customNotes });
  };

  return {
    availability,
    updateAvailability,
    updateDays,
    updateHours,
    updateCustomNotes,
  };
};

export default useEscortAvailability;
