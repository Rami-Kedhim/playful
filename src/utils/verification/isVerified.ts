
import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';
import { VerificationLevel } from '@/types/verification';

export const isUserVerified = (user: User | null): boolean => {
  if (!user) return false;
  
  // Check if they have verification_status in their metadata
  if (user.user_metadata?.verification_status === 'approved') return true;
  
  return false;
};

export const getUserVerificationLevel = (user: User | null): VerificationLevel => {
  if (!user) return VerificationLevel.NONE;
  
  // Check if they have verification_level in their user_metadata
  const metadataLevel = user.user_metadata?.verification_level;
  
  if (metadataLevel) {
    // Map string value to enum
    switch (metadataLevel.toLowerCase()) {
      case 'basic': return VerificationLevel.BASIC;
      case 'enhanced': return VerificationLevel.ENHANCED;
      case 'premium': return VerificationLevel.PREMIUM;
      default: return VerificationLevel.NONE;
    }
  }
  
  // If verified but no specific level, assume basic
  if (isUserVerified(user)) return VerificationLevel.BASIC;
  
  return VerificationLevel.NONE;
};

export const hasSubmittedVerification = (user: User | null): boolean => {
  if (!user) return false;
  
  // Check user_metadata for verification submitted flag
  return user.user_metadata?.verification_submitted === true;
};
