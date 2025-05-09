
import { VerificationLevel } from './verification';

export type ServiceType = "in-call" | "out-call" | "virtual" | "massage" | "dinner";

export interface Availability {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
  days?: string[]; // Added for EscortAbout.tsx
  day?: string; // Added for EscortAvailability.tsx
}

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
}

export interface Rates {
  hourly?: number;
  twoHour?: number;
  overnight?: number;
  weekend?: number;
  halfHour?: number;
  incall?: Record<string, number | string>;
  outcall?: Record<string, number | string>;
  [key: string]: number | string | Record<string, number | string> | undefined; // Add this index signature for compatibility
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
  availability?: string[] | Availability;
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
  
  // Fields for compatibility with existing components
  avatarUrl?: string;
  isVerified?: boolean;
  verified?: boolean;     // For compatibility with different naming conventions
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
  gallery_images?: string[]; // Added for MediaSection
  videos?: Video[]; // Added for MediaSection
  height?: string | number; // Support for both string and number types
  weight?: string | number; // Added for EscortDetails
  measurements?: string; // Added for EscortDetails
  hairColor?: string; // Added for EscortDetails
  eyeColor?: string; // Added for EscortDetails
  ethnicity?: string; // Added for EscortDetails
  sexualOrientation?: string; // Added for EscortDetailTabs
  stats?: { // Added for AboutTab
    height?: string | number;
    weight?: string | number;
    bust?: string | number;
    waist?: string | number;
    hips?: string | number;
    reviewCount?: number;
  };
  interests?: string[]; // Added for AboutTab
  payment_methods?: string[]; // Added for RatesTab
  deposit_required?: boolean; // Added for RatesTab
  specialties?: string[]; // Added for ServicesTab
  limitations?: string[]; // Added for ServicesTab
  locations?: string[]; // Added for BookingForm
  providesInPersonServices?: boolean; // Added for EscortResults & BookingDialog
  providesVirtualContent?: boolean; // Added for EscortResults & BookingDialog
  bodyType?: string; // Added for EscortAbout
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

// Added for profile completion hook to work with extended escort type
export interface ExtendedEscort extends Escort {
  providesInPersonServices: boolean;
  providesVirtualContent: boolean;
}

// Export VerificationLevel for EscortAbout.tsx
export { VerificationLevel };
