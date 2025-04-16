
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';
export type DocumentType = 'passport' | 'id_card' | 'driver_license' | 'drivers_license';

export const DOCUMENT_TYPES = {
  PASSPORT: 'passport',
  ID_CARD: 'id_card',
  DRIVERS_LICENSE: 'drivers_license'
} as const;

export const DOCUMENT_TYPE_LABELS = {
  [DOCUMENT_TYPES.PASSPORT]: 'Passport',
  [DOCUMENT_TYPES.ID_CARD]: 'ID Card',
  [DOCUMENT_TYPES.DRIVERS_LICENSE]: 'Driver\'s License'
};

export const DOCUMENT_TYPE_REQUIREMENTS = {
  [DOCUMENT_TYPES.PASSPORT]: {
    requiresBackImage: false,
    description: 'Upload a clear photo of your passport information page'
  },
  [DOCUMENT_TYPES.ID_CARD]: {
    requiresBackImage: true,
    description: 'Upload clear photos of the front and back of your ID card'
  },
  [DOCUMENT_TYPES.DRIVERS_LICENSE]: {
    requiresBackImage: true,
    description: 'Upload clear photos of the front and back of your driver\'s license'
  }
};

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VerificationRequest {
  id: string;
  profile_id: string;
  status: VerificationStatus;
  requested_level: VerificationLevel;
  documents?: VerificationDocument[];
  created_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
}

export interface VerificationFormValues {
  documentType: DocumentType;
  documentFrontImage: {
    file?: File;
    preview: string;
  };
  documentBackImage?: {
    file?: File;
    preview: string;
  };
  selfieImage: {
    file?: File;
    preview: string;
  };
}

import { z } from 'zod';

// Constants for file validation
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Zod schema for verification form
const documentFileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File must be less than 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG, PNG and WEBP formats are supported'
    ),
  preview: z.string().min(1, 'Preview is required')
});

export const verificationFormSchema = z.object({
  documentType: z.enum([
    DOCUMENT_TYPES.PASSPORT, 
    DOCUMENT_TYPES.ID_CARD, 
    DOCUMENT_TYPES.DRIVERS_LICENSE
  ]),
  documentFrontImage: documentFileSchema,
  documentBackImage: documentFileSchema.optional(),
  selfieImage: documentFileSchema
});

// Responses from verification utility functions
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

export interface VerificationChecks {
  hasPhoneVerification?: boolean;
  hasEmailVerification?: boolean;
  hasPaymentVerification?: boolean;
  hasCommunityReviews?: boolean;
}

export interface VerificationStatusResponse {
  status: VerificationStatus;
  lastRequest?: VerificationRequest;
}
