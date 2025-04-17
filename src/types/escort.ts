
import { VerificationLevel, VerificationStatus } from './verification';
import { DatabaseGender } from './auth';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export enum ServiceType {
  InPerson = 'in-person',
  Virtual = 'virtual',
  Companionship = 'companionship',
  Both = 'both'
}

export interface GalleryType {
  imageUrls: string[];
  videoUrls?: string[];
  length?: number;
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  duration?: number;
  isPublic?: boolean;
}

export interface Rates {
  hourly?: number;
  twoHours?: number;
  additional?: number;
  overnight?: number;
  weekend?: number;
  custom?: Record<string, number>;
}

export interface Availability {
  days: string[];
  hours: string[];
  customNotes: string;
  timeZone?: string;
  availableNow?: boolean;
}

export interface Booking {
  id: string;
  escortId: string;
  userId: string;
  clientId?: string; // Added for compatibility
  date: Date | string;
  time: string;
  duration: string;
  location: string;
  price: number;
  status: BookingStatus;
  message?: string;
  serviceType?: string;
  service?: string; // Added for compatibility
  createdAt: Date | string;
  updatedAt: Date | string;
  startTime?: Date | string;
  endTime?: Date | string;
  escortName?: string;
  totalPrice?: number;
  notes?: string;
}

export interface Escort {
  id: string;
  username: string;
  name: string;
  age: number;
  location: string;
  price: number;
  gender: string;
  sexualOrientation: string;
  imageUrl: string;
  profileImage: string;
  bio?: string;
  height?: string;
  weight?: string;
  bodyType?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];
  services?: string[];
  availability?: Availability;
  rating: number;
  reviewCount?: number;
  verified?: boolean;
  featured?: boolean;
  verificationLevel?: VerificationLevel;
  gallery?: GalleryType | string[];
  rates?: Rates;
  profileType?: 'verified' | 'provisional' | 'ai';
  isAI?: boolean;
  isScraped?: boolean;
  boostLevel?: number;
  avatar_url?: string; // Added for profileMapping.ts
  videos?: Video[];
  subscriptionPrice?: number;
  orientation?: string; // Added for backward compatibility
}

export interface EscortFilter {
  location?: string;
  priceRange?: [number, number];
  gender?: string[];
  age?: [number, number];
  services?: string[];
  languages?: string[];
  bodyType?: string[];
  ethnicity?: string[];
  verified?: boolean;
  rating?: number;
  availability?: string[];
  serviceType?: ServiceType | string;
}

export interface EscortFilterOptions {
  location: string[];
  services: string[];
  bodyTypes: string[];
  ethnicities: string[];
  genders: string[];
  languages: string[];
}

// Export types from verification.ts here
export type { VerificationDocument, VerificationRequest, VerificationStatus, VerificationLevel } from './verification';
