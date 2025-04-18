
import { VerificationDocument, VerificationLevel, VerificationRequest, VerificationStatus } from './verification';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  DECLINED = 'declined'
}

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
  
  // Additional properties
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
  ethnicity?: string;
  bodyType?: string;
  description?: string;
  gallery?: string[] | { imageUrls: string[] };
  videos?: Array<string | { url: string, title?: string, thumbnail?: string }>;
  verificationLevel?: VerificationLevel;
  verification_level?: string;
  isFavorited?: boolean;
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
  // Compatibility fields for components that expect 'days'
  days?: string[];
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
  serviceType?: string; // Add this for compatibility
}

// Add escort filter constants
export const ESCORT_BODY_TYPE_OPTIONS = [
  'Slim', 'Athletic', 'Average', 'Curvy', 'Full-figured', 'Muscular'
];

export const ESCORT_ETHNICITY_OPTIONS = [
  'Asian', 'Black', 'Caucasian', 'Hispanic/Latino', 'Middle Eastern', 'Mixed', 'Other'
];

export const ESCORT_EYE_COLOR_OPTIONS = [
  'Blue', 'Brown', 'Green', 'Hazel', 'Gray', 'Other'
];

export const ESCORT_HAIR_COLOR_OPTIONS = [
  'Black', 'Blonde', 'Brown', 'Red', 'Gray', 'Other'
];

export const ESCORT_LANGUAGE_OPTIONS = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Russian', 'Portuguese', 'Arabic'
];
