
export interface Escort {
  id: string;
  userId?: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  age?: number;
  gender?: string;
  imageUrls?: string[];
  mainImageUrl?: string;
  services?: string[];
  rates?: Record<string, number>;
  availability?: {
    weekday?: string[];
    weekend?: string[];
    customDays?: Record<string, string[]>;
    days?: string[];
    hours?: string[];
  };
  isVerified?: boolean;
  isOnline?: boolean;
  rating?: number;
  reviewCount?: number;
  languages?: string[];
  height?: number;
  weight?: number;
  bodyType?: string;
  ethnicity?: string;
  hairColor?: string;
  eyeColor?: string;
  
  // Additional properties used in components
  profileType?: string;
  orientation?: string;
  reviews?: number | any[];
  tags?: string[];
  imageUrl?: string;
  profileImage?: string;
  avatar?: string;
  avatarUrl?: string;
  avatar_url?: string;
  verified?: boolean;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: Date | string;
  responseRate?: number;
  gallery?: string[];
  gallery_images?: string[];
  images?: string[];
  videos?: any[];
  verificationLevel?: string;
  verification_level?: string;
  featured?: boolean;
  price?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  serviceTypes?: string[];
  boostLevel?: number;
  contactInfo?: {
    email: string;
    phone: string;
    website?: string;
  };
  isFavorited?: boolean;
  isPremium?: boolean;
  isAI?: boolean;
  description?: string;
  measurements?: string;
  subscriptionPrice?: number;
  contentStats?: {
    photos: number;
    videos: number;
    stories: number;
  };
}

// Export Availability interface since it's used in useEscortAvailability.ts
export interface Availability {
  weekday?: string[];
  weekend?: string[];
  customDays?: Record<string, string[]>;
  // Additional properties for backward compatibility
  days?: string[];
  hours?: string[];
  customNotes?: string;
}

// Export Video interface for useVideoManagement.ts
export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  createdAt: Date | string;
  isPublished: boolean;
  escortId: string;
  viewCount?: number;
  isPremium?: boolean;
}

// Add Booking and BookingStatus for Booking-related components
export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string;
  time: string;
  duration: number;
  service?: string;
  serviceType?: string;
  price?: number;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
  totalPrice: number;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  DECLINED = 'declined',
  CANCELED = 'canceled',
  COMPLETED = 'completed'
}

// Add VerificationDocument and VerificationRequest for verification components
export interface VerificationDocument {
  id: string;
  userId: string;
  type: string;
  url: string;
  uploadedAt: Date;
  status: string;
  document_type?: string; // For backward compatibility
  file_url?: string; // For backward compatibility
  fileUrl?: string; // For backward compatibility
  document_url?: string; // For backward compatibility
  file_path?: string; // For backward compatibility
  uploaded_at?: Date; // For backward compatibility
  created_at?: Date; // For backward compatibility
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  documentIds: string[];
  reviewedBy?: string;
  reviewedAt?: Date;
  rejectionReason?: string;
  verificationLevel?: string;
  documents?: VerificationDocument[]; // For backward compatibility
  user_id?: string; // For backward compatibility
  profile_id?: string; // For backward compatibility
  created_at?: Date; // For backward compatibility
  updated_at?: Date; // For backward compatibility
  reviewed_at?: Date; // For backward compatibility
  submittedAt?: Date; // For backward compatibility
  submitted_at?: Date; // For backward compatibility
  rejected_reason?: string; // For backward compatibility
  requested_level?: string; // For backward compatibility
  level?: string; // For backward compatibility
  rejection_reason?: string;
  reviewer_notes?: string;
  requested_level?: string;
}

// Enum for verification status
export enum VerificationStatus {
  PENDING = 'pending',
  REVIEW = 'review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  IN_REVIEW = 'review', // Alias for REVIEW
  ENHANCED = 'enhanced'
}

// Enum for verification level
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  VERIFIED = 'verified',
  PREMIUM = 'premium',
  ENHANCED = 'enhanced'
}

export type DocumentType = string;
