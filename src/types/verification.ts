
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationRequest {
  id: string;
  profile_id: string;
  status: VerificationStatus;
  requested_level: VerificationLevel;
  documents?: any[];
  created_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
}

export interface VerificationFormValues {
  documentType: string;
  documentFrontImage: {
    file?: File;
    preview: string;
  };
  documentBackImage?: {
    file?: File;
    preview: string;
  };
  selfieImage: {
    file?: File;
    preview: string;
  };
}
