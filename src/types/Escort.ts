
import { VerificationLevel } from './verification';

export interface Rates {
  hourly?: number;
  twoHour?: number;
  overnight?: number;
  weekend?: number;
  halfHour?: number;
  [key: string]: number | undefined; // Add this index signature for compatibility
}

export interface Escort {
  id: string;
  name: string;
  age?: number;
  bio?: string;
  location?: string;
  city?: string; // Additional field for city
  gender?: string;
  services?: string[];
  photos?: string[];
  rates?: Rates;
  price?: number; 
  responseRate?: number;
  languages?: string[];
  availability?: string[];
  contactInfo?: ContactInfo;
  verificationLevel?: VerificationLevel;
  tags?: string[];
  reviewScore?: number;
  reviewCount?: number;
  boosted?: boolean;
  boostLevel?: number;
  boostExpiration?: string;
  description?: string;
  featured?: boolean;
  shortDescription?: string;
  reviews?: any[];
  
  // Fields for compatibility
  avatarUrl?: string;
  isVerified?: boolean;
  verified?: boolean;
  rating?: number;
  availableNow?: boolean;
  profileImage?: string;
  images?: string[];
  imageUrl?: string;
  avatar?: string;
  avatar_url?: string;
  clientsServed?: number;
  lastActive?: string | Date;
  isFavorited?: boolean;
  gallery?: string[];
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

// Re-exporting common types for backward compatibility
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
