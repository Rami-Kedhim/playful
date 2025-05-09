
import { z } from "zod";
import { BookingStatus } from "@/types/booking";

export interface BookingFormData {
  date: Date;
  time: string;
  duration: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const bookingFormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  duration: z.string({
    required_error: "Please select a duration.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Re-export Booking type from the main types file
export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  escortName?: string; // Add escortName property
  date: string | Date;
  time: string;
  duration: string; // Using string to match form values
  status: BookingStatus;
  createdAt: string | Date;
  updatedAt?: string | Date;
  price?: number;
  location?: string;
  message?: string;
  totalPrice?: number;
}
