
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { format } from 'date-fns';
import { DatePicker } from '@/components/ui/date-picker';
import { Escort } from '@/types/Escort';
import { BookingFormValues, bookingFormSchema } from './types';
import BookingMessage from './BookingMessage';
import BookingPersonalInfo from './BookingPersonalInfo';
import BookingTimeAndDuration from './BookingTimeAndDuration';

export interface BookingFormProps {
  escort: Escort;
  onSubmit: (data: BookingFormValues) => void;
  bookingType?: 'in-person' | 'virtual';
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  escort, 
  onSubmit,
  bookingType = 'in-person'
}) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: new Date(),
      time: '',
      duration: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    }
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  // Get available durations and prices based on escort rates
  const getDurations = () => {
    const durations = [
      { value: '30', label: '30 minutes' },
      { value: '60', label: '1 hour' },
      { value: '90', label: '1.5 hours' },
      { value: '120', label: '2 hours' },
      { value: '180', label: '3 hours' },
      { value: 'overnight', label: 'Overnight' },
    ];
    
    return durations;
  };

  // Get available locations if any
  const getLocations = () => {
    if (!escort.locations || escort.locations.length === 0) {
      return [{ value: escort.location || 'Default location', label: escort.location || 'Default location' }];
    }
    
    return escort.locations.map(location => ({
      value: location,
      label: location
    }));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <DatePicker
            selected={form.watch('date')}
            onSelect={(date) => form.setValue('date', date)}
            disabled={(date) => date < new Date()} // Disable past dates
          />
        </div>
        
        {/* Time and Duration */}
        <BookingTimeAndDuration 
          control={control} 
          durations={getDurations()} 
          disabled={isSubmitting} 
        />
        
        {/* Personal Info */}
        <BookingPersonalInfo
          control={control}
          disabled={isSubmitting}
        />
        
        {/* Message */}
        <BookingMessage
          control={control}
          disabled={isSubmitting}
        />
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Continue to Payment'}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
