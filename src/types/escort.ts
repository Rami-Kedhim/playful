
export interface Rates {
  hourly: number;
  twoHours?: number;
  overnight?: number;
  weekend?: number;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  DECLINED = 'declined'
}

export interface Escort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  rating: number;
  price: number;
  images: string[];
  services: string[];
  isVerified: boolean;
  featured: boolean;
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
  // Additional fields referenced in components
  isAI?: boolean;
  profileType?: 'verified' | 'ai' | 'provisional' | 'scraped';
  rates?: Rates;
  availability?: string[] | any;
  reviewCount?: number;
  reviews?: number;
  tags?: string[];
  languages?: string[];
  avatar?: string;
  isScraped?: boolean;
  boostLevel?: number;
  gallery_images?: string[];
  avatarUrl?: string;
  avatar_url?: string;
  profileImage?: string;
  gallery?: string[] | { imageUrls: string[] };
  availableNow?: boolean;
  measurements?: {
    height?: number | string;
    weight?: number | string;
    bust?: number | string;
    waist?: number | string;
    hips?: number | string;
  };
  hourly_rate?: number;
  is_verified?: boolean; // Alias for backward compatibility
  profileUrl?: string;
  verified?: boolean; // Alias for isVerified
  isFavorited?: boolean;
  
  // Adding missing properties referenced in components
  imageUrl?: string;
  sexualOrientation?: string;
  orientation?: string; // Alternative to sexualOrientation
  lastActive?: Date | string;
  responseRate?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  serviceTypes?: string[];
  description?: string;
  height?: number | string;
  weight?: number | string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  bodyType?: string;
  verification_level?: string;
  verificationLevel?: string;
  videos?: Array<{ url: string; title?: string; thumbnail?: string } | string>;
  subscriptionPrice?: number;
  contentStats?: ContentStats;
}

// Add Video interface
export interface Video {
  id: string;
  url: string;
  title?: string;
  thumbnail?: string;
  duration?: number;
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Add ContentStats interface
export interface ContentStats {
  photos: string | number;
  videos: string | number;
  streams?: string | number;
  live?: boolean | string | number;
}

// Add Availability interface
export interface Availability {
  day: string;
  slots: {
    start: string;
    end: string;
  }[];
  days?: string[];
  hours?: number[];
  customNotes?: string;
}

// Add Booking interface
export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  service: string;
  status: BookingStatus;
  location?: string;
  price: number;
  deposit?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface EscortSearchParams {
  gender?: string[];
  location?: string;
  services?: string[];
  priceMin?: number;
  priceMax?: number;
  ageMin?: number;
  ageMax?: number;
  rating?: number;
  verified?: boolean;
  page?: number;
  limit?: number;
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  submittedAt: string;
  documents: VerificationDocument[];
  notes?: string;
  rejectionReason?: string;
  reviewerId?: string;
  reviewedAt?: string;
  // Backward compatibility fields
  user_id?: string;
  requested_level?: string;
  created_at?: string;
  reviewed_at?: string;
  level?: string;
}

export interface VerificationDocument {
  id: string;
  requestId: string;
  type: string;
  url: string;
  status: string;
  uploadedAt: string;
  // Backward compatibility fields
  uploaded_at?: string;
  created_at?: string;
  document_type?: string;
  document_url?: string;
  fileUrl?: string;
}

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}
