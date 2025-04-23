
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { VerificationStatus } from '@/types/verification';

export const useVerificationProcess = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.NONE);

  const submitVerification = async (formData: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to submit verification",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Upload document files to Supabase Storage
      const documentFile = formData.documentFile;
      const selfieFile = formData.selfieImage?.file;

      if (!documentFile || !selfieFile) {
        throw new Error("Missing required document files");
      }

      // Get Supabase URL from environment
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error("Missing Supabase configuration");
      }

      // Get auth token from localStorage or current session
      const authData = localStorage.getItem('sb-haffqtqpbnaviefewfmn-auth-token');
      let accessToken = '';
      
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          accessToken = parsed.access_token || '';
        } catch (e) {
          console.error("Error parsing auth token", e);
        }
      }

      if (!accessToken) {
        throw new Error("No authentication token found");
      }

      // Create FormData for the API request
      const apiFormData = new FormData();
      apiFormData.append('documentType', formData.documentType);
      apiFormData.append('frontImage', documentFile);
      apiFormData.append('selfieImage', selfieFile);

      // Call the process-verification edge function
      const response = await fetch(`${supabaseUrl}/functions/v1/process-verification`, {
        method: 'POST',
        body: apiFormData,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to submit verification request');
      }

      const result = await response.json();

      // Update user metadata to indicate verification has been submitted
      await supabase.auth.updateUser({
        data: { 
          verification_submitted: true,
          verification_documents: {
            submittedAt: new Date().toISOString()
          }
        }
      });

      toast({
        title: "Verification submitted",
        description: "Your verification request has been submitted successfully.",
      });

      setStatus(VerificationStatus.PENDING);
      return true;
    } catch (error: any) {
      console.error("Verification submission error:", error);
      setError(error.message || "An error occurred during submission");
      
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit verification request",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    status,
    submitVerification
  };
};

export default useVerificationProcess;
