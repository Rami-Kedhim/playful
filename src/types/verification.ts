
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
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  verificationLevel: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
  
  // Additional fields used in various components
  profile_id?: string;
  requested_level?: VerificationLevel;
  created_at?: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewedAt?: string;
  reviewed_by?: string;
  reviewerId?: string;
  reviewer_notes?: string;
  expires_at?: string;
  
  // Compatibility fields
  level?: VerificationLevel;
  requestedLevel?: VerificationLevel;
  rejection_reason?: string;
}

// Add types for verification form
export type DocumentType = 'id_card' | 'passport' | 'drivers_license';
export const ID_CARD: DocumentType = 'id_card';
export const PASSPORT: DocumentType = 'passport';
export const DRIVERS_LICENSE: DocumentType = 'drivers_license';

export const DOCUMENT_TYPES: Record<DocumentType, string> = {
  id_card: 'ID Card',
  passport: 'Passport',
  drivers_license: 'Driver\'s License'
};

export interface VerificationFormValues {
  documentType: DocumentType;
  documentFile: File;
  selfieFile?: File;
  consentChecked: boolean;
  documentFrontImage?: { file: File, preview: string };
  documentBackImage?: { file: File, preview: string };
  selfieImage?: { file: File, preview: string };
}

// Using zod schema for form validation
// This is a placeholder - actual zod schema would be imported from a validation file
export const verificationFormSchema = {
  parse: (values: any) => values,
  shape: {
    documentType: {},
    documentFile: {},
    selfieFile: {},
    consentChecked: {}
  }
};
