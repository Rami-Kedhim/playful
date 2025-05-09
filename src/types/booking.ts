
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rejected';

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  escortName?: string;
  date: Date | string;
  time: string;
  duration: string;
  location?: string;
  status: BookingStatus;
  price?: number;
  totalPrice?: number;
  message?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface BookingSlot {
  id: string;
  escortId: string;
  startTime: Date | string;
  endTime: Date | string;
  status: 'available' | 'booked' | 'unavailable';
  price: number;
  isVirtual?: boolean;
}
