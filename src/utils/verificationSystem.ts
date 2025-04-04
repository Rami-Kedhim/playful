
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
    const { data, error } = await supabase
      .from('verification_requests')
      .insert({
        user_id: userId,
        document_type: documentType,
        document_front_image: frontImageUrl,
        document_back_image: backImageUrl,
        selfie_image: selfieImageUrl,
        status: 'pending',
        submitted_at: new Date()
      })
      .select()
      .single();
      
    if (error) throw new Error(`Failed to create verification request: ${error.message}`);
    
    // 4. Update user profile verification status
    await supabase
      .from('profiles')
      .update({ verification_status: 'pending' })
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
    const { data, error } = await supabase
      .from('verification_requests')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error) {
      // If no request found, return none
      if (error.code === 'PGRST116') {
        return { status: 'pending' };
      }
      throw error;
    }
    
    return {
      status: data.status as VerificationStatus,
      lastRequest: {
        id: data.id,
        userId: data.user_id,
        documentType: data.document_type,
        documentFrontImage: data.document_front_image,
        documentBackImage: data.document_back_image,
        selfieImage: data.selfie_image,
        status: data.status,
        submittedAt: data.submitted_at,
        reviewedAt: data.reviewed_at,
        reviewedBy: data.reviewed_by,
        expiresAt: data.expires_at,
        rejectionReason: data.rejection_reason
      }
    };
  } catch (error) {
    console.error("Error checking verification status:", error);
    // Return pending as a safe default
    return { status: 'pending' };
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
      .eq('user_id', userId)
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
      .select('submitted_at')
      .eq('user_id', userId)
      .gte('submitted_at', twentyFourHoursAgo.toISOString())
      .order('submitted_at', { ascending: false });
      
    if (recentError) throw recentError;
    
    // Limit to 3 requests per 24 hours
    if (recentRequests && recentRequests.length >= 3) {
      // Calculate cooldown remaining
      const oldestRecentRequest = new Date(recentRequests[recentRequests.length - 1].submitted_at);
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
