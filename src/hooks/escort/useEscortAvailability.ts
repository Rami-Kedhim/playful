
import { useState, useCallback } from 'react';
import { Escort, Availability } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';

interface UseEscortAvailabilityProps {
  escortId?: string;
  initialAvailability?: Availability[];
}

export const useEscortAvailability = ({ 
  escortId, 
  initialAvailability = [] 
}: UseEscortAvailabilityProps) => {
  const [availability, setAvailability] = useState<Availability[]>(initialAvailability);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Default time slots for adding new availability
  const defaultTimeSlots = [
    { start: "09:00", end: "17:00" }
  ];

  // Add a new day of availability
  const addAvailabilityDay = useCallback((day: string) => {
    setAvailability(prev => [
      ...prev,
      {
        day,
        slots: [...defaultTimeSlots]
      }
    ]);
  }, []);

  // Remove a day of availability
  const removeAvailabilityDay = useCallback((index: number) => {
    setAvailability(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Add a time slot to a specific day
  const addTimeSlot = useCallback((dayIndex: number) => {
    setAvailability(prev => {
      const updatedAvailability = [...prev];
      updatedAvailability[dayIndex] = {
        ...updatedAvailability[dayIndex],
        slots: [
          ...updatedAvailability[dayIndex].slots,
          { start: "12:00", end: "17:00" }
        ]
      };
      return updatedAvailability;
    });
  }, []);

  // Remove a time slot from a specific day
  const removeTimeSlot = useCallback((dayIndex: number, slotIndex: number) => {
    setAvailability(prev => {
      const updatedAvailability = [...prev];
      updatedAvailability[dayIndex] = {
        ...updatedAvailability[dayIndex],
        slots: updatedAvailability[dayIndex].slots.filter((_, i) => i !== slotIndex)
      };
      return updatedAvailability;
    });
  }, []);

  // Update a time slot
  const updateTimeSlot = useCallback((dayIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => {
    setAvailability(prev => {
      const updatedAvailability = [...prev];
      updatedAvailability[dayIndex].slots[slotIndex] = {
        ...updatedAvailability[dayIndex].slots[slotIndex],
        [field]: value
      };
      return updatedAvailability;
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
    return availability.map(a => a.day);
  }, [availability]);

  // Check if a specific day is available
  const isDayAvailable = useCallback((day: string) => {
    return availability.some(a => a.day === day);
  }, [availability]);

  return {
    availability,
    days,
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
