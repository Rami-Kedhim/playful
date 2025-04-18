
export interface DocumentType {
  value: string;
  label: string;
}

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REVIEW = 'review'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  PREMIUM = 'premium'
}

export interface VerificationFormValues {
  documentType: string;
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

export interface VerificationDocument {
  id: string;
  document_type: string;
  uploaded_at: Date;
  status: VerificationStatus;
  userId?: string;
  type?: string;
  url?: string;
  uploadedAt?: Date;
  file_url?: string;
  fileUrl?: string;
  document_url?: string;
  file_path?: string;
  reviewer_notes?: string;
  verification_request_id?: string;
}

export interface VerificationRequest {
  id: string;
  userId?: string;
  user_id?: string;
  profile_id?: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  created_at: Date;
  updated_at: Date;
  createdAt?: Date;
  reviewedAt?: Date;
  reviewed_at?: Date;
  requested_level?: VerificationLevel;
  level?: VerificationLevel;
  reviewer_notes?: string;
  reviewed_by?: string;
}

export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license'
};

export const DOCUMENT_TYPE_OPTIONS: DocumentType[] = [
  { value: DOCUMENT_TYPES.ID_CARD, label: 'ID Card' },
  { value: DOCUMENT_TYPES.PASSPORT, label: 'Passport' },
  { value: DOCUMENT_TYPES.DRIVERS_LICENSE, label: "Driver's License" }
];
