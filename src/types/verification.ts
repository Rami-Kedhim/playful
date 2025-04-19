
// Add missing VerificationLevel enum exports and DocumentType type to fix import errors

export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export type DocumentType = 'id_card' | 'passport' | 'driver_license' | 'utility_bill';

export interface VerificationDocument {
  id: string;
  userId: string;
  documentType: string;
  document_type?: string; // For backward compatibility
  fileUrl: string;
  file_path?: string; // For backward compatibility
  url?: string; // For backward compatibility
  status: VerificationStatus;
  uploadedAt: string;
  uploaded_at?: string; // For backward compatibility
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface VerificationRequest {
  id: string;
  userId?: string;
  user_id?: string; // backward compatibility
  profile_id?: string;
  requestDate?: string;
  requested_level?: VerificationLevel;
  verificationLevel?: VerificationLevel;
  level?: VerificationLevel;
  status: VerificationStatus;
  documents: VerificationDocument[];
  reviewedAt?: string;
  reviewed_by?: string;
  rejectionReason?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  submittedAt?: string;
  created_at?: string;
  updatedAt?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  rejectionReason?: string;
  reviewer_notes?: string;
  expires_at?: string;
}
