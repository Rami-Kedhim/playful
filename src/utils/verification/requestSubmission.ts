import { supabase } from '@/lib/supabase';
import { DocumentType } from '@/types/verification';

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
    
    // Use environment variable for Supabase URL
    const supabaseUrl = 'https://haffqtqpbnaviefewfmn.supabase.co';
    
    // Get auth session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      throw new Error('Authentication required');
    }
    
    // Call the process-verification edge function
    const response = await fetch(`${supabaseUrl}/functions/v1/process-verification`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${session.access_token}`
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
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to submit verification request' 
    };
  }
};

export const canSubmitVerification = async (userId: string): Promise<{ canSubmit: boolean; reason?: string }> => {
  if (!userId) {
    return { canSubmit: false, reason: 'User ID is required' };
  }

  try {
    const { data, error } = await supabase
      .from('verification_requests')
      .select('status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error checking verification status:', error);
      return { canSubmit: false, reason: 'Failed to check verification status' };
    }

    if (!data) {
      return { canSubmit: true };
    }

    if (data.status === 'pending' || data.status === 'in_review') {
      return { canSubmit: false, reason: 'You already have a pending verification request' };
    }

    // Add cooldown period check if needed
    const cooldownPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const lastSubmission = new Date(data.created_at).getTime();
    const cooldownEnds = lastSubmission + cooldownPeriod;

    if (Date.now() < cooldownEnds && data.status === 'rejected') {
      const daysRemaining = Math.ceil((cooldownEnds - Date.now()) / (24 * 60 * 60 * 1000));
      return {
        canSubmit: false,
        reason: `Please wait ${daysRemaining} days before submitting another verification request`
      };
    }

    return { canSubmit: true };
  } catch (error) {
    console.error('Error in canSubmitVerification:', error);
    return { canSubmit: false, reason: 'An unexpected error occurred' };
  }
};
