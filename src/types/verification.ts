
// Define VerificationLevel both as enum value and type for better TypeScript support
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
  VERIFIED = 'verified'
}

// Create a type that can be used with the enum
export type VerificationLevelType = keyof typeof VerificationLevel;

// Create VerificationStatus enum for better TypeScript support
export enum VerificationStatus {
  NONE = 'none',
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

// Create a type that can be used with the enum
export type VerificationStatusType = keyof typeof VerificationStatus;

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string; // Main property for file access
  filePath?: string; // Add for backward compatibility
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  notes?: string;
  documentType?: string;
  verification_request_id?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatusType | string;
  verificationLevel?: VerificationLevelType;
  requested_level?: VerificationLevelType | string;
  requestedLevel?: VerificationLevelType | string;
  documents: VerificationDocument[];
  submittedAt: string;
  created_at?: string; // For compatibility with existing code
  updatedAt?: string;
  rejectionReason?: string;
  reviewer_notes?: string;
  profile_id?: string; // Added for compatibility with existing components
  reviewed_at?: string;
  expires_at?: string;
  reviewed_by?: string;
}

// Adding constants for verification levels that match the enum
export const VERIFICATION_LEVELS = {
  NONE: VerificationLevel.NONE,
  BASIC: VerificationLevel.BASIC,
  ENHANCED: VerificationLevel.ENHANCED,
  PREMIUM: VerificationLevel.PREMIUM,
  VERIFIED: VerificationLevel.VERIFIED
};

// Add constants for verification statuses
export const VERIFICATION_STATUS = {
  NONE: VerificationStatus.NONE,
  PENDING: VerificationStatus.PENDING,
  IN_REVIEW: VerificationStatus.IN_REVIEW,
  APPROVED: VerificationStatus.APPROVED,
  REJECTED: VerificationStatus.REJECTED,
  EXPIRED: VerificationStatus.EXPIRED
};

// Helper function to convert string to verification level
export function toVerificationLevel(level: string): VerificationLevelType {
  switch (level) {
    case 'basic': return 'BASIC';
    case 'enhanced': return 'ENHANCED';
    case 'premium': return 'PREMIUM';
    case 'verified': return 'VERIFIED';
    default: return 'NONE';
  }
}

export interface VerificationStats {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  totalCount: number;
}
