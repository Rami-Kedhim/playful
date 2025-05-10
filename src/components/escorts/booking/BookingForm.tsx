import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import BookingMessage from "./BookingMessage";
import { BookingFormValues, bookingFormSchema } from './types';
import { Escort } from '@/types/Escort';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatCurrency } from '@/utils/formatters';

interface BookingFormProps {
  escort: Escort;
  serviceType: "in_person" | "virtual";
  onSubmit: (data: BookingFormValues) => void;
  isSubmitting?: boolean;
}

const BookingForm = ({
  escort,
  serviceType,
  onSubmit,
  isSubmitting = false,
}: BookingFormProps) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      duration: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Get default location from escort data
  const defaultLocation = escort.location || '';
  
  // Prepare location options - if escort has locations array, use it
  // otherwise fallback to the single location
  const locationOptions = Array.isArray(escort.locations) && escort.locations.length > 0 
    ? escort.locations 
    : [defaultLocation];

  // Duration options
  const durationOptions = [
    { value: "1hour", label: "1 hour", price: escort.rates?.hourly || escort.price },
    { value: "2hours", label: "2 hours", price: escort.rates?.twoHours || (escort.price * 1.8) },
    { value: "overnight", label: "Overnight", price: escort.rates?.overnight || (escort.price * 5) },
  ];

  // Calculate price based on duration
  const calculatePrice = (duration: string) => {
    const option = durationOptions.find((opt) => opt.value === duration);
    return option?.price || escort.price;
  };

  // Handle time slot selection
  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", 
    "20:00", "21:00", "22:00", "23:00"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Date selector */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 1))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time selector */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
          
          {/* Duration selector */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} ({formatCurrency(option.price)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Personal information fields */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message field */}
        <BookingMessage form={form} />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Request Booking"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
