
import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';
import { VerificationLevel } from '@/types/verification';

/**
 * Check if a user profile is verified
 * @param user The user object to check
 * @returns Boolean indicating verification status
 */
export const isUserVerified = (user: User | null): boolean => {
  if (!user) return false;
  
  // Check if they have is_verified set to true in their profile
  if (user.isVerified === true) return true;
  
  // Check user_metadata for verification status
  if (user.user_metadata?.verification_status === 'approved') return true;
  
  return false;
};

/**
 * Check if a user has submitted verification that's pending
 * @param user The user object to check
 * @returns Boolean indicating pending verification
 */
export const hasSubmittedVerification = (user: User | null): boolean => {
  if (!user) return false;
  
  // Check user_metadata for verification submitted flag
  if (user.user_metadata?.verification_submitted === true) return true;
  
  return false;
};

/**
 * Get the user's verification level
 * @param user The user object to check
 * @returns The verification level string or 'none'
 */
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

/**
 * Check verification status against database
 * @param userId User ID to check
 * @returns Promise resolving to verification status object
 */
export const checkProfileVerificationStatus = async (userId: string) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_verified, verification_level')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    
    let verificationLevel = VerificationLevel.NONE;
    
    // Map database string to enum value
    if (profile?.verification_level) {
      switch (profile.verification_level) {
        case 'basic':
          verificationLevel = VerificationLevel.BASIC;
          break;
        case 'enhanced':
          verificationLevel = VerificationLevel.ENHANCED;
          break;
        case 'premium':
          verificationLevel = VerificationLevel.PREMIUM;
          break;
        default:
          verificationLevel = VerificationLevel.NONE;
      }
    }
    
    return {
      isVerified: profile?.is_verified || false,
      level: verificationLevel
    };
  } catch (error) {
    console.error('Error checking verification status:', error);
    return { isVerified: false, level: VerificationLevel.NONE };
  }
};
