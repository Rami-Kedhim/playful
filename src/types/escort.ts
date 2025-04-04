
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';
export type ServiceType = 'in-person' | 'virtual' | 'both';

export interface VerificationRequest {
  id: string;
  userId: string;
  escortId: string;
  status: VerificationStatus;
  documents: string[];
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  bio?: string;
  avatar_url?: string;
  gallery_images?: string[];
  services?: string[];
  rating: number;
  reviews: number;
  price?: number;
  verified?: boolean;
  verificationLevel?: VerificationLevel;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  gender?: string;
  sexualOrientation?: string;
  availability?: Record<string, string[]>;
  serviceTypes?: ServiceType[];
  featured?: boolean;
  tags?: string[];
  isLive?: boolean;
}
