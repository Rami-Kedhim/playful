
import { z } from 'zod';

// Add constants for document types
export const ID_CARD = 'national_id';
export const PASSPORT = 'passport';
export const DRIVER_LICENSE = 'drivers_license';
export const RESIDENCE_PERMIT = 'residence_permit';

// Document types enumeration for verification
export const DOCUMENT_TYPES = [
  { value: PASSPORT, label: 'Passport' },
  { value: DRIVER_LICENSE, label: 'Driver\'s License' },
  { value: ID_CARD, label: 'National ID Card' },
  { value: RESIDENCE_PERMIT, label: 'Residence Permit' },
  { value: 'utility_bill', label: 'Utility Bill' },
  { value: 'bank_statement', label: 'Bank Statement' },
  { value: 'selfie', label: 'Selfie with ID' },
];

// File validation constants
export const MAX_FILE_SIZE = 5000000; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const DOCUMENT_REQUIREMENTS = {
  [PASSPORT]: { backRequired: false },
  [DRIVER_LICENSE]: { backRequired: true },
  [ID_CARD]: { backRequired: true },
  [RESIDENCE_PERMIT]: { backRequired: true },
};

// Verification form schema
export const verificationFormSchema = z.object({
  documentType: z.string().min(1, { message: 'Document type is required' }),
  documentFile: z.any().refine(file => file instanceof File, {
    message: 'Document file is required',
  }),
  selfieFile: z.any().optional(),
  consentChecked: z.boolean().refine(val => val === true, {
    message: 'You must consent to the verification process',
  }),
  documentFrontImage: z.any().optional(),
  documentBackImage: z.any().optional(),
  selfieImage: z.any().optional(),
});

// Form values type for verification
export type VerificationFormValues = {
  documentType: string;
  documentFile: File;
  selfieFile?: File;
  consentChecked: boolean;
  documentFrontImage?: { file: File; preview: string };
  documentBackImage?: { file?: File; preview: string };
  selfieImage?: { file: File; preview: string };
};

// Verification levels
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

// Verification status
export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface VerificationDocument {
  id: string;
  documentType?: string;
  fileUrl?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  document_type?: string;
  file_path?: string;
  uploaded_at?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  user_id?: string; // Legacy property for compatibility
  profile_id?: string; // Legacy property for compatibility
  status: VerificationStatus;
  level?: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  reviewedAt?: string;
  reviewerId?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  rejectionReason?: string;
  verificationLevel?: VerificationLevel;
  requested_level?: VerificationLevel;
  requestedLevel?: VerificationLevel;
  expires_at?: string;
}

export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
}

export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  requestId?: string;
}
