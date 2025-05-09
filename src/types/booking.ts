
import { Escort } from './escort';

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  startTime: Date | string;
  endTime: Date | string;
  duration: number;
  status: BookingStatus;
  service: string;
  location: string;
  price: number;
  notes?: string;
  createdAt: Date | string;
  escort?: Escort;
  client?: any;
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
  duration: number;
  service: string;
  location: string;
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
