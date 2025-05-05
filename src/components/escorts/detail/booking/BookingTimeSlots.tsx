
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

interface BookingTimeSlotsProps {
  form: UseFormReturn<BookingFormValues>;
}

const BookingTimeSlots = ({ form }: BookingTimeSlotsProps) => {
  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
    "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
  ];
  const defaultTimeSlot = timeSlots[0];

  return (
    <FormField
      control={form.control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <Select 
            onValueChange={(value) => field.onChange(value || defaultTimeSlot)} 
            value={field.value || defaultTimeSlot}
            defaultValue={defaultTimeSlot}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
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

export default BookingTimeSlots;
