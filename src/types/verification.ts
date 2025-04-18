
export enum VerificationStatus {
  PENDING = 'pending',
  REVIEW = 'review',
  IN_REVIEW = 'in_review', // Alias for REVIEW
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
  VERIFIED = 'verified'
}

export type DocumentType = 'id_card' | 'passport' | 'drivers_license' | 'selfie' | string;

export interface VerificationDocument {
  id: string;
  type: string;
  document_type?: string;
  documentType?: string;
  fileUrl?: string;
  file_url?: string;
  document_url?: string;
  url?: string;
  file_path?: string;
  status?: string;
  uploadedAt?: string | Date;
  uploaded_at?: string | Date;
  created_at?: string | Date;
}

export interface VerificationRequest {
  id: string;
  userId?: string;
  user_id?: string;
  profile_id?: string;
  status: VerificationStatus | string;
  verificationLevel?: VerificationLevel | string;
  requested_level?: VerificationLevel | string;
  requestedLevel?: VerificationLevel | string;
  level?: VerificationLevel | string;
  documents?: VerificationDocument[];
  submittedAt?: string | Date;
  submitted_at?: string | Date;
  createdAt?: string | Date;
  created_at?: string | Date;
  updatedAt?: string | Date;
  updated_at?: string | Date;
  rejectionReason?: string;
  rejected_reason?: string;
  reviewer_notes?: string;
  reviewedBy?: string;
  reviewed_by?: string;
  reviewedAt?: string | Date;
  reviewed_at?: string | Date;
  expires_at?: string | Date;
}

export interface VerificationFormValues {
  documentType: DocumentType;
  documentFile: File;
  selfieFile?: File | null;
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

// Add document type options constant
export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'id_card', label: 'ID Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: 'Driver\'s License' }
];
