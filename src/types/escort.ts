
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
  bio?: string;
  tags?: string[];
  gallery?: string[];
  gallery_images?: string[]; // Some components use this instead of gallery
  services?: string[];
  serviceTypes?: string[]; // For backward compatibility
  availability?: any;
  reviews?: number;
  reviewCount?: number; // For components expecting this name
  rating?: number;
  is_verified?: boolean;
  verified?: boolean; // For components using this version
  is_featured?: boolean;
  featured?: boolean; // For components using this version
  
  // Physical attributes and demographics
  age?: number;
  gender?: string;
  sexualOrientation?: string;
  height?: number | string;
  weight?: number | string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  measurements?: {
    bust?: number | string;
    waist?: number | string;
    hips?: number | string;
  };
  
  // Status and activity
  availableNow?: boolean;
  lastActive?: Date | string;
  responseRate?: number;
  
  // Media and content
  imageUrl?: string; // For backward compatibility
  profileImage?: string; // For backward compatibility
  videos?: string[];
  
  // Verification and trust signals
  verificationLevel?: 'none' | 'basic' | 'enhanced' | 'premium';
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  languages?: string[];
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
