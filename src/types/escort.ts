
export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
export type ServiceType = 'in-person' | 'virtual' | 'both';
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface Escort {
  id: string;
  name: string;
  avatar_url?: string;
  location: string;
  price?: number;
  rates?: {
    hourly?: number;
    [key: string]: number | undefined;
  };
  description?: string;
  bio?: string;
  tags?: string[];
  gallery?: string[];
  gallery_images?: string[]; 
  services?: string[];
  serviceTypes?: ServiceType[];
  availability?: any;
  reviews?: number;
  reviewCount?: number;
  rating?: number;
  is_verified?: boolean;
  verified?: boolean;
  is_featured?: boolean;
  featured?: boolean;
  
  // Physical attributes and demographics
  age?: number;
  gender?: string;
  sexualOrientation?: string;
  height?: number | string;
  weight?: number | string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  measurements?: {
    bust?: number | string;
    waist?: number | string;
    hips?: number | string;
  } | string;
  
  // Status and activity
  availableNow?: boolean;
  lastActive?: Date | string;
  responseRate?: number;
  responseTime?: string;
  
  // Media and content
  imageUrl?: string;
  profileImage?: string;
  videos?: (string | {
    id: string;
    url: string;
    thumbnail: string;
    title: string;
  })[];
  
  // Verification and trust signals
  verificationLevel?: VerificationLevel;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  languages?: string[];

  // Additional fields
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  contentStats?: {
    totalMedia?: number;
    photos?: number;
    videos?: number;
  };
  subscriptionPrice?: number;
  isAI?: boolean;
  profileType?: string;
  boostLevel?: number;
}

export interface Booking {
  id: string;
  escort_id: string;
  client_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  price: number;
  location?: any;
  notes?: string;
  booking_type?: string;
  service_type?: string;
  created_at: string;
  updated_at: string;
  special_requests?: string;
  action_url?: string;
  action_text?: string;
}

export interface EscortFilterOptions {
  location?: string;
  priceRange?: [number, number];
  age?: [number, number];
  gender?: string[];
  services?: string[];
  availability?: string[];
  verificationLevel?: VerificationLevel[];
  serviceType?: ServiceType[];
  sortBy?: 'price' | 'rating' | 'distance' | 'newest';
  page?: number;
  limit?: number;
  selectedServices?: string[];
  selectedGenders?: string[];
  selectedOrientations?: string[];
  ageRange?: [number, number];
  ratingMin?: number;
  availableNow?: boolean;
  verifiedOnly?: boolean;
  languages?: string[];
}

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VerificationRequest {
  id: string;
  profile_id?: string;
  userId?: string;
  status: VerificationStatus;
  verificationLevel?: VerificationLevel;
  requested_level: VerificationLevel;
  documents?: VerificationDocument[];
  created_at: string;
  submittedAt?: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
  rejectionReason?: string;
}
