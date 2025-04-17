
export enum VerificationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired",
  IN_REVIEW = "in_review",
  INCOMPLETE = "incomplete"
}

export enum VerificationLevel {
  NONE = "none",
  BASIC = "basic",
  STANDARD = "standard",
  PREMIUM = "premium",
  ELITE = "elite",
  ENHANCED = "enhanced"  // Added missing ENHANCED enum value
}

export interface VerificationDocument {
  id: string;
  type: string;
  url: string;
  uploadedAt: string;
  status: string;
  verification_id: string;
  document_type: string;
  document_url?: string;
  file_url?: string;
  fileUrl?: string;
  created_at?: string;
  uploaded_at?: string; // Added for backward compatibility
}

export interface VerificationRequest {
  id: string;
  userId: string;
  level: VerificationLevel;
  status: VerificationStatus;
  documents: VerificationDocument[];
  createdAt: string;
  updatedAt: string;
  reviewer_id?: string;
  reviewerId?: string;
  reviewer_notes?: string;
  reviewerNotes?: string;
  requested_level?: VerificationLevel;
  requestedLevel?: VerificationLevel;
  expiration_date?: string;
  profile_id?: string;
  profileId?: string;
  
  // Backward compatibility fields
  submittedAt?: string; 
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  verificationLevel?: VerificationLevel;
  rejection_reason?: string;
  rejectionReason?: string;
  reviewedAt?: string;
}

export const DOCUMENT_TYPES = {
  PASSPORT: 'passport',
  ID_CARD: 'id_card',
  DRIVER_LICENSE: 'driver_license',
  RESIDENCE_PERMIT: 'residence_permit'
};

export interface FileWithPreview {
  file: File;
  preview: string;
}

export interface VerificationFormValues {
  documentType: string;
  documentFrontImage: FileWithPreview;
  documentBackImage?: FileWithPreview;
  selfieImage: FileWithPreview;
}

// Document requirements by type
export const DOCUMENT_REQUIREMENTS = {
  [VerificationLevel.BASIC]: ['id_front', 'selfie'],
  [VerificationLevel.STANDARD]: ['id_front', 'id_back', 'selfie', 'proof_of_address'],
  [VerificationLevel.PREMIUM]: ['id_front', 'id_back', 'selfie', 'proof_of_address', 'professional_photo'],
  [VerificationLevel.ELITE]: ['id_front', 'id_back', 'selfie', 'proof_of_address', 'professional_photo', 'background_check'],
  [VerificationLevel.ENHANCED]: ['id_front', 'id_back', 'selfie', 'proof_of_address']
};

// Import zod for schema validation
import { z } from 'zod';

// Define max file size and accepted types
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Zod schema for verification form
const documentFileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File must be less than 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG, PNG and WEBP formats are supported'
    ),
  preview: z.string()
});

export const verificationFormSchema = z.object({
  documentType: z.string(),
  documentFrontImage: documentFileSchema,
  documentBackImage: documentFileSchema.optional(),
  selfieImage: documentFileSchema
});
