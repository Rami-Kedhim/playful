
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { BookingFormValues } from './types';

interface BookingMessageProps {
  control: Control<BookingFormValues>;
  disabled?: boolean;
}

const BookingMessage: React.FC<BookingMessageProps> = ({ control, disabled = false }) => {
  return (
    <FormField
      control={control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Message (Optional)</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Add any specific details or requests for your booking..."
              className="resize-none"
              rows={4}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookingMessage;
