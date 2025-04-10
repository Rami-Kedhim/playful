
export interface Escort {
  id: string;
  name: string;
  location: string;
  age: number;
  profileImage: string;
  imageUrl?: string;
  avatar_url?: string;
  gender?: string;
  orientation?: string;
  sexualOrientation?: string;
  description?: string;
  bio?: string;
  services?: ServiceType[];
  tags?: string[];
  gallery?: string[];
  gallery_images?: string[];
  videos?: string[];
  price?: number;
  rates?: {
    hourly?: number;
    twoHours?: number;
    dinner?: number;
    overnight?: number;
    weekend?: number;
    [key: string]: number | undefined;
  };
  ratings?: number;
  rating?: number;
  reviewCount?: number;
  reviews?: number;
  verificationLevel?: VerificationLevel;
  availability?: string[] | {
    days?: string[];
    hours?: string[];
  };
  responseTime?: string;
  responseRate?: number;
  height?: string | number;
  weight?: string | number;
  measurements?: string | {
    bust?: number;
    waist?: number;
    hips?: number;
  };
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  languages?: string[];
  verified?: boolean;
  featured?: boolean;
  availableNow?: boolean;
  lastActive?: string | Date;
  profileType?: 'verified' | 'ai' | 'provisional';
  boostLevel?: number;
  isAI?: boolean;
  isScraped?: boolean;
  subscriptionPrice?: number;
  serviceTypes?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  contentStats?: {
    photos?: number;
    videos?: number;
    streams?: string;
    live?: boolean;
  };
}

export type ServiceType = 
  | "massage" 
  | "companionship" 
  | "date" 
  | "overnight" 
  | "travel" 
  | "dinner" 
  | "events"
  | "fetish"
  | "roleplay"
  | "bdsm"
  | "gfe"
  | "Dinner Date"
  | "Events"
  | "Weekend Getaways"
  | "Travel Companion"
  | "Sensual Massage"
  | "Role Play"
  | "BDSM"
  | "Overnight"
  | "virtual-date"
  | "custom-content"
  | "role-play"
  | "dinner-date";

export interface ServiceCategory {
  id: string;
  name: string;
  services: ServiceType[];
}

// Add the missing VerificationLevel enum
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

// Add missing VerificationStatus
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

// Add missing VerificationDocument interface
export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Add missing VerificationRequest interface
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

// Add missing EscortFilterOptions interface
export interface EscortFilterOptions {
  searchQuery?: string;
  location?: string;
  priceRange?: [number, number];
  verifiedOnly?: boolean;
  selectedServices?: string[];
  sortBy?: string;
  selectedGenders?: string[];
  selectedOrientations?: string[];
  ageRange?: [number, number];
  ratingMin?: number;
  availableNow?: boolean;
  serviceTypeFilter?: string;
  currentPage?: number;
}

// Add missing EscortAvailability interface
export interface EscortAvailability {
  days: string[];
  hours: string[];
  timeZone?: string;
  availableNow?: boolean;
  customNotes?: string;
}

// Add missing Video interface
export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
  isPremium?: boolean;
  views?: number;
}
