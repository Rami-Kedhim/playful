
export interface Escort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  services: string[];
  imageUrl: string;
  gallery: string[];
  rates: {
    hourly: number;
    overnight: number;
    twoHours?: number;
    weekend?: number;
  };
  availableNow: boolean;
  verified: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  languages: string[];
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
  availability: {
    days: string[];
    hours: string;
  };
  featured: boolean;
  price: number;

  // Additional fields needed based on errors
  avatar_url?: string;
  gallery_images?: string[];
  sexualOrientation?: string;
  lastActive?: string | Date;
  responseRate?: number;
  description?: string;
  height?: number;
  weight?: number;
  measurements?: {
    bust: number;
    waist: number;
    hips: number;
  };
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  verificationLevel?: VerificationLevel;
  serviceTypes?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  videos?: Video[];
  subscriptionPrice?: number;
  contentStats?: {
    photos: number;
    videos: number;
    live: boolean;
    streams: number;
  };
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
  expiresAt?: string;
  escortId?: string; // Added to fix errors
}

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'in_review';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;  
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  url?: string; // For backward compatibility
}

export type ServiceType = 
  | 'GFE'
  | 'Massage'
  | 'Dinner Date'
  | 'Overnight'
  | 'Travel Companion'
  | 'BDSM'
  | 'Role Play'
  | 'Fetish'
  | 'Domination'
  | 'Submission'
  | 'Couples'
  | 'French Kissing'
  | 'Lingerie Shows'
  | 'Exotic Dancing';

export interface EscortAvailability {
  days: string[];
  hours: string;
  exceptions?: {
    date: string;
    available: boolean;
    customHours?: string;
  }[];
}
