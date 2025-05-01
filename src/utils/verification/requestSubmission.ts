
import { supabase } from '@/lib/supabase';
import { uploadDocumentFile } from './documentUpload';

/**
 * Check if a user can submit a new verification request
 * @param userId User ID to check
 * @returns Object with result and reason if not possible
 */
export const canSubmitVerification = async (userId: string): Promise<{ canSubmit: boolean; reason?: string }> => {
  try {
    // In a real app, we'd check the user's verification status in the database
    // For now, mock this based on the user's metadata
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return { canSubmit: false, reason: 'User not authenticated' };
    }
    
    // If the user already has a pending verification
    if (user.user_metadata?.verification_status === 'pending') {
      return { canSubmit: false, reason: 'You already have a pending verification request' };
    }
    
    // If the user's verification was recently rejected, enforce a cooldown period
    if (user.user_metadata?.verification_status === 'rejected') {
      const rejectionDate = new Date(user.user_metadata.verification_rejected_at || Date.now());
      const cooldownPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
      const cooldownEnds = new Date(rejectionDate.getTime() + cooldownPeriod);
      
      if (Date.now() < cooldownEnds.getTime()) {
        const daysRemaining = Math.ceil((cooldownEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return { 
          canSubmit: false, 
          reason: `Please wait ${daysRemaining} days before submitting another verification request` 
        };
      }
    }
    
    return { canSubmit: true };
  } catch (error) {
    console.error('Error checking verification status:', error);
    return { canSubmit: false, reason: 'An error occurred while checking your verification status' };
  }
};

/**
 * Submit a verification request
 * @param userId User ID
 * @param documentType Type of document
 * @param frontImage Front image file
 * @param backImage Back image file (optional)
 * @param selfieImage Selfie image file
 * @returns Result object with success flag and message
 */
export const submitVerificationRequest = async (
  userId: string,
  documentType: string,
  frontImage: File,
  backImage: File | null,
  selfieImage: File
): Promise<{ success: boolean; message: string; requestId?: string }> => {
  try {
    // Upload front document
    const frontResult = await uploadDocumentFile(userId, frontImage, `${documentType}_front`);
    if (!frontResult.success) {
      return { success: false, message: frontResult.error || 'Failed to upload front document' };
    }

    // Upload back document if provided
    let backResult = { success: true, url: '' };
    if (backImage) {
      backResult = await uploadDocumentFile(userId, backImage, `${documentType}_back`);
      if (!backResult.success) {
        return { success: false, message: backResult.error || 'Failed to upload back document' };
      }
    }

    // Upload selfie
    const selfieResult = await uploadDocumentFile(userId, selfieImage, 'selfie');
    if (!selfieResult.success) {
      return { success: false, message: selfieResult.error || 'Failed to upload selfie' };
    }

    // Create the verification request in the database
    // In a real app, this would be done server-side for security
    // For now, we'll simulate it with a mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // For demo purposes, let's update the user's metadata
    // In a real app, this would be done through a secure API call
    const requestId = `req-${Date.now()}`;
    const { error } = await supabase.auth.updateUser({
      data: {
        verification_status: 'pending',
        verification_submitted_at: new Date().toISOString(),
        verification_request: {
          id: requestId,
          profile_id: userId,
          status: 'pending',
          documents: [
            {
              id: `doc-front-${Date.now()}`,
              documentType: documentType,
              fileUrl: frontResult.url,
              uploadedAt: new Date().toISOString(),
              status: 'pending'
            },
            ...(backResult.url ? [{
              id: `doc-back-${Date.now()}`,
              documentType: documentType,
              fileUrl: backResult.url,
              uploadedAt: new Date().toISOString(),
              status: 'pending'
            }] : []),
            {
              id: `doc-selfie-${Date.now()}`,
              documentType: 'selfie',
              fileUrl: selfieResult.url,
              uploadedAt: new Date().toISOString(),
              status: 'pending'
            }
          ],
          created_at: new Date().toISOString(),
          requested_level: 'basic',
          submittedAt: new Date().toISOString()
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Verification request submitted successfully',
      requestId
    };
  } catch (error: any) {
    console.error('Error submitting verification:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit verification request'
    };
  }
};
