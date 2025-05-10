
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface BookingMessageProps {
  control: Control<any>;
}

const BookingMessage: React.FC<BookingMessageProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Message (Optional)</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Share any specific requests or questions..."
              className="resize-none"
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
