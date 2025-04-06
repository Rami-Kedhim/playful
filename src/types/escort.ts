
export type VerificationLevel = "none" | "basic" | "enhanced" | "premium";

export type ServiceType = 
  | "massage" 
  | "gfe" 
  | "dinner_date" 
  | "overnight" 
  | "travel_companion" 
  | "roleplay" 
  | "bdsm" 
  | "couples" 
  | "fetish" 
  | "domination" 
  | "submission";

export type VerificationStatus = "pending" | "in_review" | "approved" | "rejected" | "expired";

export interface VerificationDocument {
  id: string;
  type: string;
  url: string;
  status: string;
}

export interface VerificationRequest {
  id: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  documents: VerificationDocument[];
  requestedLevel?: VerificationLevel;
  escortId: string;
  userId: string;
}

export interface EscortAvailability {
  days: string[];
  hours: string;
}

export interface Measurements {
  bust?: number;
  waist?: number;
  hips?: number;
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  isPremium?: boolean;
}

export interface Rates {
  hourly: number;
  twoHours?: number;
  overnight?: number;
  weekend?: number;
}

export interface ContentStats {
  photos: number;
  videos: number;
  live: boolean;
  streams: number;
}

export interface Escort {
  id: string;
  name: string;
  location: string;
  age?: number;
  rating?: number;
  reviews?: number;
  tags: string[];
  imageUrl?: string;
  avatar_url?: string;
  price: number;
  verified: boolean;
  gender?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
  bio?: string;
  height?: string | number;
  weight?: string | number;
  bodyType?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];
  videos?: Video[];
  verificationLevel?: VerificationLevel;
  gallery?: string[];
  gallery_images?: string[];
  description?: string;
  measurements?: Measurements;
  services?: string[];
  serviceTypes?: string[];
  availability?: EscortAvailability;
  rates?: Rates;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  featured?: boolean;
  providesVirtualContent?: boolean;
  providesInPersonServices?: boolean;
  contentStats?: ContentStats;
  subscriptionPrice?: number;
}

export interface EscortFilter {
  search: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  services: string[];
  verifiedOnly: boolean;
  gender?: string[];
  orientation?: string[];
  minAge?: number;
  maxAge?: number;
  minRating?: number;
  availableNow?: boolean;
}

export type EscortSortOption = 
  | "featured" 
  | "rating" 
  | "price-low" 
  | "price-high" 
  | "reviews" 
  | "newest";
