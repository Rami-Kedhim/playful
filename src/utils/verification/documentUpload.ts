
import { supabase } from "@/integrations/supabase/client";

/**
 * Upload verification documents to secure storage
 */
export const uploadVerificationDocuments = async (
  userId: string,
  documentFrontImage: File,
  documentBackImage: File | null,
  selfieImage: File
): Promise<{
  frontImageUrl: string;
  backImageUrl: string | null;
  selfieImageUrl: string;
  success: boolean;
  error?: string;
}> => {
  try {
    // Create paths for the images
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
    let backImageUrl = null;
    
    if (documentBackImage) {
      backImagePath = `verifications/${userId}/back_${Date.now()}`;
      const { error: backUploadError } = await supabase.storage
        .from('verification')
        .upload(backImagePath, documentBackImage, { upsert: true });
        
      if (backUploadError) throw new Error(`Back document upload failed: ${backUploadError.message}`);
      
      // Get URL for back image
      backImageUrl = supabase.storage.from('verification').getPublicUrl(backImagePath).data.publicUrl;
    }
    
    // Get URLs for uploaded front and selfie images
    const frontImageUrl = supabase.storage.from('verification').getPublicUrl(frontImagePath).data.publicUrl;
    const selfieImageUrl = supabase.storage.from('verification').getPublicUrl(selfieImagePath).data.publicUrl;
    
    return {
      frontImageUrl,
      backImageUrl,
      selfieImageUrl,
      success: true
    };
  } catch (error: any) {
    console.error("Error uploading verification documents:", error);
    return {
      frontImageUrl: '',
      backImageUrl: null,
      selfieImageUrl: '',
      success: false,
      error: error.message
    };
  }
};
