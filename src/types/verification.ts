
import { z } from "zod";

export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';

export interface VerificationDocument {
  id: string;
  verification_id: string;
  document_type: string;
  document_url: string;
  status: VerificationStatus;
  notes?: string;
  created_at: string;
  updated_at?: string;
  
  // Adding these for backwards compatibility
  type?: string;
  fileUrl?: string;
  uploadedAt?: string;
}

export interface VerificationRequest {
  id: string;
  profile_id: string;
  status: VerificationStatus;
  requested_level: VerificationLevel;
  documents: VerificationDocument[];
  created_at: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
  
  // Adding these for backwards compatibility
  submittedAt?: string;
  updatedAt?: string;
  verificationLevel?: VerificationLevel;
  rejectionReason?: string;
  userId?: string;
}

// Schema for verification form data
export interface VerificationFormValues {
  documentType: string;
  documentFrontImage: { file: File; preview: string };
  documentBackImage?: { file: File; preview: string } | undefined;
  selfieImage: { file: File; preview: string };
}

// Verification form validation schema
export const verificationFormSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  documentFrontImage: z.object({
    file: z.instanceof(File, { message: "Front image is required" }),
    preview: z.string()
  }),
  documentBackImage: z.object({
    file: z.instanceof(File, { message: "Back image is required" }),
    preview: z.string()
  }).optional(),
  selfieImage: z.object({
    file: z.instanceof(File, { message: "Selfie image is required" }),
    preview: z.string()
  })
});

export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'driving_license'
};

export const DOCUMENT_TYPE_LABELS = {
  [DOCUMENT_TYPES.ID_CARD]: 'ID Card',
  [DOCUMENT_TYPES.PASSPORT]: 'Passport',
  [DOCUMENT_TYPES.DRIVERS_LICENSE]: 'Driver\'s License'
};

export const DOCUMENT_TYPE_REQUIREMENTS = {
  [DOCUMENT_TYPES.ID_CARD]: {
    frontRequired: true,
    backRequired: true,
    selfieRequired: true
  },
  [DOCUMENT_TYPES.PASSPORT]: {
    frontRequired: true,
    backRequired: false,
    selfieRequired: true
  },
  [DOCUMENT_TYPES.DRIVERS_LICENSE]: {
    frontRequired: true,
    backRequired: true,
    selfieRequired: true
  }
};

// Additional types for verification API responses
export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
  cooldownRemaining?: number; // in hours
}

export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  requestId?: string;
}
