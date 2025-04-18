
import { VerificationLevel } from './verification';

export interface Measurements {
  bust: string;
  waist: string;
  hips: string;
}

export interface Rates {
  hourly: number;
  twoHours?: number;
  additional?: number;
  overnight?: number;
  weekend?: number;
}

export interface Physique {
  bodyType?: string;
  build?: string;
  features?: string[];
}

export interface Availability {
  day?: string;
  hours?: string;
  available?: boolean;
  slots?: { start: string; end: string }[];
}

export interface Escort {
  id: string;
  name: string;
  gender?: string;
  age?: number;
  location?: string;
  bio?: string;
  avatar?: string;
  profileImage?: string;
  coverImage?: string;
  gallery?: string[];
  measurements?: Measurements;
  height?: string | number;
  weight?: number;
  hair?: string;
  eyes?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];
  verified?: boolean;
  verificationLevel?: VerificationLevel;
  verification_level?: VerificationLevel;
  rating?: number;
  reviewsCount?: number;
  reviewCount?: number;
  rates?: Rates;
  services?: string[];
  serviceTypes?: string[];
  availability?: string[] | Availability[];
  specialties?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  isFeatured?: boolean;
  featured?: boolean;
  isNewcomer?: boolean;
  isFavorited?: boolean;
  responseRate?: number;
  price?: number;
  physique?: Physique;
  reviews?: any[];
  tags?: string[];
  imageUrl?: string;
  avatar_url?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string | Date;
  description?: string;
  images?: string[];
  videos?: any[];
  bodyType?: string;
  isAI?: boolean;
  isScraped?: boolean;
  profileType?: string;
  boostLevel?: number;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
  DECLINED = 'declined'
}

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  service?: string;
  serviceType?: string;
  duration: number;
  price: number;
  status: BookingStatus;
  createdAt: Date;
  notes?: string;
  totalPrice?: number;
}

