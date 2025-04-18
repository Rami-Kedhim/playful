
// This file resolves the casing issue by re-exporting from Escort.ts
export * from './Escort';

// Add the missing ContactInfo type
export interface ContactInfo {
  email: string;
  phone: string;
  website?: string;
}

// Adding VerificationStatus enum
export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

// Adding VerificationLevel enum with ENHANCED
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}
