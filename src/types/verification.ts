
export interface VerificationDocument {
  id: string;
  userId: string;
  type: string;
  url: string; // Added missing url property
  uploadedAt: Date; // Use camelCase
  status: string;
  metadata?: Record<string, any>;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: string;
  documentIds: string[];
  created_at: Date;
  updated_at?: Date;
  reviewed_at?: Date;
  reviewer_id?: string;
  reviewer_notes?: string;
  requested_level?: string;
}

export enum VerificationStatus {
  PENDING = 'pending',
  REVIEW = 'review', // NOT IN_REVIEW (corrected)
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface DocumentType {
  value: string;
  label: string;
  description?: string;
  requiresBackside?: boolean;
  requiresSelfie?: boolean;
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
