
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { BookingFormValues } from './types';

interface BookingTimeAndDurationProps {
  control: Control<BookingFormValues>;
  durations: { value: string; label: string }[];
  disabled?: boolean;
}

const BookingTimeAndDuration: React.FC<BookingTimeAndDurationProps> = ({ 
  control, 
  durations,
  disabled = false 
}) => {
  // Generate time slots from 9AM to 11PM in 30-minute increments
  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let hour = 9; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
        slots.push({ value: timeString, label: displayTime });
      }
    }
    return slots;
  }, []);

  return (
    <>
      <FormField
        control={control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>{slot.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {durations.map((duration) => (
                  <SelectItem key={duration.value} value={duration.value}>
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BookingTimeAndDuration;
