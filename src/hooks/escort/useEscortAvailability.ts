import { useState } from 'react';
import { Availability } from '@/types/escort';

// Update Availability interface to include the missing properties
interface ExtendedAvailability extends Availability {
  timeZone?: string;
  availableNow?: boolean;
}

export const useEscortAvailability = (escortId: string) => {
  // Fix the property references to match the extended interface
  const [availability, setAvailability] = useState<ExtendedAvailability>({
    days: [],
    hours: [],
    timeZone: "UTC",
    customNotes: ""
  });

  const setDays = (days: string[]) => {
    setAvailability((prev) => ({
      ...prev,
      days: days
    }));
  };

  const setHours = (hours: string[]) => {
    setAvailability((prev) => ({
      ...prev,
      hours: hours
    }));
  };

  const setCustomNotes = (notes: string) => {
    setAvailability((prev) => ({
      ...prev,
      customNotes: notes
    }));
  };

  const setTimeZone = (timeZone: string) => {
    setAvailability((prev) => ({
      ...prev,
      timeZone: timeZone
    }));
  };

  const checkAvailabilityNow = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentHour = now.getHours();

    const isAvailable =
      availability.days.includes(currentDay) &&
      availability.hours.some((hourRange) => {
        const [start, end] = hourRange.split('-').map(Number);
        return currentHour >= start && currentHour < end;
      });

    // Make sure to match the extended interface
    setAvailability((prev) => ({
      ...prev,
      availableNow: isAvailable
    }));
  };

  // Make sure to match the extended interface when returning
  return {
    ...availability,
    timeZone: availability.timeZone || "UTC",
    days: availability.days || [],
    hours: availability.hours || [],
    customNotes: availability.customNotes || "",
    setDays,
    setHours,
    setCustomNotes,
    setTimeZone,
    checkAvailabilityNow,
  };
};
