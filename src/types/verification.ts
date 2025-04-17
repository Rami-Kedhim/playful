
import { DatabaseGender, UserRole } from './auth';

export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  CANCELED = 'canceled'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  PLATINUM = 'platinum',
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
  document_type?: string;
  document_url?: string;
  created_at?: string;
  // For backward compatibility
  fileUrl?: string;
  uploadedAt?: string;
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
  reviewer_notes?: string;
  notes?: string;
  expiry_date?: string;
  verification_code?: string;
  // For backward compatibility
  userId?: string;
  submittedAt?: string;
  updatedAt?: string;
  verificationLevel?: VerificationLevel;
  rejectionReason?: string;
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

export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license',
  RESIDENCE_PERMIT: 'residence_permit'
};

export interface VerificationFormValues {
  documentType: string;
  documentFrontImage: { file?: File; preview: string };
  documentBackImage?: { file?: File; preview: string };
  selfieImage: { file?: File; preview: string };
}

// Define verification form schema placeholder
export const verificationFormSchema = {} as any; // This is a placeholder, we'll implement the real schema later
