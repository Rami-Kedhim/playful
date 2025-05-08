
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

// Create VerificationStatus enum for better TypeScript support
export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string; // Added notes field for admin feedback
  documentType?: string; // For better document classification
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: keyof typeof VerificationStatus;
  verificationLevel: VerificationLevel;
  requested_level?: VerificationLevel; // Added for compatibility
  documents: VerificationDocument[];
  submittedAt: string;
  created_at?: string; // For compatibility with existing code
  updatedAt?: string;
  rejectionReason?: string;
  reviewer_notes?: string; // For admin feedback
}

// Adding constants for verification levels
export const VERIFICATION_LEVELS = {
  NONE: 'none' as VerificationLevel,
  BASIC: 'basic' as VerificationLevel,
  ENHANCED: 'enhanced' as VerificationLevel,
  PREMIUM: 'premium' as VerificationLevel
};

// Helper function to convert string to verification level
export function toVerificationLevel(level: string): VerificationLevel {
  switch (level) {
    case 'basic': return 'basic';
    case 'enhanced': return 'enhanced';
    case 'premium': return 'premium';
    default: return 'none';
  }
}

export interface VerificationStats {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  totalCount: number;
}
