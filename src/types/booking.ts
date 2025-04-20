
export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string | Date;
  startTime?: string;
  endTime?: string;
  duration: number;
  service: string;
  status: string;
  price: number;
  location?: string;
  notes?: string;
  createdAt: string | Date;
  updatedAt?: string;
  serviceType?: string;
}
