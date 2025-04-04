
import { supabase } from "@/integrations/supabase/client";
import { VerificationRequest, VerificationStatus } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

/**
 * Submits a verification request for an escort or client
 */
export const submitVerificationRequest = async (
  userId: string, 
  documentType: "passport" | "id_card" | "driver_license" | "other",
  documentFrontImage: File,
  documentBackImage: File | null,
  selfieImage: File
): Promise<{ success: boolean; message: string; requestId?: string }> => {
  try {
    // 1. Upload images to secure bucket
    const frontImagePath = `verifications/${userId}/front_${Date.now()}`;
    const selfieImagePath = `verifications/${userId}/selfie_${Date.now()}`;
    
    // Upload front document image
    const { error: frontUploadError } = await supabase.storage
      .from('verification')
      .upload(frontImagePath, documentFrontImage, { upsert: true });
      
    if (frontUploadError) throw new Error(`Front document upload failed: ${frontUploadError.message}`);
    
    // Upload selfie image
    const { error: selfieUploadError } = await supabase.storage
      .from('verification')
      .upload(selfieImagePath, selfieImage, { upsert: true });
      
    if (selfieUploadError) throw new Error(`Selfie upload failed: ${selfieUploadError.message}`);
    
    // Upload back document image if provided
    let backImagePath = null;
    if (documentBackImage) {
      backImagePath = `verifications/${userId}/back_${Date.now()}`;
      const { error: backUploadError } = await supabase.storage
        .from('verification')
        .upload(backImagePath, documentBackImage, { upsert: true });
        
      if (backUploadError) throw new Error(`Back document upload failed: ${backUploadError.message}`);
    }
    
    // 2. Get URLs for uploaded files
    const frontImageUrl = supabase.storage.from('verification').getPublicUrl(frontImagePath).data.publicUrl;
    const selfieImageUrl = supabase.storage.from('verification').getPublicUrl(selfieImagePath).data.publicUrl;
    const backImageUrl = backImagePath 
      ? supabase.storage.from('verification').getPublicUrl(backImagePath).data.publicUrl 
      : null;
    
    // 3. Create verification request in database
    // Use a type assertion to bypass type checks, since the table already exists but has different structure
    const { data, error } = await (supabase as any)
      .from('verification_requests')
      .insert({
        profile_id: userId,
        requested_level: 'basic' as const,
        status: 'pending',
        documents: {
          documentType: documentType,
          frontImage: frontImageUrl,
          backImage: backImageUrl,
          selfieImage: selfieImageUrl
        },
        created_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) throw new Error(`Failed to create verification request: ${error.message}`);
    
    // 4. Update user profile verification status
    await supabase
      .from('profiles')
      .update({ verification_status: 'pending' as VerificationStatus })
      .eq('id', userId);
    
    return {
      success: true,
      message: "Verification request submitted successfully. We'll review your documents within 24-48 hours.",
      requestId: data.id
    };
    
  } catch (error: any) {
    console.error("Verification request failed:", error);
    return { 
      success: false, 
      message: error.message || "Verification request failed. Please try again."
    };
  }
};

/**
 * Checks the status of a user's verification
 */
export const checkVerificationStatus = async (userId: string): Promise<{
  status: VerificationStatus;
  lastRequest?: VerificationRequest;
}> => {
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
 * Gets verification badge level based on user's verification status and other factors
 */
export const getVerificationLevel = (
  isVerified: boolean,
  verificationDate?: string,
  additionalChecks: {
    hasPhoneVerification?: boolean;
    hasEmailVerification?: boolean;
    hasPaymentVerification?: boolean;
    hasCommunityReviews?: boolean;
  } = {}
): "none" | "basic" | "enhanced" | "premium" => {
  if (!isVerified) return "none";
  
  const { hasPhoneVerification, hasEmailVerification, hasPaymentVerification, hasCommunityReviews } = additionalChecks;
  
  // Premium verification requires all checks
  if (
    hasPhoneVerification && 
    hasEmailVerification && 
    hasPaymentVerification && 
    hasCommunityReviews
  ) {
    return "premium";
  }
  
  // Enhanced verification requires phone + at least one other verification
  if (
    hasPhoneVerification && 
    (hasEmailVerification || hasPaymentVerification)
  ) {
    return "enhanced";
  }
  
  // Basic verification is just ID verification
  return "basic";
};

/**
 * Checks if a user can submit a verification request
 * (not too many recent requests, not already verified, etc.)
 */
export const canSubmitVerification = async (userId: string): Promise<{
  canSubmit: boolean;
  reason?: string;
  cooldownRemaining?: number; // in hours
}> => {
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
