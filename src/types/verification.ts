
export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REVIEWING = 'reviewing',
  EXPIRED = 'expired',
  IN_REVIEW = 'in_review' // Added for compatibility
}

// Adding VerificationLevel enum that's missing
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  VERIFIED = 'verified',
  PREMIUM = 'premium',
  ENHANCED = 'enhanced' // Added for compatibility
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  created_at: Date;
  updated_at: Date;
  rejection_reason?: string;
  rejectionReason?: string; // Alias for compatibility
  reviewer_notes?: string; // Added for compatibility
  level?: string;
  verificationLevel?: string;
  requested_level?: string;
  profile_id?: string;
  submittedAt?: string | Date; // Added for compatibility
  requestedLevel?: VerificationLevel; // Added for compatibility
  reviewedAt?: Date; // Added for administrative panels
  user_id?: string; // Alias for compatibility
  createdAt?: Date; // Alias for created_at
}

export interface VerificationDocument {
  id: string;
  type: string;
  document_type: string;
  documentType?: string; // Alias for compatibility
  status: VerificationStatus;
  uploaded_at: Date;
  uploadedAt?: Date; // Alias for compatibility
  created_at?: Date; // For compatibility
  reviewer_notes?: string;
  file_path?: string;
  file_url?: string;
  url?: string;
  fileUrl?: string;
  document_url?: string;
}

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

export type DocumentType = 'id_card' | 'passport' | 'drivers_license';

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'id_card', label: 'ID Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: 'Driver\'s License' }
];
