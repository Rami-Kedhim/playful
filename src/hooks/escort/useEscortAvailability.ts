
import { useState } from 'react';
import { Availability } from '@/types/escort';

interface ExtendedAvailability extends Availability {
  timeZone?: string;
  availableNow?: boolean;
}

export const useEscortAvailability = (escortId: string) => {
  // Initialize with the extended interface
  const [availability, setAvailability] = useState<ExtendedAvailability>({
    days: [],
    hours: [],
    customNotes: "",
    timeZone: "UTC",
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

    // Update with availableNow property
    setAvailability((prev) => ({
      ...prev,
      availableNow: isAvailable
    }));
  };

  return {
    days: availability.days || [],
    hours: availability.hours || [],
    customNotes: availability.customNotes || "",
    timeZone: availability.timeZone || "UTC",
    availableNow: availability.availableNow || false,
    setDays,
    setHours,
    setCustomNotes,
    setTimeZone,
    checkAvailabilityNow,
  };
};
