
import { useState, useCallback } from 'react';
import { Escort, EscortAvailability } from '@/types/escort';

export const useEscortAvailability = (initialAvailability?: EscortAvailability) => {
  const [availability, setAvailability] = useState<EscortAvailability>(
    initialAvailability || {
      days: [],
      hours: [],
      timeZone: 'UTC',
      availableNow: false
    }
  );

  const toggleDay = useCallback((day: string) => {
    setAvailability(prev => {
      const currentDays = prev.days || [];
      const updatedDays = currentDays.includes(day)
        ? currentDays.filter(d => d !== day)
        : [...currentDays, day];

      return {
        ...prev,
        days: updatedDays
      };
    });
  }, []);

  const setAvailableHours = useCallback((hours: string[]) => {
    setAvailability(prev => ({
      ...prev,
      hours
    }));
  }, []);

  const setAvailableTimeZone = useCallback((timeZone: string) => {
    setAvailability(prev => ({
      ...prev,
      timeZone
    }));
  }, []);

  const toggleAvailableNow = useCallback((availableNow: boolean) => {
    setAvailability(prev => ({
      ...prev,
      availableNow
    }));
  }, []);

  const setCustomNotes = useCallback((customNotes: string) => {
    setAvailability(prev => ({
      ...prev,
      customNotes
    }));
  }, []);

  return {
    availability,
    setAvailability,
    toggleDay,
    setAvailableHours,
    setAvailableTimeZone,
    toggleAvailableNow,
    setCustomNotes
  };
};
