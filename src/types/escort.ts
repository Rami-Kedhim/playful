
import { VerificationLevel } from './verification';

export interface Escort {
  id: string;
  name: string;
  location?: string;
  age: string | number; // Can be either string or number based on usage
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
  stats?: {
    views: number;
    favorites: number;
    reviews: number;
  };
  // Additional fields to match component usage
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
  reviews?: EscortReview[];
  tags?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  serviceTypes?: string[];
  description?: string;
  measurements?: {
    height: number;
    weight: string;
    bust: string;
    waist: string;
    hips: string;
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
  reviewCount?: number;
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
  date: Date;
  startTime: string;
  endTime: string;
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
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  serviceType: 'in-person' | 'virtual';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
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
  streams?: string;
  live?: boolean;
}

export type ServiceTypeString = 'dinner' | 'events' | 'travel' | 'companionship' | 'overnight' | 'massage' | 'roleplay' | 'in-person' | 'virtual';
