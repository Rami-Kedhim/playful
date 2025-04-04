
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';
export type ServiceType = 'in-person' | 'virtual' | 'both';

export interface VerificationRequest {
  id: string;
  userId: string;
  escortId: string;
  status: VerificationStatus;
  documents: string[];
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface Rates {
  hourly?: number;
  twoHours?: number;
  overnight?: number;
  weekend?: number;
}

export interface ContentStats {
  photos?: number;
  videos?: number;
  live?: boolean;
  streams?: number;
}

export interface EscortAvailability {
  days?: string[];
  hours?: string;
}

export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  bio?: string;
  avatar_url?: string;
  gallery_images?: string[];
  services?: string[];
  rating: number;
  reviews: number;
  price?: number;
  verified?: boolean;
  verificationLevel?: VerificationLevel;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  gender?: string;
  sexualOrientation?: string;
  availability?: Record<string, string[]> | EscortAvailability;
  serviceTypes?: ServiceType[];
  featured?: boolean;
  tags?: string[];
  isLive?: boolean;
  
  // Additional fields to match usage in codebase
  imageUrl?: string;
  description?: string;
  gallery?: string[];
  videos?: Video[];
  rates?: Rates;
  height?: number;
  weight?: number;
  measurements?: {
    bust?: number;
    waist?: number;
    hips?: number;
  };
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];
  providesVirtualContent?: boolean;
  providesInPersonServices?: boolean;
  subscriptionPrice?: number;
  contentStats?: ContentStats;
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
  virtualAvailability?: EscortAvailability;
}

// Additional types used with escorts
export interface EscortCardProps {
  id: string;
  name: string;
  location: string;
  age: number;
  rating: number;
  reviews: number;
  tags: string[];
  imageUrl: string;
  price: number;
  verified: boolean;
  gender?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
}
