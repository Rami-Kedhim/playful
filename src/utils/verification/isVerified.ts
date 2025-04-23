
import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';

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
export const getUserVerificationLevel = (user: User | null): string => {
  if (!user) return 'none';
  
  // Check if they have verification_level in their profile
  if (user.verification_level) return user.verification_level;
  
  // Check user_metadata for verification level
  if (user.user_metadata?.verification_level) return user.user_metadata.verification_level;
  
  // If verified but no specific level, assume basic
  if (isUserVerified(user)) return 'basic';
  
  return 'none';
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
    
    return {
      isVerified: profile?.is_verified || false,
      level: profile?.verification_level || 'none'
    };
  } catch (error) {
    console.error('Error checking verification status:', error);
    return { isVerified: false, level: 'none' };
  }
};
