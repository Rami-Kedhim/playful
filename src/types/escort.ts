
import { VerificationLevel } from './verification';

export interface Escort {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  location?: string;
  bio?: string;
  price?: number;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  verified?: boolean;
  verificationLevel?: VerificationLevel;
  tags?: string[];
  images?: string[];
  photos?: string[];
  imageUrl?: string;
  profileImage?: string;
  services?: string[];
  languages?: string[];
  height?: string;
  weight?: string;
  bodyType?: string;
  ethnicity?: string;
  hairColor?: string;
  eyeColor?: string;
  availability?: string | any;
  availableNow?: boolean;
  lastActive?: string | Date;
  responseRate?: number;
  featured?: boolean;
  bookedTimes?: number;
  contactInfo?: ContactInfo;
  rates?: Rates;
  reviews?: any[];
  description?: string;
  shortDescription?: string;
  city?: string;
}

export interface Rates {
  hourly?: number;
  twoHours?: number;
  twoHour?: number; // legacy
  overnight?: number;
  weekend?: number;
  incall?: Record<string, number | string>;
  outcall?: Record<string, number | string>;
}

export type ServiceType = "in-call" | "out-call" | "virtual" | "massage" | "dinner";

export interface Availability {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface EscortFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minAge?: number;
  maxAge?: number;
  gender?: string[];
  serviceType?: string;
  verifiedOnly?: boolean;
  rating?: number;
  availability?: string;
  services?: string[];
  bodyType?: string[];
  ethnicity?: string[];
  hairColor?: string[];
}
