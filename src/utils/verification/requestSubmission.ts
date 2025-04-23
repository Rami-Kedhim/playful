
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
