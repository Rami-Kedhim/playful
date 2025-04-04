
import { supabase } from "@/integrations/supabase/client";
import { VerificationRequest, VerificationStatus } from "@/types/escort";
import { VerificationStatusResponse, VerificationEligibilityResponse } from "./types";

/**
 * Checks the status of a user's verification
 */
export const checkVerificationStatus = async (userId: string): Promise<VerificationStatusResponse> => {
  try {
    // Get the latest verification request
    // Use a type assertion to bypass type checks
    const { data, error } = await (supabase as any)
      .from('verification_requests')
      .select('*')
      .eq('profile_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error) {
      // If no request found, return none
      if (error.code === 'PGRST116') {
        return { status: 'pending' as VerificationStatus };
      }
      throw error;
    }
    
    // JSON parsing helper function to safely extract values
    const getDocumentValue = <T>(documents: any, key: string, defaultValue: T): T => {
      try {
        if (typeof documents === 'string') {
          const parsed = JSON.parse(documents);
          return (parsed[key] as T) || defaultValue;
        } else if (documents && typeof documents === 'object') {
          return (documents[key] as T) || defaultValue;
        }
        return defaultValue;
      } catch (e) {
        return defaultValue;
      }
    };
    
    // Convert the database fields to our expected VerificationRequest type
    return {
      status: data.status as VerificationStatus,
      lastRequest: {
        id: data.id,
        userId: data.profile_id,
        documentType: getDocumentValue(data.documents, 'documentType', 'other'),
        documentFrontImage: getDocumentValue(data.documents, 'frontImage', ''),
        documentBackImage: getDocumentValue(data.documents, 'backImage', ''),
        selfieImage: getDocumentValue(data.documents, 'selfieImage', ''),
        status: data.status as VerificationStatus,
        submittedAt: data.created_at,
        reviewedAt: data.reviewed_at,
        reviewedBy: data.reviewed_by,
        expiresAt: data.expires_at,
        rejectionReason: data.reviewer_notes
      }
    };
  } catch (error) {
    console.error("Error checking verification status:", error);
    // Return pending as a safe default
    return { status: 'pending' as VerificationStatus };
  }
};

/**
 * Checks if a user can submit a verification request
 * (not too many recent requests, not already verified, etc.)
 */
export const canSubmitVerification = async (userId: string): Promise<VerificationEligibilityResponse> => {
  try {
    // Check if user already has a pending verification
    const { data: pendingRequests, error: pendingError } = await supabase
      .from('verification_requests')
      .select('id')
      .eq('profile_id', userId)
      .eq('status', 'pending')
      .limit(1);
      
    if (pendingError) throw pendingError;
    
    if (pendingRequests && pendingRequests.length > 0) {
      return {
        canSubmit: false,
        reason: "You already have a pending verification request. Please wait until it's reviewed."
      };
    }
    
    // Check if user has submitted too many requests recently (anti-spam)
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    const { data: recentRequests, error: recentError } = await supabase
      .from('verification_requests')
      .select('created_at')
      .eq('profile_id', userId)
      .gte('created_at', twentyFourHoursAgo.toISOString())
      .order('created_at', { ascending: false });
      
    if (recentError) throw recentError;
    
    // Limit to 3 requests per 24 hours
    if (recentRequests && recentRequests.length >= 3) {
      // Calculate cooldown remaining
      const oldestRecentRequest = new Date(recentRequests[recentRequests.length - 1].created_at);
      const cooldownEnds = new Date(oldestRecentRequest);
      cooldownEnds.setHours(cooldownEnds.getHours() + 24);
      
      const currentTime = new Date();
      const hoursRemaining = Math.ceil((cooldownEnds.getTime() - currentTime.getTime()) / (1000 * 60 * 60));
      
      return {
        canSubmit: false,
        reason: `You've submitted too many verification requests recently. Please try again later.`,
        cooldownRemaining: hoursRemaining
      };
    }
    
    // All checks passed
    return { canSubmit: true };
    
  } catch (error) {
    console.error("Error checking verification eligibility:", error);
    return {
      canSubmit: false,
      reason: "Unable to check verification eligibility. Please try again later."
    };
  }
};
