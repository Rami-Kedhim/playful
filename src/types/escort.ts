
import { VerificationLevel } from './verification';

export interface Escort {
  id: string;
  name: string;
  location?: string;
  age: string; // Changed to string to match usage in components
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
  // Added fields to match component usage
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
  onConfirm: () => Promise<void>; // Added missing prop
  onCancel: () => void; // Added missing prop
}
