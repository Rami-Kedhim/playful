
// Types for verification functionality

export interface VerificationDocument {
  id: string;
  document_type: string;
  url?: string;
  fileUrl?: string;
  file_url?: string;
  file_path?: string;
  document_url?: string;
  uploaded_at: Date | string;
  uploadedAt?: Date | string;
  status: string;
  user_id?: string;
  verification_request_id?: string;
  reviewed_by?: string;
  reviewed_at?: Date | string;
  reviewer_notes?: string;
  type?: string;
  created_at?: Date | string;
  documentType?: string;
}

export interface VerificationRequest {
  id: string;
  user_id?: string;
  userId?: string;
  profile_id?: string; // For backwards compatibility
  status: string;
  created_at?: Date | string;
  createdAt?: Date | string;
  updated_at?: Date | string;
  updatedAt?: Date | string;
  reviewed_at?: Date | string;
  reviewedAt?: Date | string;
  submitted_at?: Date | string;
  submittedAt?: Date | string;
  reviewer_notes?: string;
  rejection_reason?: string;
  rejectionReason?: string; // For backwards compatibility
  requested_level?: string;
  requestedLevel?: string; // For backwards compatibility
  level?: string; // For backwards compatibility
  verificationLevel?: string; // Another alias used in some components
  documents?: VerificationDocument[];
  documentIds?: string[]; // For backward compatibility
}

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
  PREMIUM = 'premium',
  STANDARD = 'standard'
}

// Add DocumentType type for VerificationForm
export type DocumentType = string;

// Add VerificationFormValues type for form components
export interface VerificationFormValues {
  documentType: string;
  documentFile: File;
  selfieFile?: File;
  consentChecked: boolean;
  documentFrontImage?: {
    file: File;
    preview: string;
  };
  documentBackImage?: {
    file: File;
    preview: string;
  };
  selfieImage?: {
    file: File;
    preview: string;
  };
}

// Add toDocumentType function for hooks
export const toDocumentType = (type: string): DocumentType => type as DocumentType;
