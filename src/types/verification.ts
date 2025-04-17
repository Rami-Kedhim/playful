
import { z } from 'zod';

// Document types enumeration for verification
export const DOCUMENT_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: 'Driver\'s License' },
  { value: 'national_id', label: 'National ID Card' },
  { value: 'residence_permit', label: 'Residence Permit' },
  { value: 'utility_bill', label: 'Utility Bill' },
  { value: 'bank_statement', label: 'Bank Statement' },
  { value: 'selfie', label: 'Selfie with ID' },
];

// Common ID document type
export const ID_CARD = 'national_id';

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
  verification_id: string;
  document_type: string;
  document_url: string;
  status: VerificationStatus;
  notes?: string;
  created_at: string;
  updated_at?: string;
  type?: string;
  url?: string;
  fileUrl?: string;
  uploadedAt?: string;
}

export interface VerificationRequest {
  id: string;
  profile_id: string;
  userId: string;
  status: VerificationStatus;
  requested_level: VerificationLevel;
  documents: VerificationDocument[];
  createdAt: string;
  updatedAt?: string;
  reviewerId?: string;
  reviewerNotes?: string;
  expiresAt?: string;
  
  // For backward compatibility with escort.ts
  submittedAt?: string;
  created_at?: string;
  updated_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
  verificationLevel?: VerificationLevel;
  rejection_reason?: string;
  rejectionReason?: string;
  level?: VerificationLevel;
  user_id?: string;
  reviewedAt?: string;
}
