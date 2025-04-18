
import { useState, useEffect } from 'react';
import { Escort, Availability } from '@/types/escort';

const useEscortAvailability = (escort: Escort) => {
  const [availabilityData, setAvailabilityData] = useState<{
    days: string[];
    dayLabels: Record<string, string>;
    hours: string[];
    customNotes: string;
  }>({
    days: [],
    dayLabels: {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    },
    hours: [],
    customNotes: '',
  });

  useEffect(() => {
    // Process availability data
    if (escort) {
      // If availability is a string array (legacy format)
      if (Array.isArray(escort.availability) && 
          (escort.availability.length === 0 || typeof escort.availability[0] === 'string')) {
        setAvailabilityData(prev => ({
          ...prev,
          days: escort.availability as string[] || [],
        }));
      }
      // If availability is an array of objects (new format)
      else if (Array.isArray(escort.availability) && 
              typeof escort.availability[0] === 'object') {
        const availObj = escort.availability[0] as Availability;
        setAvailabilityData(prev => ({
          ...prev,
          days: availObj.days || [],
          hours: Array.isArray(availObj.hours) ? availObj.hours.map(h => h.toString()) : 
                 (typeof availObj.hours === 'string' ? [availObj.hours] : []),
          customNotes: availObj.customNotes || '',
        }));
      }
    }
  }, [escort]);

  const isAvailableOnDay = (day: string): boolean => {
    return availabilityData.days.includes(day.toLowerCase());
  };

  const getAvailabilityText = (): string => {
    if (availabilityData.days.length === 0) return 'Availability not specified';
    if (availabilityData.days.length === 7) return 'Available all week';
    
    return availabilityData.days
      .map(day => availabilityData.dayLabels[day] || day)
      .join(', ');
  };

  return {
    availabilityData,
    isAvailableOnDay,
    getAvailabilityText,
    hasSpecifiedAvailability: availabilityData.days.length > 0,
  };
};

export default useEscortAvailability;
