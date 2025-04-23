
import { supabase } from '@/lib/supabase';
import { VerificationStatus } from '@/types/verification';
import { User } from '@/types/user';

/**
 * Check verification status for a user
 * @param userId The user ID to check
 * @returns The verification status and last request if any
 */
export const checkVerificationStatus = async (userId: string): Promise<{ 
  status: VerificationStatus;
  lastRequest?: any;
}> => {
  if (!userId) {
    return { status: VerificationStatus.NONE };
  }

  try {
    // First check if user has already been verified through metadata
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Error getting user:', userError);
      return { status: VerificationStatus.NONE };
    }
    
    // If user is already verified through metadata
    if (user.user_metadata?.verification_status === 'approved') {
      return { status: VerificationStatus.APPROVED };
    }
    
    // Check for pending verification requests
    const { data, error } = await supabase
      .from('verification_requests')
      .select('*')
      .eq('profile_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.log('No verification requests found or error:', error);
      return { status: VerificationStatus.NONE };
    }

    if (data) {
      return { 
        status: data.status as VerificationStatus,
        lastRequest: data
      };
    }

    return { status: VerificationStatus.NONE };
  } catch (error) {
    console.error('Error checking verification status:', error);
    return { status: VerificationStatus.NONE };
  }
};

/**
 * Check verification documents for a user
 */
export const getVerificationDocuments = async (userId: string) => {
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from('verification_requests')
      .select('documents')
      .eq('profile_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return [];
    }

    return data.documents || [];
  } catch (error) {
    console.error('Error getting verification documents:', error);
    return [];
  }
};

/**
 * Enhance the user object with verification status
 */
export const enhanceUserWithVerificationStatus = (user: User | null): User | null => {
  if (!user) return null;
  
  // Check if user is verified through metadata
  const isVerified = user.user_metadata?.verification_status === 'approved';
  
  return {
    ...user,
    isVerified
  };
};
