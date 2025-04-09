
export interface Escort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  services: string[];
  imageUrl: string;
  gallery: string[];
  rates: {
    hourly: number;
    overnight: number;
    twoHours?: number;
    weekend?: number;
  };
  availableNow: boolean;
  verified: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  languages: string[];
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
  availability: {
    days: string[];
    hours: string;
  };
  featured: boolean;
  price: number;

  // Additional fields needed based on errors
  avatar_url?: string;
  gallery_images?: string[];
  sexualOrientation?: string;
  lastActive?: string | Date;
  responseRate?: number;
  description?: string;
  height?: number;
  weight?: number;
  measurements?: {
    bust: number;
    waist: number;
    hips: number;
  };
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  verificationLevel?: VerificationLevel;
  serviceTypes?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  videos?: Video[];
  subscriptionPrice?: number;
  contentStats?: {
    photos: number;
    videos: number;
    live: boolean;
    streams: number;
  };
  
  // Added fields for profile type differentiation and boosting
  profileType: "verified" | "ai" | "provisional"; // For clear profile tagging
  boostLevel?: number; // For boosting algorithm
  boostExpiry?: Date; // For boosted profile expiration
  isAI?: boolean; // Flag for AI models
  isScraped?: boolean; // Flag for scraped profiles
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  verificationLevel: VerificationLevel; // Added this property
  submittedAt: string;
  reviewedAt?: string;
  updatedAt?: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
  expiresAt?: string;
  escortId?: string;
}

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'in_review';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;  
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  url?: string; // For backward compatibility
}

export type ServiceType = 
  | 'GFE'
  | 'Massage'
  | 'Dinner Date'
  | 'Overnight'
  | 'Travel Companion'
  | 'BDSM'
  | 'Role Play'
  | 'Fetish'
  | 'Domination'
  | 'Submission'
  | 'Couples'
  | 'French Kissing'
  | 'Lingerie Shows'
  | 'Exotic Dancing';

export interface EscortAvailability {
  days: string[];
  hours: string;
  exceptions?: {
    date: string;
    available: boolean;
    customHours?: string;
  }[];
}

// New interface for filter options as requested in requirements
export interface EscortFilterOptions {
  location?: string;
  ageRange?: [number, number];
  priceRange?: [number, number];
  verifiedOnly?: boolean;
  escortType?: "verified" | "ai" | "provisional" | "all";
  languages?: string[];
  services?: string[];
  gender?: string[];
  sortBy?: "boosted" | "newest" | "price_low" | "price_high" | "rating";
}
