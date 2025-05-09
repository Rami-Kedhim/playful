
import { z } from "zod";

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

export interface Booking {
  id: string;
  escortId: string;
  escortName: string;
  userId: string;
  date: string | Date;
  time: string;
  duration: string;
  location: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  message?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface UberBooking {
  id: string;
  clientId: string;
  providerId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price: number;
  location?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}
