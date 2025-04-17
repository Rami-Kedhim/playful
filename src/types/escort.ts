
import { VerificationLevel } from './verification';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  DECLINED = 'declined',
  CANCELED = 'canceled',
  COMPLETED = 'completed'
}

export interface Escort {
  id: string;
  name: string;
  location?: string;
  age: string | number;
  gender: string;
  rating?: number;
  price?: number;
  currency?: string;
  profileImage: string;
  images?: string[] | GalleryType;
  bio?: string;
  services?: string[];
  isVerified?: boolean;
  verification_level?: string;
  verificationLevel?: string; // Added for compatibility
  stats?: {
    views: number;
    favorites: number;
    reviews: number;
  };
  // Additional fields to match component usage
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
  reviews?: number; // Changed to number type
  reviewCount?: number; // Alternative reviews count field
  tags?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  serviceTypes?: string[];
  description?: string;
  measurements?: {
    height?: number;
    weight?: string;
    bust?: string;
    waist?: string;
    hips?: string;
  };
  // Additional fields for compatibility with other parts of the app
  imageUrl?: string;
  gallery?: string[] | any;
  verified?: boolean;
  featured?: boolean;
  isAI?: boolean;
  isScraped?: boolean;
  profileType?: 'verified' | 'ai' | 'provisional';
  boostLevel?: number;
  languages?: string[];
  avatar?: string;
  avatar_url?: string;
  ethnicity?: string;
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  weight?: string;
  sexualOrientation?: string;
  availability?: Availability | Availability[];
  rates?: Rates;
  subscriptionPrice?: number;
  contentStats?: ContentStats;
  gallery_images?: string[];
  videos?: string[];
}

export interface EscortReview {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBooking?: boolean;
}

export interface GalleryType {
  imageUrls: string[];
  videoUrls?: string[];
}

export interface EscortFilterOptions {
  availability?: 'online' | 'all';
  verifiedOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minAge?: number;
  maxAge?: number;
  gender?: string[];
  services?: string[];
  location?: string;
  rating?: number;
  priceRange?: [number, number];
  ageRange?: [number, number];
  selectedServices?: string[];
  selectedGenders?: string[];
}

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  userId?: string; // Added for compatibility
  date: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  duration: number; // in hours
  location?: {
    address?: string;
    city?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  price: number;
  currency: string;
  status: BookingStatus | string;
  serviceType: 'in-person' | 'virtual';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string | Date;
  updatedAt?: string;
  totalPrice?: number; // Added for compatibility
}

export interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => Promise<void>;
  isSubmitting: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export interface Availability {
  days?: string[];
  hours?: string[];
  customNotes?: string;
  day?: string; // Added for compatibility
  slots?: {
    start: string;
    end: string;
  }[];
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
  streams?: string | number;
  live?: boolean | string | number;
}

export type ServiceTypeString = 'dinner' | 'events' | 'travel' | 'companionship' | 'overnight' | 'massage' | 'roleplay' | 'in-person' | 'virtual';

export type ServiceType = ServiceTypeString;

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

// Re-export verification types to ensure consistency
export { VerificationLevel, VerificationStatus, VerificationDocument, VerificationRequest } from './verification';
