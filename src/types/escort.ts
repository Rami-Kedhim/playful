
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
  // Additional fields referenced in components
  isAI?: boolean;
  profileType?: 'verified' | 'ai' | 'provisional';
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
  lastActive?: Date | string;
  responseRate?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  serviceTypes?: string[];
  description?: string;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  avatar_url?: string;
  verification_level?: string;
  verificationLevel?: string;
  videos?: Array<{ url: string; title?: string; thumbnail?: string } | string>;
}

// Add BookingStatus enum
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  DECLINED = 'declined'
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

export interface ContentStats {
  photos: string;
  videos: string;
  streams?: string;
}
