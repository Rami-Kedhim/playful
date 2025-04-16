
import { UserRole } from './auth';

export type EscortCategory = 'elite' | 'premium' | 'verified' | 'featured' | 'new';
export type ServiceType = 'massage' | 'escort' | 'companionship' | 'fetish' | 'bdsm' | 'virtual' | 'in-person' | 'both';
export type ServiceLocation = 'incall' | 'outcall' | 'both' | 'virtual';
export type Availability = {
  days: string[];
  hours: string[];
  customNotes?: string;
};
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

// Booking related types
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
  CANCELED = 'canceled',
  COMPLETED = 'completed'
}

export interface Booking {
  id: string;
  escortId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  serviceType: string;
  location: string;
  status: BookingStatus;
  totalPrice: number;
  createdAt: Date;
  notes?: string;
  isPaid?: boolean;
  paymentId?: string;
}

export interface Escort {
  id: string;
  name: string;
  username: string;
  profileSource?: 'scraped' | 'manual' | 'ai_enhanced' | 'ai_generated';
  verified?: boolean;
  featured?: boolean;
  boosted?: boolean;
  elite?: boolean;
  age?: number;
  gender?: string;
  location?: string;
  about?: string;
  description?: string;
  bio?: string;
  avatar?: string;
  profileImage?: string;
  imageUrl?: string;
  images?: string[];
  videos?: string[] | { id: string; url: string; thumbnail: string; title: string; duration?: number; isPublic?: boolean }[];
  isAI?: boolean;
  gallery?: {
    imageUrls?: string[];
    videoUrls?: string[];
  };
  categories?: EscortCategory[];
  serviceTypes?: ServiceType[];
  serviceLocations?: ServiceLocation[];
  availability?: Availability | Availability[];
  rating?: number;
  reviews?: number;
  reviewCount?: number;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  price?: number;
  pricePerHour?: number;
  rates?: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    onlyfans?: string;
  };
  bodyStats?: {
    height?: string;
    weight?: string;
    measurements?: string;
    bodyType?: string;
    hairColor?: string;
    eyeColor?: string;
  };
  preferences?: {
    languages?: string[];
    nationality?: string;
    ethnicity?: string;
    orientation?: string;
  };
  roles?: UserRole[];
  
  // Additional properties needed by components
  tags?: string[];
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: Date;
  responseRate?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  languages?: string[];
  height?: number | string;
  weight?: number | string;
  measurements?: string | { bust?: number | string; waist?: number | string; hips?: number | string; };
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  services?: string[];
  verificationLevel?: 'none' | 'basic' | 'enhanced' | 'premium';
  contentStats?: {
    photos?: number;
    videos?: number;
    streams?: number;
    live?: boolean;
  };
}
