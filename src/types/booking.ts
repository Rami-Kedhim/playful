
import { Escort } from './Escort';

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  escort?: Escort;
  date?: Date | string;
  time?: string;
  duration?: string | number;
  location?: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rejected';
  createdAt: Date | string;
  updatedAt?: Date | string;
  notes?: string;
  price?: number;
  totalPrice?: number;
  escortName?: string; // Add missing property
  type?: 'incall' | 'outcall' | 'virtual';
  paymentStatus?: 'pending' | 'paid' | 'refunded';
  paymentMethod?: string;
  specialRequests?: string;
  clientName?: string;
  clientAvatar?: string;
}

export interface BookingFilter {
  status?: string[];
  date?: {
    from?: Date;
    to?: Date;
  };
  escortId?: string;
  clientId?: string;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  canceled: number;
  completed: number;
  revenue: number;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}
