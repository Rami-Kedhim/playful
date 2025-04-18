
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
  EXPIRED = 'expired'
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
  file_url?: string;
  uploaded_at: Date;
  status: VerificationStatus;
  notes?: string;
  // Aliases for backward compatibility
  url?: string;
  fileUrl?: string;
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
  // For backward compatibility
  user_id?: string;
  profile_id?: string;
  level?: VerificationLevel;
  requested_level?: VerificationLevel;
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
