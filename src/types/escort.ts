
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export interface Measurements {
  bust: string | number;
  waist: string | number;
  hips: string | number;
}

export interface Rates {
  hourly: number;
  twoHours?: number;
  additional?: number;
  overnight?: number;
  weekend?: number;
}

export interface Physique {
  bodyType?: string;
  build?: string;
  features?: string[];
}

export interface Availability {
  day?: string;
  hours?: string[] | number[] | string;
  available?: boolean;
  slots?: { start: string; end: string }[];
  days?: string[];
  customNotes?: string;
}

export interface ExtendedAvailability extends Availability {
  weekdays?: boolean;
  weekends?: boolean;
  timeOfDay?: string[];
}

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
  isPublic?: boolean;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    onlyfans?: string;
    [key: string]: string | undefined;
  };
}

export enum ServiceType {
  MASSAGE = "massage",
  COMPANIONSHIP = "companionship",
  OVERNIGHT = "overnight",
  TRAVEL = "travel",
  DINNER = "dinner",
  BDSM = "bdsm",
  ROLEPLAY = "roleplay",
  EVENT = "event"
}

export interface Escort {
  id: string;
  name: string;
  userId?: string;
  user_id?: string; // For backward compatibility
  gender?: string;
  age?: number;
  location?: string;
  bio?: string;
  avatar?: string;
  profileImage?: string;
  coverImage?: string;
  gallery?: string[];
  measurements?: Measurements;
  height?: string | number;
  weight?: string | number;
  hair?: string;
  eyes?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];
  verified?: boolean;
  verificationLevel?: VerificationLevel;
  verification_level?: VerificationLevel;
  rating?: number;
  reviewsCount?: number;
  reviewCount?: number;
  rates?: Rates;
  services?: string[];
  serviceTypes?: string[];
  availability?: string[] | Availability[];
  specialties?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  isFeatured?: boolean;
  featured?: boolean;
  isNewcomer?: boolean;
  isFavorited?: boolean;
  responseRate?: number;
  price?: number;
  physique?: Physique;
  reviews?: any[] | number;
  tags?: string[];
  imageUrl?: string;
  avatar_url?: string;
  sexualOrientation?: string;
  orientation?: string;
  availableNow?: boolean;
  lastActive?: string | Date;
  description?: string;
  images?: string[];
  videos?: Video[] | any[];
  bodyType?: string;
  isAI?: boolean;
  isScraped?: boolean;
  profileType?: string;
  boostLevel?: number;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
  DECLINED = 'declined'
}

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  service?: string;
  serviceType?: string;
  duration: number;
  price: number;
  status: BookingStatus;
  createdAt: Date;
  notes?: string;
  totalPrice?: number;
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
  type?: string;
  url?: string;
  fileUrl?: string;
  file_url?: string;
  uploadedAt?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  profile_id?: string;
  status: VerificationStatus;
  requested_level: VerificationLevel;
  requestedLevel?: VerificationLevel;
  documents: VerificationDocument[];
  createdAt: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  reviewerId?: string;
  reviewer_id?: string;
  reviewerNotes?: string;
  reviewer_notes?: string;
  expiresAt?: string;
  expires_at?: string;
  submittedAt?: string;
  rejectionReason?: string;
  rejection_reason?: string;
  level?: VerificationLevel;
  verificationLevel?: VerificationLevel;
}
