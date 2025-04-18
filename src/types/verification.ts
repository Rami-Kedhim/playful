
// Update verification types file

export enum VerificationLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  VERIFIED = 'VERIFIED',
  ENHANCED = 'ENHANCED',
  PREMIUM = 'PREMIUM'
}

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REVIEW = 'review',
  EXPIRED = 'expired',
  IN_REVIEW = 'review' // Alias for backward compatibility
}

export enum DocumentType {
  ID_CARD = 'ID_CARD',
  PASSPORT = 'PASSPORT',
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
  SELFIE = 'SELFIE',
  OTHER = 'OTHER'
}

export interface VerificationDocument {
  id: string;
  document_type: DocumentType;
  url?: string;
  file_url?: string;
  uploaded_at: Date;
  status: VerificationStatus;
  notes?: string;
  // Aliases for backward compatibility
  fileUrl?: string;
  documentUrl?: string;
  document_url?: string;
  type?: DocumentType;
  uploadedAt?: Date;
  created_at?: Date;
  file_path?: string; // Add missing file_path property
  documentType?: DocumentType; // Add missing documentType property
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  created_at: Date;
  updated_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
  // Additional fields required by components
  submittedAt?: Date;
  verificationLevel?: VerificationLevel;
  rejectionReason?: string;
  reviewer_notes?: string; // Add missing property
  // For backward compatibility
  user_id?: string;
  profile_id?: string;
  level?: VerificationLevel;
  requested_level?: VerificationLevel;
  requestedLevel?: VerificationLevel;
  createdAt?: Date;
  reviewedAt?: Date;
}

export interface VerificationStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
  averageProcessingTime: number;
}

// Add missing type for VerificationFormValues
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

// Add missing interface for submission responses
export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

// Add missing interface for eligibility check
export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
}
