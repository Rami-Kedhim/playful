
import { VerificationDocument, VerificationLevel, VerificationRequest, VerificationStatus } from './verification';

export interface Escort {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  location?: string;
  bio?: string;
  rating?: number;
  price?: number;
  hourly_rate?: number; // For compatibility
  images?: string[];
  services?: string[];
  isVerified?: boolean;
  verified?: boolean; // Alias for compatibility
  featured?: boolean;
  isFeatured?: boolean; // Alias for compatibility 
  contactInfo?: ContactInfo;
  availability?: Availability | Availability[] | string[];
  created_at?: string;
  user_id?: string; // For compatibility
  measurements?: Measurements;
  subscriptionPrice?: number;
  contentStats?: ContentStats;
  orientation?: string;
  
  // Additional properties used in components
  reviewCount?: number;
  reviews?: number;
  tags?: string[];
  imageUrl?: string;
  profileImage?: string;
  avatar?: string;
  avatar_url?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string | Date;
  responseRate?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  languages?: string[];
  rates?: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  serviceTypes?: string[];
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  weight?: number;
}

export interface Measurements {
  bust?: number;
  waist?: number;
  hips?: number;
  height?: number;
  weight?: number;
  dress?: number;
  shoe?: number;
}

export interface ContentStats {
  photos?: number;
  videos?: number;
  total?: number;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  social?: SocialMedia;
}

export interface SocialMedia {
  twitter?: string;
  instagram?: string;
  onlyfans?: string;
  snapchat?: string;
}

export type ServiceType = 
  | 'gfe' 
  | 'massage' 
  | 'roleplay' 
  | 'bdsm' 
  | 'fetish' 
  | 'couple' 
  | 'outcall' 
  | 'incall'
  | 'travel' 
  | 'dinner' 
  | 'virtual'
  | string;

export interface Service {
  type: ServiceType;
  name: string;
  description?: string;
  price?: number;
  duration?: number;
  isAvailable?: boolean;
}

export interface Availability {
  day?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  isAvailable?: boolean;
}

export type ExtendedAvailability = Availability & {
  id?: string;
  escortId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  duration?: number;
  views?: number;
  isPremium?: boolean;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Add missing types from booking components
export type BookingStatus = 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rejected';

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  service: ServiceType;
  status: BookingStatus;
  location?: string;
  price: number;
  deposit?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
