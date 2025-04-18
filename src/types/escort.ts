
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
