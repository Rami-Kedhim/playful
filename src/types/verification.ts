
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  VIP = 'vip'
}

export type DocumentType = 'id_card' | 'passport' | 'drivers_license';

export interface VerificationDocument {
  id: string;
  user_id: string;
  userId?: string;
  document_type: DocumentType;
  documentType?: DocumentType;
  file_url: string;
  fileUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded_at: Date;
  uploadedAt?: Date;
  created_at?: Date;
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

export interface VerificationRequest {
  id: string;
  userId: string;
  user_id?: string;
  status: 'pending' | 'approved' | 'rejected';
  documentType: DocumentType;
  created_at: Date;
  createdAt?: Date;
  updated_at: Date;
  updatedAt?: Date;
  level: VerificationLevel;
  requested_level: VerificationLevel;
  requestedLevel?: VerificationLevel;
  rejection_reason: string | null;
  rejectionReason?: string | null;
  reviewer_notes: string | null;
  reviewerNotes?: string | null;
  reviewedAt?: Date | null;
  reviewed_at?: Date | null;
}
