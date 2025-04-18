
import { useState, useCallback } from 'react';
import { Escort, Availability } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';

interface UseEscortAvailabilityProps {
  escortId?: string;
  initialAvailability?: Availability;
}

export const useEscortAvailability = ({ 
  escortId, 
  initialAvailability = { days: [], hours: [] }
}: UseEscortAvailabilityProps) => {
  const [availability, setAvailability] = useState<Availability>(initialAvailability);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Default time slots for adding new availability
  const defaultTimeSlots = [
    "09:00-17:00"
  ];

  // Add a day to availability
  const addAvailabilityDay = useCallback((day: string) => {
    setAvailability(prev => {
      const updatedDays = [...prev.days, day];
      return {
        ...prev,
        days: updatedDays
      };
    });
  }, []);

  // Remove a day from availability
  const removeAvailabilityDay = useCallback((dayToRemove: string) => {
    setAvailability(prev => {
      const updatedDays = prev.days.filter(day => day !== dayToRemove);
      return {
        ...prev,
        days: updatedDays
      };
    });
  }, []);

  // Add a time slot
  const addTimeSlot = useCallback((timeSlot: string) => {
    setAvailability(prev => {
      const updatedHours = [...prev.hours, timeSlot];
      return {
        ...prev,
        hours: updatedHours
      };
    });
  }, []);

  // Remove a time slot
  const removeTimeSlot = useCallback((timeSlotToRemove: string) => {
    setAvailability(prev => {
      const updatedHours = prev.hours.filter(hour => hour !== timeSlotToRemove);
      return {
        ...prev,
        hours: updatedHours
      };
    });
  }, []);

  // Update a time slot
  const updateTimeSlot = useCallback((oldTimeSlot: string, newTimeSlot: string) => {
    setAvailability(prev => {
      const hourIndex = prev.hours.findIndex(hour => hour === oldTimeSlot);
      if (hourIndex === -1) return prev;
      
      const updatedHours = [...prev.hours];
      updatedHours[hourIndex] = newTimeSlot;
      
      return {
        ...prev,
        hours: updatedHours
      };
    });
  }, []);

  // Save availability to the server
  const saveAvailability = useCallback(async () => {
    if (!escortId) {
      setError('Escort ID is required to save availability');
      return false;
    }

    setSaving(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      console.log('Saving availability for escort:', escortId, availability);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Availability updated',
        description: 'Your availability settings have been saved.',
      });
      
      return true;
    } catch (err) {
      console.error('Error saving availability:', err);
      setError('Failed to save availability. Please try again.');
      
      toast({
        title: 'Save failed',
        description: 'There was a problem updating your availability. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    } finally {
      setSaving(false);
    }
  }, [escortId, availability, toast]);

  // Get available days (for display or logic)
  const getAvailableDays = useCallback(() => {
    return availability.days;
  }, [availability]);

  // Check if a specific day is available
  const isDayAvailable = useCallback((day: string) => {
    return availability.days.includes(day);
  }, [availability]);

  return {
    availability,
    daysOfWeek,
    loading,
    saving,
    error,
    addAvailabilityDay,
    removeAvailabilityDay,
    addTimeSlot,
    removeTimeSlot,
    updateTimeSlot,
    saveAvailability,
    getAvailableDays,
    isDayAvailable
  };
};

export default useEscortAvailability;
