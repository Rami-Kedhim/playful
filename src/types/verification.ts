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

export const ID_CARD = 'id_card';
export type DocumentType = 'id_card' | 'passport' | 'drivers_license';

export interface VerificationDocument {
  id: string;
  documentType?: string;
  document_type?: string; // For backward compatibility
  fileUrl?: string;
  file_url?: string; // For backward compatibility
  type?: string;
  url?: string;
  document_url?: string;
  status?: string;
  uploaded_at?: string;
}

export interface VerificationRequest {
  id: string;
  status: VerificationStatus | string;
  submittedAt?: string;
  created_at?: string; // For backward compatibility
  documents?: VerificationDocument[];
  verificationLevel?: string;
  requested_level?: string; // For backward compatibility
  rejectionReason?: string;
  reviewer_notes?: string; // For backward compatibility
}

export interface VerificationFormValues {
  documentType: DocumentType;
  documentFile: File;
  selfieFile?: File;
  consentChecked: boolean;
  documentFrontImage: { file: File; preview: string };
  documentBackImage: { file: File; preview: string };
  selfieImage: { file: File; preview: string };
}

export const verificationFormSchema = {
  // Schema placeholder - add validation schema if needed
};

export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
  cooldownRemaining?: number;
}

export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  requestId?: string;
}
