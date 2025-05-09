
import { Escort } from './escort';

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  startTime?: Date | string;
  endTime?: Date | string;
  duration: string; // Changed from number to string to match component usage
  status: BookingStatus;
  service?: string;
  location?: string;
  price?: number;
  notes?: string;
  createdAt: Date | string;
  escort?: Escort;
  client?: any;
  date?: Date | string; // Add date to match component usage
  time?: string; // Add time to match component usage
  message?: string; // Add message to match component usage
  totalPrice?: number; // Add totalPrice for consistency
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'rejected';

export interface BookingRequest {
  escortId: string;
  startTime: Date | string;
  endTime?: Date | string;
  duration: string; // Changed from number to string
  service?: string;
  location?: string;
  notes?: string;
}

export interface BookingFilters {
  status?: BookingStatus[];
  startDate?: Date;
  endDate?: Date;
  escortId?: string;
  clientId?: string;
  service?: string;
  location?: string;
}
