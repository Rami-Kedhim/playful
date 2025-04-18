
import { z } from 'zod';

// Verification types
export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced', 
  PREMIUM = 'premium'
}

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  verification_id?: string;
  document_type?: string;
  document_url?: string;
  url?: string;
  file_url?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  user_id?: string;
  status: VerificationStatus;
  verificationLevel?: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt?: string;
  updatedAt?: string;
  rejectionReason?: string;
  
  // Additional fields used in various components
  profile_id?: string;
  requested_level?: VerificationLevel;
  requestedLevel?: VerificationLevel;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewedAt?: string;
  reviewed_by?: string;
  reviewer_id?: string;
  reviewerId?: string;
  reviewer_notes?: string;
  expires_at?: string;
  
  // Compatibility fields
  level?: VerificationLevel;
  rejection_reason?: string;
}

// Add types for verification form
export type DocumentType = 'id_card' | 'passport' | 'drivers_license';
export const ID_CARD: DocumentType = 'id_card';
export const PASSPORT: DocumentType = 'passport';
export const DRIVERS_LICENSE: DocumentType = 'drivers_license';
export const RESIDENCE_PERMIT: string = 'residence_permit';

export const DOCUMENT_TYPES: Record<DocumentType, string> = {
  id_card: 'ID Card',
  passport: 'Passport',
  drivers_license: 'Driver\'s License'
};

// Additional constants required by components
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const DOCUMENT_REQUIREMENTS = {
  id_card: {
    front: true,
    back: true,
    selfie: true
  },
  passport: {
    front: true,
    back: false,
    selfie: true
  },
  drivers_license: {
    front: true,
    back: true,
    selfie: true
  },
  residence_permit: {
    front: true,
    back: true,
    selfie: true
  }
};

// Interface for file with preview
export interface FileWithPreview {
  file: File;
  preview: string;
}

export interface VerificationFormValues {
  documentType: DocumentType;
  documentFile: File;
  selfieFile?: File;
  consentChecked: boolean;
  documentFrontImage?: FileWithPreview;
  documentBackImage?: FileWithPreview;
  selfieImage?: FileWithPreview;
}

// Create a proper zod schema for form validation
export const verificationFormSchema = z.object({
  documentType: z.enum(['id_card', 'passport', 'drivers_license'] as const),
  documentFile: z.any(),
  selfieFile: z.any().optional(),
  consentChecked: z.boolean(),
  documentFrontImage: z.any().optional(),
  documentBackImage: z.any().optional(),
  selfieImage: z.any().optional()
});
