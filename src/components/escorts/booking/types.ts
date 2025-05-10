
import { Escort } from '@/types/Escort';

export interface BookingFormData {
  date?: Date;
  time?: string;
  duration?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

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
  formData: BookingFormData;
  onClose?: () => void;
}
