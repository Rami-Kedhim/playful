
import { supabase } from '@/integrations/supabase/client';
import { VerificationRequest, VerificationStatus, VerificationLevel } from '@/types/verification';

export const verificationService = {
  submitVerificationRequest: async (
    userId: string, 
    documentType: string,
    frontImageFile: File,
    backImageFile: File | null,
    selfieFile: File
  ) => {
    try {
      // Upload front image
      const frontImagePath = `verifications/${userId}/${Date.now()}_front`;
      const { error: frontUploadError } = await supabase.storage
        .from('verification_documents')
        .upload(frontImagePath, frontImageFile);
      
      if (frontUploadError) throw new Error('Failed to upload front ID image');
      
      // Get public URL for the front image
      const { data: { publicUrl: frontImageUrl } } = supabase.storage
        .from('verification_documents')
        .getPublicUrl(frontImagePath);
      
      // Upload back image if provided
      let backImageUrl = '';
      if (backImageFile) {
        const backImagePath = `verifications/${userId}/${Date.now()}_back`;
        const { error: backUploadError } = await supabase.storage
          .from('verification_documents')
          .upload(backImagePath, backImageFile);
        
        if (backUploadError) throw new Error('Failed to upload back ID image');
        
        // Get public URL for the back image
        const { data: { publicUrl: backUrl } } = supabase.storage
          .from('verification_documents')
          .getPublicUrl(backImagePath);
        
        backImageUrl = backUrl;
      }
      
      // Upload selfie image
      const selfiePath = `verifications/${userId}/${Date.now()}_selfie`;
      const { error: selfieUploadError } = await supabase.storage
        .from('verification_documents')
        .upload(selfiePath, selfieFile);
      
      if (selfieUploadError) throw new Error('Failed to upload selfie image');
      
      // Get public URL for the selfie image
      const { data: { publicUrl: selfieImageUrl } } = supabase.storage
        .from('verification_documents')
        .getPublicUrl(selfiePath);
      
      // Create verification documents
      const documents = [
        {
          type: documentType + '_front',
          fileUrl: frontImageUrl,
          uploadedAt: new Date().toISOString(),
          status: 'pending'
        },
        {
          type: 'selfie',
          fileUrl: selfieImageUrl,
          uploadedAt: new Date().toISOString(),
          status: 'pending'
        }
      ];
      
      if (backImageUrl) {
        documents.push({
          type: documentType + '_back',
          fileUrl: backImageUrl,
          uploadedAt: new Date().toISOString(),
          status: 'pending'
        });
      }
      
      // Create verification request
      const { data, error } = await supabase
        .from('verification_requests')
        .insert([{
          profile_id: userId,
          status: 'pending',
          requested_level: 'basic',
          documents: documents,
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      
      return {
        success: true,
        message: 'Verification request submitted successfully',
        requestId: data[0].id
      };
    } catch (error: any) {
      console.error('Verification submission error:', error);
      return {
        success: false,
        message: error.message || 'Failed to submit verification request'
      };
    }
  },
  
  getVerificationStatus: async (userId: string) => {
    try {
      // Get latest verification request
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('profile_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        return {
          status: data[0].status as VerificationStatus,
          lastRequest: data[0] as VerificationRequest
        };
      }
      
      return { status: 'pending' as VerificationStatus };
    } catch (error) {
      console.error('Get verification status error:', error);
      return { status: 'pending' as VerificationStatus };
    }
  },
  
  canSubmitVerification: async (userId: string) => {
    try {
      // Check if user has a pending or approved verification request
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('profile_id', userId)
        .in('status', ['pending', 'in_review', 'approved'])
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // User already has a pending or approved request
        return {
          canSubmit: false,
          reason: `You already have a ${data[0].status} verification request`
        };
      }
      
      // Check if user has a recent rejected request (within last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: rejectedData, error: rejectedError } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('profile_id', userId)
        .eq('status', 'rejected')
        .gt('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (rejectedError) throw rejectedError;
      
      if (rejectedData && rejectedData.length > 0) {
        const rejectedDate = new Date(rejectedData[0].created_at);
        const cooldownEnd = new Date(rejectedDate);
        cooldownEnd.setDate(cooldownEnd.getDate() + 7);
        const cooldownHours = Math.ceil((cooldownEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60));
        
        return {
          canSubmit: false,
          reason: 'Your recent verification request was rejected',
          cooldownRemaining: cooldownHours
        };
      }
      
      // User can submit a verification request
      return { canSubmit: true };
    } catch (error) {
      console.error('Check verification eligibility error:', error);
      return { canSubmit: true }; // Default to allowing submission if there's an error
    }
  }
};

export default verificationService;
