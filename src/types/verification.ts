
export interface VerificationDocument {
  id: string;
  userId: string;
  type: string;
  url: string;
  uploadedAt: Date;
  status: string;
  metadata?: Record<string, any>;
  
  // For backward compatibility with existing code
  document_type?: string;
  uploaded_at?: Date;
  file_url?: string;
  fileUrl?: string;
  document_url?: string;
  file_path?: string;
  documentType?: string;
  created_at?: Date;
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
  
  // For backward compatibility with existing code
  submittedAt?: Date;
  verificationLevel?: string;
  documents?: VerificationDocument[];
  rejectionReason?: string;
  user_id?: string;
  profile_id?: string;
  requestedLevel?: string;
  createdAt?: Date;
  reviewedAt?: Date;
  level?: string;
}

export enum VerificationStatus {
  PENDING = 'pending',
  REVIEW = 'review',
  IN_REVIEW = 'review', // Alias for backward compatibility
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
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

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}
