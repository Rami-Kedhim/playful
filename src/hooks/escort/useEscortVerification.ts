
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { VerificationRequest, VerificationStatus } from "@/types/escort";

/**
 * Custom hook for managing escort verification
 */
export const useEscortVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submit a verification request
   */
  const submitVerificationRequest = async (
    userId: string,
    documentType: VerificationRequest['documentType'],
    documentFrontImage: string,
    selfieImage: string,
    documentBackImage?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Create the verification request
      const verificationRequest: Omit<VerificationRequest, 'id'> = {
        userId,
        documentType,
        documentFrontImage,
        documentBackImage,
        selfieImage,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('verification_requests')
        .insert([verificationRequest])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Verification submitted",
        description: "Your verification documents have been submitted for review",
      });
      
      return data;
    } catch (err: any) {
      console.error("Error submitting verification request:", err);
      setError(err.message || "Failed to submit verification request");
      
      toast({
        title: "Error submitting verification",
        description: err.message || "Failed to submit verification request",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check verification status
   */
  const checkVerificationStatus = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('verification_requests')
        .select('*')
        .eq('userId', userId)
        .order('submittedAt', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No verification requests found
          return null;
        }
        throw error;
      }
      
      return data as VerificationRequest;
    } catch (err: any) {
      console.error("Error checking verification status:", err);
      setError(err.message || "Failed to check verification status");
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update profile verification level
   */
  const updateVerificationLevel = async (
    escortId: string, 
    verificationLevel: "none" | "basic" | "enhanced" | "premium",
    verificationDate?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escorts')
        .update({ 
          verificationLevel,
          verificationDate: verificationDate || new Date().toISOString()
        })
        .eq('id', escortId)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Verification updated",
        description: `Your verification level has been updated to ${verificationLevel}`,
      });
      
      return data;
    } catch (err: any) {
      console.error("Error updating verification level:", err);
      setError(err.message || "Failed to update verification level");
      
      toast({
        title: "Error updating verification",
        description: err.message || "Failed to update verification level",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitVerificationRequest,
    checkVerificationStatus,
    updateVerificationLevel
  };
};

export default useEscortVerification;
