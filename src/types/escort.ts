
export enum ServiceType {
  Massage = 'massage',
  Roleplay = 'roleplay',
  Overnight = 'overnight',
  BDSM = 'bdsm',
  Companionship = 'companionship',
  Dinner = 'dinner',
  Events = 'events',
  Travel = 'travel',
}

// Also allow string literals for more flexible use in data files
export type ServiceTypeString = ServiceType | string;

export interface Availability {
  day?: string;
  days?: string[];
  slots?: {
    start: string;
    end: string;
  }[];
  hours?: string[];
  timeZone?: string;
  availableNow?: boolean;
  customNotes?: string;
}

export interface Rates {
  hourly?: number;
  twoHours?: number;
  overnight?: number;
  weekend?: number;
}

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
  isPublic?: boolean;
}

export interface ContentStats {
  photos?: number;
  videos?: number;
  streams?: string | number;
  live?: boolean | string | number;
}

export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  gender: string;
  services: ServiceTypeString[];
  price: number; // Required property
  rate?: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  rates?: Rates;
  rating: number;
  reviewCount: number;
  reviews?: number;
  avatar: string;
  phone?: string;
  email?: string;
  verified: boolean;
  languages?: string[];
  gallery?: string[];
  availability?: Availability[];
  about?: string;
  bio?: string;
  description?: string;
  subscriptionPrice?: number;
  contentStats?: ContentStats;
  gallery_images?: string[];
  verificationLevel?: string;
  orientation?: string;
  avatar_url?: string;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  tags?: string[];
  featured?: boolean;
  serviceTypes?: string[];
  profileType?: string;
  profileImage?: string;
  imageUrl?: string;
  availableNow?: boolean;
  lastActive?: string | Date;
  responseRate?: number;
  sexualOrientation?: string;
  isAI?: boolean;
  isScraped?: boolean;
  videos?: Video[];
  boostLevel?: number;
  boostExpiry?: Date;
}

export interface EscortFilterOptions {
  gender: string[];
  service: ServiceTypeString[];
  priceRange: [number, number];
  ageRange: [number, number];
  language: string[];
  location: string;
  maxDistance: number;
  availability: string[];
  rating: number;
  verified: boolean;
  selectedServices?: ServiceTypeString[];
  selectedGenders?: string[];
  verifiedOnly?: boolean;
  languages?: string[];
}

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  service: ServiceTypeString;
  status: BookingStatus;
  location?: string;
  price: number;
  deposit?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rejected';

// Import verification types from the verification.ts file to ensure consistency
import { VerificationDocument, VerificationRequest } from './verification';
export type { VerificationDocument, VerificationRequest };
