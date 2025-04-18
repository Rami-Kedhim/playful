
// Define the Escort type
export interface Escort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  reviews?: number;
  services: string[];
  images: string[];
  imageUrl?: string;
  profileImage?: string;
  gallery?: string[];
  gallery_images?: string[];
  isVerified: boolean;
  verified?: boolean;
  featured?: boolean;
  contactInfo: ContactInfo;
  availability?: Availability;
  rates?: Rates;
  tags?: string[];
  languages?: string[];
  isOnline?: boolean;
  availableNow?: boolean;
  hasRealMeets?: boolean;
  lastActive?: string;
  isScraped?: boolean;
  isAI?: boolean;
  verificationLevel?: VerificationLevel;
  verification_level?: string;
  hasContent?: boolean;
  hasLiveStream?: boolean;
  profileType?: 'verified' | 'ai' | 'provisional';
  orientation?: string;
  bodyType?: string;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  boostLevel?: number;
  subscriptionPrice?: number;
  contentStats?: ContentStats;
  avatar?: string;
  avatarUrl?: string;
  avatar_url?: string;
  sexualOrientation?: string;
  responseRate?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  serviceTypes?: string[];
  description?: string;
  videos?: any[];
  isFavorited?: boolean;
  measurements?: {
    bust?: number;
    waist?: number;
    hips?: number;
  };
}

export interface ContactInfo {
  phone?: string;
  email: string;
  website?: string;
}

export interface Availability {
  days: string[];
  hours: string[];
  nextAvailable?: string;
  day?: string;
  slots?: { start: string; end: string; }[];
  customNotes?: string;
}

export interface Rates {
  hourly?: number;
  twoHours?: number;
  dinner?: number;
  overnight?: number;
  weekend?: number;
}

export interface ContentStats {
  photos: number;
  videos: number;
  totalViews: number;
  averageRating: number;
  streams?: string | number;
  live?: boolean | string | number;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  url?: string;
  duration: number;
  viewCount: number;
  rating?: number;
  createdAt: string;
  isPremium?: boolean;
  price?: number;
}

export interface Booking {
  id: string;
  escortId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  serviceType?: string;
  service?: string;
  location?: string;
  price: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  duration?: number;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  REJECTED = 'rejected',
  DECLINED = 'declined'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  PLATINUM = 'platinum'
}

export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface VerificationRequest {
  id: string;
  status: string;
  submittedAt?: string;
  created_at?: string;
  documents?: VerificationDocument[];
  verificationLevel?: string;
  requested_level?: string;
  requestedLevel?: string;
  rejectionReason?: string;
  reviewer_notes?: string;
  reviewedAt?: string;
  userId?: string;
  user_id?: string;
  profile_id?: string;
  createdAt?: string;
  level?: string;
  updated_at?: string;
  verification_id?: string;
  request_id?: string;
  request?: string;
}

export interface VerificationDocument {
  id: string;
  documentType?: string;
  document_type?: string;
  fileUrl?: string;
  file_url?: string;
  type?: string;
  url?: string;
  document_url?: string;
  status?: string;
  uploaded_at?: string;
  uploadedAt?: string;
  created_at?: string;
  verification_id?: string;
  requestId?: string;
  request_id?: string;
}

// Add service type definitions
export enum ServiceType {
  Massage = 'massage',
  Roleplay = 'roleplay',
  Overnight = 'overnight',
  BDSM = 'bdsm',
  Companionship = 'companionship',
  Dinner = 'dinner',
  Events = 'events',
  Travel = 'travel'
}

export type ServiceTypeString = ServiceType | string;
