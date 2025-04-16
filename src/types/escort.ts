
export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';

export interface Escort {
  id: string;
  name: string;
  avatar_url?: string;
  location: string;
  price?: number;
  rates?: {
    hourly?: number;
    [key: string]: number | undefined;
  };
  description?: string;
  tags?: string[];
  gallery?: string[];
  services?: string[];
  availability?: any;
  reviews?: number;
  rating?: number;
  is_verified?: boolean;
  is_featured?: boolean;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
}

export interface Booking {
  id: string;
  escort_id: string;
  client_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  price: number;
  location?: any;
  notes?: string;
  booking_type?: string;
  service_type?: string;
  created_at: string;
  updated_at: string;
  special_requests?: string;
  action_url?: string;
  action_text?: string;
}
