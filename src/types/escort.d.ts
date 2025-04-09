export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
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

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  submittedAt: string;
  updatedAt?: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
}

export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

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
