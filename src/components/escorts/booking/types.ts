
import * as z from 'zod';

export const bookingFormSchema = z.object({
  date: z.date(),
  time: z.string().min(1, { message: 'Please select a time' }),
  duration: z.string().min(1, { message: 'Please select a duration' }),
  name: z.string().min(2, { message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(6, { message: 'Please enter a valid phone number' }),
  message: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
