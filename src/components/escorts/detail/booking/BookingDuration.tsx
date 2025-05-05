
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./types";

interface BookingDurationProps {
  form: UseFormReturn<BookingFormValues>;
}

const BookingDuration = ({ form }: BookingDurationProps) => {
  const durations = ["1 hour", "2 hours", "3 hours", "Overnight"];

  return (
    <FormField
      control={form.control}
      name="duration"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Duration</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value || durations[0]}
            defaultValue={durations[0]} // Add default value
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookingDuration;
