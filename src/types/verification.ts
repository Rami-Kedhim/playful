
export enum VerificationLevel {
  NONE = "none",
  BASIC = "basic",
  VERIFIED = "verified",
  ENHANCED = "enhanced",
  PREMIUM = "premium"
}

export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string; // Added for DocumentPreview.tsx
  filePath?: string; // Added for DocumentPreview.tsx
  documentType?: string; // Added for DocumentPreview.tsx
}

export interface VerificationRequest {
  id: string;
  userId: string;
  profile_id?: string; // Added for review components
  status: VerificationStatus;
  verificationLevel: VerificationLevel;
  requested_level?: string; // Added for ReviewRequestModal.tsx
  requestedLevel?: string; // Added for backward compatibility
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  created_at?: string; // Added for VerificationReviewPanel
  rejectionReason?: string;
  reviewed_at?: string; // Added for VerificationReviewPanel
}
