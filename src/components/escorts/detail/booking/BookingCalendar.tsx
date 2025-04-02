
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./types";

interface BookingCalendarProps {
  form: UseFormReturn<BookingFormValues>;
}

const BookingCalendar = ({ form }: BookingCalendarProps) => {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel>Date</FormLabel>
          <FormControl>
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date < new Date()}
              className="border rounded-md p-2"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookingCalendar;
