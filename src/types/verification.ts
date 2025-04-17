
// Define the verification related types used across the application

// VerificationLevel enum for use across the application
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced', 
  PREMIUM = 'premium'
}

export enum VerificationStatus {
  NOT_STARTED = 'not_started',
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface VerificationDocument {
  id: string;
  type: string;
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  reviewedAt?: string;
  
  // For backward compatibility with older code
  verification_id?: string;
  document_type?: string;
  document_url?: string;
  file_url?: string;
  fileUrl?: string;
  created_at?: string;
  uploaded_at?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus | string;
  level: VerificationLevel | string;
  submittedAt: string;
  reviewedAt?: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
  expiresAt?: string;
  
  // For backward compatibility with older code
  verificationLevel?: VerificationLevel | string;
  requested_level?: VerificationLevel | string;
  user_id?: string;
  profile_id?: string;
  created_at?: string;
  updated_at?: string;
  reviewer_notes?: string;
  rejection_reason?: string;
  reviewed_at?: string;
}

export interface VerificationFormValues {
  documentType: string;
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

export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVING_LICENSE: 'driving_license',
  RESIDENCE_PERMIT: 'residence_permit'
};

// Document requirements for different document types
export const DOCUMENT_REQUIREMENTS: Record<string, {
  frontRequired: boolean;
  backRequired: boolean;
  selfieRequired: boolean;
}> = {
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
  [DOCUMENT_TYPES.DRIVING_LICENSE]: {
    frontRequired: true,
    backRequired: true,
    selfieRequired: true
  },
  [DOCUMENT_TYPES.RESIDENCE_PERMIT]: {
    frontRequired: true,
    backRequired: true,
    selfieRequired: true
  }
};

// Add verification form schema for form validation
import { z } from 'zod';

// File validation helpers
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const fileSchema = z.instanceof(File)
  .refine(file => file.size <= MAX_FILE_SIZE, 'File must be less than 5MB')
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only JPG, JPEG, and PNG formats are supported'
  );

export const verificationFormSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  documentFrontImage: z.object({
    file: fileSchema.optional(),
    preview: z.string().min(1, "Front image is required")
  }),
  documentBackImage: z.object({
    file: fileSchema.optional(),
    preview: z.string()
  }).optional(),
  selfieImage: z.object({
    file: fileSchema.optional(),
    preview: z.string().min(1, "Selfie image is required")
  }),
});
