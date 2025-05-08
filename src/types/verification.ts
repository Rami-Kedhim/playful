
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
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  documentType?: string;
  // Add for backward compatibility
  filePath?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatusType;
  verificationLevel: VerificationLevelType;
  requested_level?: VerificationLevelType;
  documents: VerificationDocument[];
  submittedAt: string;
  created_at?: string; // For compatibility with existing code
  updatedAt?: string;
  rejectionReason?: string;
  reviewer_notes?: string;
  profile_id?: string; // Added for compatibility with existing components
}

// Adding constants for verification levels that match the enum
export const VERIFICATION_LEVELS = {
  NONE: VerificationLevel.NONE,
  BASIC: VerificationLevel.BASIC,
  ENHANCED: VerificationLevel.ENHANCED,
  PREMIUM: VerificationLevel.PREMIUM,
  VERIFIED: VerificationLevel.VERIFIED
};

// Helper function to convert string to verification level
export function toVerificationLevel(level: string): VerificationLevelType {
  switch (level) {
    case 'basic': return VerificationLevel.BASIC;
    case 'enhanced': return VerificationLevel.ENHANCED;
    case 'premium': return VerificationLevel.PREMIUM;
    case 'verified': return VerificationLevel.VERIFIED;
    default: return VerificationLevel.NONE;
  }
}

export interface VerificationStats {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  totalCount: number;
}
