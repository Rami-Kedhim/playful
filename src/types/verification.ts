
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
  VIP = 'vip'
}

export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export type DocumentType = 'id_card' | 'passport' | 'drivers_license';

export interface VerificationDocument {
  id: string;
  user_id?: string;
  userId?: string;
  document_type: DocumentType;
  documentType?: DocumentType;
  file_url: string;
  fileUrl?: string;
  url?: string;
  document_url?: string;
  file_path?: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded_at: Date;
  uploadedAt?: Date;
  created_at?: Date;
  type?: DocumentType;
  verification_id?: string;
  category?: string;
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
  profile_id?: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_review' | 'expired';
  documentType?: DocumentType;
  document_type?: DocumentType;
  created_at: Date;
  createdAt?: Date;
  submittedAt?: Date;
  updated_at: Date;
  updatedAt?: Date;
  level: VerificationLevel;
  verificationLevel?: VerificationLevel;
  requested_level: VerificationLevel;
  requestedLevel?: VerificationLevel;
  rejection_reason: string | null;
  rejectionReason?: string | null;
  reviewer_notes: string | null;
  reviewerNotes?: string | null;
  reviewedAt?: Date | null;
  reviewed_at?: Date | null;
  documents?: VerificationDocument[];
}

// Add convenience functions to convert between snake_case and camelCase
export const normalizeVerificationRequest = (request: any): VerificationRequest => {
  return {
    id: request.id,
    userId: request.userId || request.user_id || '',
    user_id: request.user_id || request.userId || '',
    profile_id: request.profile_id || '',
    status: request.status,
    documentType: request.documentType || request.document_type,
    document_type: request.document_type || request.documentType,
    created_at: request.created_at ? new Date(request.created_at) : new Date(),
    createdAt: request.createdAt ? new Date(request.createdAt) : new Date(),
    submittedAt: request.submittedAt ? new Date(request.submittedAt) : request.created_at ? new Date(request.created_at) : new Date(),
    updated_at: request.updated_at ? new Date(request.updated_at) : new Date(),
    updatedAt: request.updatedAt ? new Date(request.updatedAt) : new Date(),
    level: request.level || request.verificationLevel || VerificationLevel.NONE,
    verificationLevel: request.verificationLevel || request.level || VerificationLevel.NONE,
    requested_level: request.requested_level || request.requestedLevel || VerificationLevel.BASIC,
    requestedLevel: request.requestedLevel || request.requested_level || VerificationLevel.BASIC,
    rejection_reason: request.rejection_reason || request.rejectionReason,
    rejectionReason: request.rejectionReason || request.rejection_reason,
    reviewer_notes: request.reviewer_notes || request.reviewerNotes,
    reviewerNotes: request.reviewerNotes || request.reviewer_notes,
    reviewedAt: request.reviewedAt ? new Date(request.reviewedAt) : request.reviewed_at ? new Date(request.reviewed_at) : null,
    reviewed_at: request.reviewed_at ? new Date(request.reviewed_at) : request.reviewedAt ? new Date(request.reviewedAt) : null,
    documents: request.documents || [],
  };
};
