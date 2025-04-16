
import { UserRole } from './auth';

export type EscortCategory = 'elite' | 'premium' | 'verified' | 'featured' | 'new';
export type ServiceType = 'massage' | 'escort' | 'companionship' | 'fetish' | 'bdsm' | 'virtual';
export type ServiceLocation = 'incall' | 'outcall' | 'both' | 'virtual';
export type Availability = {
  days: string[];
  hours: string[];
  customNotes?: string;
};
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

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
  avatar?: string;
  profileImage?: string;
  imageUrl?: string;
  images?: string[];
  videos?: string[]; // Added videos array
  isAI?: boolean; // Added isAI flag
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
}
