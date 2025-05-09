
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
  [key: string]: number | Record<string, number>;
  // Common rates
  hourly?: number;
  overnight?: number;
  twoHours?: number;
  weekend?: number;
  // Service-specific rates
  incall?: Record<string, number>;
  outcall?: Record<string, number>;
}

// Stats interface for escort profile
export interface EscortStats {
  averageRating?: number;
  totalReviews?: number;
  reviewCount?: number;
  height?: string | number;
  weight?: string | number;
  bust?: string | number;
  waist?: string | number;
  hips?: string | number;
  rating?: number; // Added this since it's being used
}

// Main escort profile interface
export interface Escort {
  id: string;
  name: string;
  age?: number;
  gender: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  price: number; 
  tags?: string[];
  imageUrl?: string;
  profileImage?: string;
  images?: string[];
  
  // Added missing properties
  bio?: string;
  description?: string;
  verificationLevel?: VerificationLevel | string;
  isVerified?: boolean;
  verified?: boolean;
  isAvailable?: boolean;
  boosted?: boolean;
  featured?: boolean;
  rates?: Rates;
  avatarUrl?: string;
  avatar?: string;
  avatar_url?: string;
  height?: string | number;
  weight?: string | number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  availability?: string[] | Availability | string;
  sexualOrientation?: string;
  responseRate?: number;
  services?: string[];
  languages?: string[];
  payment_methods?: string[];
  deposit_required?: boolean;
  city?: string;
  shortDescription?: string;
  photos?: string[];
  reviews?: any[];
  gallery?: string[];
  gallery_images?: string[];
  videos?: Video[];
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
    socialMedia?: Record<string, string>;
  };
  stats?: EscortStats;
  profileType?: string;
  boostLevel?: number;
  isAI?: boolean;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  measurements?: string;
  bodyType?: string; // Added missing bodyType property
  specialties?: string[];
  limitations?: string[];
  isFavorited?: boolean;
  lastActive?: string | Date;
  clientsServed?: number;
  interests?: string[];
  locations?: string[];
  subscriptionPrice?: number; // Added for escortProfiles.ts
}

export interface ExtendedEscort extends Escort {
  providesInPersonServices: boolean;
  providesVirtualContent: boolean;
  featured: boolean;
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

// Export Video type explicitly
export { Video };
