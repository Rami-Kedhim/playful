
// Export all booking components
export { default as BookingDialog } from './BookingDialog';
export { default as BookingButton } from './BookingButton';
export { default as BookingRequestCard } from './BookingRequestCard';
export { default as BookingForm } from './BookingForm';
export { default as BookingCalendar } from './BookingCalendar';
export { default as BookingTimeSlots } from './BookingTimeSlots';
export { default as BookingDuration } from './BookingDuration';
export { default as BookingContactInfo } from './BookingContactInfo';
export { default as BookingMessage } from './BookingMessage';
export { default as BookingConfirmation } from './BookingConfirmation';
export type { BookingFormData } from './types';

// Export booking types
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
