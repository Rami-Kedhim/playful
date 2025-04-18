
// Define the various document types
export type DocumentType = 'id_card' | 'passport' | 'drivers_license';

// Define possible verification statuses
export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

// Define verification levels
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

// Define document structure
export interface VerificationDocument {
  id: string;
  type: DocumentType;
  status: string;
  document_type: DocumentType;
  uploaded_at: Date;
  document_url?: string;
  url?: string;
  file_path?: string;
}

// Define verification request structure
export interface VerificationRequest {
  id: string;
  userId: string;
  profile_id?: string;
  status: VerificationStatus;
  verificationLevel?: VerificationLevel;
  documents?: VerificationDocument[];
  submittedAt?: string;
  updatedAt?: string;
  rejectionReason?: string;
  rejection_reason?: string;
  requested_level?: VerificationLevel;
  reviewer_notes?: string;
  documentIds?: string[];
}

// Form values for verification submission
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

// Helper function to convert string to DocumentType safely
export function toDocumentType(value: string): DocumentType {
  switch (value) {
    case 'id_card':
      return 'id_card';
    case 'passport':
      return 'passport';
    case 'drivers_license':
      return 'drivers_license';
    default:
      return 'id_card'; // Default fallback
  }
}
