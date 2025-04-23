
import { supabase } from '@/lib/supabase';
import { uploadVerificationDocument } from './documentUpload';
import type { DocumentType } from '@/types/verification';

/**
 * Check if a user can submit verification
 * @param userId User ID to check
 * @returns Eligibility response
 */
export const canSubmitVerification = async (userId: string): Promise<{ canSubmit: boolean; reason?: string; cooldownRemaining?: number }> => {
  try {
    // Check if the user already has a pending verification request
    const { data: existingRequests, error } = await supabase
      .from('verification_requests')
      .select('id, status, created_at')
      .eq('profile_id', userId)
      .eq('status', 'pending')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is the code for "no rows returned"
      console.error('Error checking verification eligibility:', error);
      return { canSubmit: false, reason: 'Unable to check eligibility at this time' };
    }

    // If there's a pending request, don't allow another submission
    if (existingRequests) {
      return { 
        canSubmit: false, 
        reason: 'You already have a pending verification request.' 
      };
    }

    return { canSubmit: true };
  } catch (error) {
    console.error('Error checking verification eligibility:', error);
    return { canSubmit: false, reason: 'Unable to check eligibility at this time' };
  }
};

/**
 * Submit verification request
 * @param userId User ID
 * @param documentType The type of document
 * @param frontImage Front image of ID
 * @param backImage Back image of ID (optional for passport)
 * @param selfieImage Selfie image
 * @returns Submission response
 */
export const submitVerificationRequest = async (
  userId: string,
  documentType: string,
  frontImage: File,
  backImage: File | null,
  selfieImage: File
): Promise<{ success: boolean; message: string; requestId?: string }> => {
  try {
    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('frontImage', frontImage);
    if (backImage) formData.append('backImage', backImage);
    formData.append('selfieImage', selfieImage);
    
    // Get current domain for edge function URL
    const supabaseUrl = supabase.supabaseUrl;
    
    // Call the process-verification edge function
    const response = await fetch(`${supabaseUrl}/functions/v1/process-verification`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${supabase.auth.session()?.access_token || localStorage.getItem('supabase.auth.token') || ''}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to submit verification request');
    }
    
    const result = await response.json();
    
    return {
      success: true,
      message: 'Verification submitted successfully',
      requestId: result.verificationId
    };
  } catch (error) {
    console.error('Error submitting verification request:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to submit verification request' };
  }
};

/**
 * Submit verification form
 * Wrapper function for submitVerificationRequest to handle form data
 */
export const submitVerificationForm = async (
  userId: string,
  formData: {
    documentType: DocumentType;
    documentFile: File;
    selfieImage: {file: File, preview: string};
    documentBackImage?: {file: File, preview: string};
  }
): Promise<{ success: boolean; message: string; requestId?: string }> => {
  console.log('Submitting verification form:', formData);
  try {
    return await submitVerificationRequest(
      userId,
      formData.documentType,
      formData.documentFile,
      formData.documentBackImage?.file || null,
      formData.selfieImage.file
    );
  } catch (error: any) {
    console.error('Error submitting verification form:', error);
    return { success: false, message: error.message || 'Failed to submit verification request' };
  }
};
