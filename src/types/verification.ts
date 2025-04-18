

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REVIEWING = 'reviewing',
  EXPIRED = 'expired'
}

// Adding VerificationLevel enum that's missing
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  VERIFIED = 'verified',
  PREMIUM = 'premium'
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  created_at: Date;
  updated_at: Date;
  rejection_reason?: string;
  level?: string;
  verificationLevel?: string;
  requested_level?: string;
}

export interface VerificationDocument {
  id: string;
  type: string;
  document_type: string;
  status: VerificationStatus;
  uploaded_at: Date;
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
