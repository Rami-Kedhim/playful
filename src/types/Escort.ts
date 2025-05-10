
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium' | 'verified';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  filePath?: string;
  documentType?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  verificationLevel: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
}

// Define EscortAvailability interface for better type checking
export interface EscortAvailabilityDay {
  day: string;
  available: boolean;
  hours?: { start: string; end: string }[];
}

export interface EscortAvailability {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
  days?: EscortAvailabilityDay[];
  day?: string;
  notes?: string;
  isAvailableNow?: boolean;
}

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
  isVerified?: boolean;
  verified?: boolean;
  availableNow?: boolean;
  isAvailable?: boolean;
  responseRate?: number;
  description?: string;
  services?: string[];
  languages?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  locations?: string[];
  
  // Additional properties
  bio?: string;
  sexualOrientation?: string;
  height?: string | number;
  weight?: string | number;
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  bodyType?: string;
  stats?: {
    averageRating?: number;
    totalReviews?: number;
    reviewCount?: number;
    height?: string | number;
    weight?: string | number;
    bust?: string | number;
    waist?: string | number;
    hips?: string | number;
    rating?: number;
  };
  verificationLevel?: VerificationLevel | string;
  avatar?: string;
  avatar_url?: string;
  avatarUrl?: string;
  isFavorited?: boolean;
  lastActive?: string | Date;
  clientsServed?: number;
  rates?: {
    [key: string]: number | Record<string, number>;
    hourly?: number;
    overnight?: number;
    twoHours?: number;
    weekend?: number;
    incall?: Record<string, number>;
    outcall?: Record<string, number>;
  };
  payment_methods?: string[];
  deposit_required?: boolean;
  specialties?: string[];
  limitations?: string[];
  interests?: string[];
  
  // Gallery and media
  gallery?: string[];
  gallery_images?: string[];
  videos?: Video[];
  
  // Additional fields
  availability?: EscortAvailability | string[] | string;
  featured?: boolean;
  boosted?: boolean;
  boostLevel?: number;
  isAI?: boolean;
  profileType?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
    socialMedia?: Record<string, string>;
  };
  city?: string;
  shortDescription?: string;
  contentStats?: any;
  subscriptionPrice?: number;
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

// Explicitly export types
export { Video };
export type { EscortAvailability };
