
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
  // Additional fields that are referenced in errors
  isAI?: boolean;
  profileType?: 'verified' | 'ai' | 'provisional';
  rates?: Rates;
  availability?: string[];
  reviewCount?: number;
  reviews?: number;
  tags?: string[];
  languages?: string[];
  avatar?: string;
  isScraped?: boolean;
  boostLevel?: number;
  gallery_images?: string[];
  avatarUrl?: string;
  profileImage?: string;
  gallery?: string[];
  availableNow?: boolean;
  measurements?: {
    height?: number;
    weight?: number;
    bust?: number;
    waist?: number;
    hips?: number;
  };
  hourly_rate?: number;
  is_verified?: boolean; // Alias for backward compatibility
  profileUrl?: string;
  verified?: boolean; // Alias for isVerified
  isFavorited?: boolean;
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
}

export interface VerificationDocument {
  id: string;
  requestId: string;
  type: string;
  url: string;
  status: string;
  uploadedAt: string;
}

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface ContentStats {
  photos: string;
  videos: string;
}
