
import { DatabaseGender, UserRole } from './auth';

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
  IN_REVIEW = 'in_review'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  PLATINUM = 'platinum',
  // Add these for backward compatibility
  ENHANCED = 'enhanced'
}

export interface VerificationDocument {
  id: string;
  type: string;
  file_url: string;
  uploaded_at: string;
  verification_id: string;
  status?: VerificationStatus;
  notes?: string;
  rejected_reason?: string;
}

export interface VerificationRequest {
  id: string;
  profile_id: string;
  user_id?: string;
  requested_level: VerificationLevel;
  status: VerificationStatus;
  documents: VerificationDocument[];
  created_at: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewer_id?: string;
  rejection_reason?: string;
  notes?: string;
  expiry_date?: string;
  verification_code?: string;
}

export interface VerificationTimelineProps {
  verificationRequest: VerificationRequest;
}

export interface VerificationFormData {
  fullName: string;
  dateOfBirth: string;
  gender: DatabaseGender;
  idType: string;
  idNumber: string;
  address: string;
  phone: string;
  requestedLevel: VerificationLevel;
}
