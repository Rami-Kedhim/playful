
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
  height?: string;
  hair?: string;
  eyes?: string;
  ethnicity?: string;
  languages?: string[];
  verified?: boolean;
  verificationLevel?: VerificationLevel;
  verification_level?: VerificationLevel;
  rating?: number;
  reviewsCount?: number;
  rates?: Rates;
  services?: string[];
  availability?: string[] | Availability[];
  specialties?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  isFeatured?: boolean;
  isNewcomer?: boolean;
  isFavorited?: boolean;
  responseRate?: number;
  price?: number;
  physique?: Physique;
  reviews?: any[];
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
  date: string;
  startTime: string;
  endTime: string;
  service?: string;
  serviceType?: string;
  duration: number;
  price: number;
  status: BookingStatus;
  createdAt: Date;
  notes?: string;
  totalPrice?: number;
}
