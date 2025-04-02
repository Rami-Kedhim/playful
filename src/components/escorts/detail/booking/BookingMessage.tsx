
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./types";

interface BookingMessageProps {
  form: UseFormReturn<BookingFormValues>;
}

const BookingMessage = ({ form }: BookingMessageProps) => {
  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel>Message (Optional)</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Any special requests or questions" 
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
