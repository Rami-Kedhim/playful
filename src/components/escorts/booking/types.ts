
import { Escort } from '@/types/Escort';

export interface BookingFormValues {
  date?: Date;
  time?: string;
  duration?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface BookingConfirmationProps {
  escort: Escort;
  formData: BookingFormValues;
  onClose?: () => void;
}
