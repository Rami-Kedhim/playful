
export interface Escort {
  id: string;
  name: string;
  username: string;
  age?: number;
  gender?: string;
  sexualOrientation?: string;
  location?: string;
  bio?: string;
  profileImage: string;
  isVerified?: boolean;
  verificationLevel?: string;
  verification_level?: string; // Legacy field
  price?: number;
  rating?: number;
  serviceType?: 'in-person' | 'virtual' | 'both';
  
  // Gallery related fields
  gallery?: string[];
  gallery_images?: string[];
  images?: string[];
  videos?: string[];
  
  // Legacy fields for backward compatibility
  imageUrl?: string;
  avatarUrl?: string;
  avatar?: string;
  avatar_url?: string;
  verified?: boolean;
  availableNow?: boolean;
  tags?: string[];
  reviews?: any[];
  measurements?: string;
  
  // Optional but used in some components
  height?: string;
  weight?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];
  availability?: string;
  rates?: { [key: string]: number };
  services?: string[];
  
  // Service type flags
  providesInPersonServices?: boolean;
  providesVirtualServices?: boolean;
}

export interface Video {
  id: string;
  title?: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  uploadedAt: Date;
  views: number;
  isPremium?: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: Date;
  duration: number; // in minutes
  service: string;
  status: BookingStatus;
  price: number;
  location?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
