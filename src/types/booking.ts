
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected'
}

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  escortName?: string;
  date: string | Date;
  time: string;
  duration: string;
  status: BookingStatus;
  createdAt: string | Date;
  updatedAt?: string | Date;
  price?: number;
  location?: string;
  message?: string;
  totalPrice?: number;
  type?: 'in-person' | 'virtual';
  paymentStatus?: 'pending' | 'paid' | 'refunded';
}
