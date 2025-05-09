
import { VerificationLevel } from './verification';

// Service types
export type ServiceType = "in-call" | "out-call" | "virtual" | "massage" | "dinner";

// Availability schema
export interface Availability {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
  days?: string[]; // For EscortAbout.tsx
  day?: string; // For EscortAvailability.tsx
}

// Video content
export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  title?: string;
  duration?: number;
  viewCount?: number;
  createdAt?: string;
  isPremium?: boolean;
  views?: number;
  isPublished?: boolean;
  escortId?: string;
  videoUrl?: string;
}

// Pricing rates
export interface Rates {
  hourly?: number;
  twoHour?: number;
  overnight?: number;
  weekend?: number;
  halfHour?: number;
  incall?: Record<string, number | string>;
  outcall?: Record<string, number | string>;
  [key: string]: number | string | Record<string, number | string> | undefined;
}

// Main escort profile interface
export interface Escort {
  id: string;
  name: string;
  age?: number;
  bio?: string;
  description?: string;
  shortDescription?: string;
  location?: string;
  city?: string;
  gender?: string;
  services?: string[];
  photos?: string[];
  rates?: Rates;
  price?: number; 
  responseRate?: number;
  languages?: string[];
  availability?: string[] | Availability;
  contactInfo?: ContactInfo;
  verificationLevel?: VerificationLevel;
  tags?: string[];
  reviewScore?: number;
  reviewCount?: number;
  boosted?: boolean;
  boostLevel?: number;
  boostExpiration?: string;
  featured?: boolean;
  reviews?: any[];
  
  // Visual media properties
  avatarUrl?: string;
  profileImage?: string;
  images?: string[];
  imageUrl?: string;
  avatar?: string;
  avatar_url?: string;
  gallery?: string[];
  gallery_images?: string[];
  videos?: Video[];
  
  // Verification properties
  isVerified?: boolean;
  verified?: boolean;
  
  // Rating and metrics
  rating?: number;
  clientsServed?: number;
  
  // Availability properties
  availableNow?: boolean;
  lastActive?: string | Date;
  
  // User relationship properties
  isFavorited?: boolean;
  
  // Physical characteristics
  height?: string | number;
  weight?: string | number;
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  bodyType?: string;
  sexualOrientation?: string;
  
  // Additional profile details
  stats?: {
    height?: string | number;
    weight?: string | number;
    bust?: string | number;
    waist?: string | number;
    hips?: string | number;
    reviewCount?: number;
  };
  interests?: string[];
  payment_methods?: string[];
  deposit_required?: boolean;
  specialties?: string[];
  limitations?: string[];
  locations?: string[];
  
  // Service capability flags
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
}

export interface ExtendedEscort extends Escort {
  providesInPersonServices: boolean;
  providesVirtualContent: boolean;
  featured?: boolean;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  socialMedia?: Record<string, string>;
}

export interface EscortFilters {
  services?: string[];
  location?: string;
  priceRange?: [number, number];
  age?: [number, number];
  languages?: string[];
  availability?: string[];
  verificationLevel?: VerificationLevel | string;
  sortBy?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  minAge?: number;
  maxAge?: number;
  gender?: string[];
  serviceType?: string;
  verifiedOnly?: boolean;
  rating?: number;
}

// Re-export VerificationLevel for backward compatibility
// export { VerificationLevel };
