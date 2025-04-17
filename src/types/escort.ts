
// Define the enum types needed across the application
export enum ServiceType {
  Massage = 'massage',
  Roleplay = 'roleplay',
  Overnight = 'overnight',
  BDSM = 'bdsm',
  Companionship = 'companionship',
  Dinner = 'dinner',
  Events = 'events',
  Travel = 'travel',
}

// Also allow string literals for more flexible use
export type ServiceTypeString = ServiceType | string;

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  DECLINED = 'declined'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface Availability {
  day: string;
  slots: {
    start: string;
    end: string;
  }[];
}

// Main Escort interface
export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  gender: string;
  services?: ServiceTypeString[];
  rates?: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  rating?: number;
  reviewCount?: number;
  avatar?: string;
  phone?: string;
  email?: string;
  verified?: boolean;
  languages?: string[];
  gallery?: string[] | { imageUrls: string[] };
  images?: string[];
  videos?: string[] | { url: string; title?: string; thumbnail?: string }[];
  availability?: Availability[] | string[];
  about?: string;
  bio?: string;
  
  // Additional fields needed by components
  description?: string;
  subscriptionPrice?: number;
  contentStats?: {
    photos?: number;
    videos?: number;
    streams?: string | number;
    live?: boolean | string | number;
  };
  gallery_images?: string[];
  verificationLevel?: VerificationLevel | string;
  orientation?: string;
  avatar_url?: string;
  
  // Fields for service type compatibility
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  
  // Fields for profiles
  tags?: string[];
  price?: number;
  featured?: boolean;
  serviceTypes?: string[];
  profileType?: string;
  profileImage?: string;
  imageUrl?: string;
  availableNow?: boolean;
  lastActive?: string | Date;
  responseRate?: number;
  reviews?: number;
  sexualOrientation?: string;
  
  // Physical attributes
  height?: number | string;
  weight?: number | string;
  measurements?: { bust: string; waist: string; hips: string } | string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
}

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string | Date;
  startTime: string;
  endTime: string;
  duration: number;
  service: ServiceTypeString;
  status: BookingStatus;
  location?: string;
  price: number;
  deposit?: number;
  notes?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
  isPublic?: boolean;
}

export interface VerificationDocument {
  id: string;
  verification_id: string;
  document_type: string;
  document_url: string;
  status: VerificationStatus;
  notes?: string;
  created_at: string;
  updated_at?: string;
  
  // Backward compatibility fields
  type?: string;
  url?: string;
  fileUrl?: string;
  uploadedAt?: string;
}

export interface VerificationRequest {
  id: string;
  profile_id: string;
  userId?: string; // Make userId optional to resolve conflict
  status: VerificationStatus;
  requested_level: VerificationLevel;
  documents: VerificationDocument[];
  created_at?: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
  
  // For backward compatibility
  submittedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  verificationLevel?: VerificationLevel;
  rejectionReason?: string;
  rejection_reason?: string;
  level?: VerificationLevel;
  user_id?: string;
}
