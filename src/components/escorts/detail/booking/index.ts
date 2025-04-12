
import BookingDialog from './BookingDialog';

// Define the BookingFormData type for export
export interface BookingFormData {
  date: Date;
  time: string;
  duration?: string;
  message?: string;
}

// Export BookingForm component with the correct prop types
export const BookingForm = BookingDialog;

export type BookingFormProps = {
  escort: any;
  open: boolean; // Using 'open' instead of 'isOpen'
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
};
