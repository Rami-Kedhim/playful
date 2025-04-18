
import { useState, useEffect, useMemo } from 'react';
import { Escort, Availability } from '@/types/escort';

interface AvailabilityHook {
  isAvailableNow: boolean;
  availableToday: boolean;
  availabilityText: string;
  formattedAvailability: {
    days: string[];
    hours: number[];
    customNotes: string;
  }
}

export const useEscortAvailability = (escort: Escort): AvailabilityHook => {
  const [isAvailableNow, setIsAvailableNow] = useState<boolean>(escort.availableNow || false);
  
  // Process availability data into a consistent format
  const formattedAvailability = useMemo(() => {
    // Default empty availability
    const defaultAvailability = {
      days: [] as string[],
      hours: [] as number[],
      customNotes: ''
    };
    
    if (!escort.availability) return defaultAvailability;
    
    // Handle array of availability objects
    if (Array.isArray(escort.availability)) {
      // Convert to our format
      const days = escort.availability.map(a => a.day || '').filter(Boolean);
      
      // Extract hours from availability if they exist in the right format
      let hours: number[] = [];
      let customNotes = '';
      
      escort.availability.forEach(avail => {
        // Check if this availability item has hours property that's an array
        if (avail.hours && Array.isArray(avail.hours)) {
          hours = [...hours, ...avail.hours];
        }
        
        // Check if this availability item has a customNotes property
        if (avail.customNotes) {
          customNotes += (customNotes ? ' ' : '') + avail.customNotes;
        }
      });
      
      return {
        days,
        hours,
        customNotes
      };
    }
    
    // Handle single availability object
    if (typeof escort.availability === 'object' && !Array.isArray(escort.availability)) {
      const avail = escort.availability as Availability;
      
      return {
        days: avail.days || [],
        hours: avail.hours || [],
        customNotes: avail.customNotes || ''
      };
    }
    
    return defaultAvailability;
  }, [escort.availability]);
  
  // Check if escort is available today
  const availableToday = useMemo(() => {
    if (escort.availableNow) return true;
    
    const today = new Date().toLocaleString('en-us', { weekday: 'short' }).toLowerCase();
    return formattedAvailability.days.some(day => 
      day.toLowerCase().includes(today)
    );
  }, [escort.availableNow, formattedAvailability.days]);
  
  // Generate availability text
  const availabilityText = useMemo(() => {
    if (escort.availableNow) return "Available now";
    if (availableToday) return "Available today";
    if (formattedAvailability.days.length > 0) {
      return `Available on ${formattedAvailability.days.slice(0, 3).join(', ')}${formattedAvailability.days.length > 3 ? '...' : ''}`;
    }
    return "Contact for availability";
  }, [escort.availableNow, availableToday, formattedAvailability.days]);
  
  return {
    isAvailableNow,
    availableToday,
    availabilityText,
    formattedAvailability
  };
};

export default useEscortAvailability;
