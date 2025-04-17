
import { z } from 'zod';

// Verification status as an enum with values
export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

// Verification level enum
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
  PERSONAL = 'personal',
  BUSINESS = 'business'
}

// Document type constants
export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVING_LICENSE: 'driving_license',
  DRIVERS_LICENSE: 'drivers_license', // Alias for DRIVING_LICENSE
  RESIDENCE_PERMIT: 'residence_permit'
};

// Interfaces for verification entities
export interface VerificationDocument {
  id: string;
  verification_id: string;
  type: string;
  document_type?: string;
  document_url?: string;
  fileUrl?: string;
  url?: string;
  status?: VerificationStatus;
  created_at?: string;
  uploadedAt?: string;
  file_url?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  user_id?: string;
  profile_id?: string;
  status: VerificationStatus;
  level: VerificationLevel;
  verificationLevel?: VerificationLevel;
  requested_level?: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt?: string;
  reviewedAt?: string;
  created_at?: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewer_id?: string;
  reviewer_notes?: string;
  rejectionReason?: string;
  rejection_reason?: string;
}

// File validation constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Schema for file validation
const fileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File must be less than 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG, PNG and WEBP formats are supported'
    ),
  preview: z.string()
});

// Schema for verification form
export const verificationFormSchema = z.object({
  documentType: z.string(),
  documentFrontImage: fileSchema,
  documentBackImage: fileSchema.optional(),
  selfieImage: fileSchema
});

// Type for verification form values
export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

// Additional types for verification
export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
  cooldownRemaining?: number;
}

export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

export interface VerificationStatusResponse {
  status: VerificationStatus;
  lastRequest?: VerificationRequest;
}

// Explicitly export the VerificationStatus values for use in components
export const VerificationStatuses = {
  PENDING: VerificationStatus.PENDING,
  IN_REVIEW: VerificationStatus.IN_REVIEW,
  APPROVED: VerificationStatus.APPROVED,
  REJECTED: VerificationStatus.REJECTED,
  EXPIRED: VerificationStatus.EXPIRED
};
