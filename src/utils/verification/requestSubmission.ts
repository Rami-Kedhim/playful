
import { supabase } from "@/integrations/supabase/client";
import { uploadVerificationDocuments } from "./documentUpload";
import { VerificationSubmissionResponse } from "./types";

/**
 * Submits a verification request for an escort or client
 */
export const submitVerificationRequest = async (
  userId: string, 
  documentType: "passport" | "id_card" | "driver_license" | "other",
  documentFrontImage: File,
  documentBackImage: File | null,
  selfieImage: File
): Promise<VerificationSubmissionResponse> => {
  try {
    // 1. Upload images to secure bucket
    const uploadResult = await uploadVerificationDocuments(
      userId, 
      documentFrontImage, 
      documentBackImage, 
      selfieImage
    );
    
    if (!uploadResult.success) {
      throw new Error(uploadResult.error || "Document upload failed");
    }
    
    // 2. Create verification request in database
    // Use a type assertion to bypass type checks, since the table already exists but has different structure
    const { data, error } = await (supabase as any)
      .from('verification_requests')
      .insert({
        profile_id: userId,
        requested_level: 'basic' as const,
        status: 'pending',
        documents: {
          documentType: documentType,
          frontImage: uploadResult.frontImageUrl,
          backImage: uploadResult.backImageUrl,
          selfieImage: uploadResult.selfieImageUrl
        },
        created_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) throw new Error(`Failed to create verification request: ${error.message}`);
    
    // 3. Update user profile verification status
    // Use a type assertion to bypass type checks for the verification_status field
    await (supabase as any)
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
