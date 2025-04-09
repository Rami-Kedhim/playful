
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  verificationLevel: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
}

export interface Escort {
  id: string;
  name: string;
  age?: number;
  location?: string;
  verified?: boolean;
  verificationLevel?: VerificationLevel;
  price: number;
  description: string;
  images: string[];
  tags: string[];
  is_verified: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  userId: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  phone_number: string;
  location: string;
  bio: string;
  is_escort: boolean;
  created_at: string;
  updated_at: string;
}
