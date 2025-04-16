
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { VerificationFormValues, VerificationRequest, VerificationStatus, VerificationLevel } from "@/types/verification";

export const verificationService = {
  /**
   * Check if a user can submit a verification request
   */
  async canSubmitVerification(userId: string) {
    try {
      // Check if user already has a pending verification
      const { data, error } = await supabase
        .from("verification_requests")
        .select("status, created_at")
        .eq("profile_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      // If no previous request found
      if (!data) {
        return { canSubmit: true };
      }

      // Check status of most recent request
      if (data.status === "pending" || data.status === "in_review") {
        return {
          canSubmit: false,
          reason: "You already have a pending verification request"
        };
      }

      // If recently rejected, enforce cooling period
      if (data.status === "rejected") {
        const rejectedDate = new Date(data.created_at);
        const cooldownDays = 7; // 7 day cooling period
        const cooldownEnds = new Date(rejectedDate.setDate(rejectedDate.getDate() + cooldownDays));
        
        if (new Date() < cooldownEnds) {
          return {
            canSubmit: false,
            reason: `You can submit a new verification request after ${cooldownEnds.toLocaleDateString()}`
          };
        }
      }

      return { canSubmit: true };
    } catch (error: any) {
      console.error("Error checking verification eligibility:", error);
      return {
        canSubmit: false,
        reason: "An error occurred checking eligibility"
      };
    }
  },

  /**
   * Submit a verification request
   */
  async submitVerificationRequest(formData: VerificationFormValues, userId: string) {
    try {
      // Upload documents to storage
      const uploadResults = await Promise.all([
        this.uploadDocument(formData.documentFrontImage.file!, userId, 'front'),
        formData.documentBackImage?.file 
          ? this.uploadDocument(formData.documentBackImage.file, userId, 'back') 
          : Promise.resolve(null),
        this.uploadDocument(formData.selfieImage.file!, userId, 'selfie')
      ]);

      // Filter out null results (in case back image was optional)
      const documentUrls = uploadResults.filter(Boolean) as string[];

      // Create documents array for the verification request
      const documents = [
        {
          type: formData.documentType,
          category: 'front',
          fileUrl: uploadResults[0]
        },
        ...(uploadResults[1] ? [{
          type: formData.documentType,
          category: 'back',
          fileUrl: uploadResults[1]
        }] : []),
        {
          type: 'selfie',
          category: 'selfie',
          fileUrl: uploadResults[2]
        }
      ].filter(doc => doc.fileUrl);

      // Create verification request
      const { data, error } = await supabase
        .from("verification_requests")
        .insert({
          profile_id: userId,
          status: 'pending',
          requested_level: 'basic',
          documents,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Update profile to show verification was submitted
      await supabase
        .from("profiles")
        .update({
          verification_submitted: true,
          last_verification_request: new Date().toISOString()
        })
        .eq("id", userId);

      return {
        success: true,
        verificationId: data.id,
        message: "Your verification request has been submitted successfully."
      };
    } catch (error: any) {
      console.error("Error submitting verification:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred"
      };
    }
  },

  /**
   * Upload a document to storage
   */
  async uploadDocument(file: File, userId: string, category: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${category}_${Date.now()}.${fileExt}`;
    const filePath = `verification/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('verification-documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('verification-documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  /**
   * Get verification status for a user
   */
  async getVerificationStatus(userId: string) {
    try {
      // Get the profile's current verification status
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("verification_level, is_verified")
        .eq("id", userId)
        .single();

      if (profileError) throw profileError;

      // Get the most recent verification request
      const { data: request, error: requestError } = await supabase
        .from("verification_requests")
        .select("*")
        .eq("profile_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (requestError && requestError.code !== "PGRST116") {
        throw requestError;
      }

      return {
        success: true,
        profile,
        request: request || null
      };
    } catch (error: any) {
      console.error("Error fetching verification status:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch verification status"
      };
    }
  },

  /**
   * Subscribe to verification status changes
   */
  subscribeToVerificationUpdates(userId: string, callback: (verificationRequest: VerificationRequest) => void) {
    return supabase
      .channel('public:verification_requests')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'verification_requests',
          filter: `profile_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new as VerificationRequest);
        }
      )
      .subscribe();
  },

  /**
   * Upgrade verification level
   */
  async upgradeVerificationLevel(userId: string, targetLevel: VerificationLevel) {
    try {
      const { data, error } = await supabase
        .from("verification_requests")
        .insert({
          profile_id: userId,
          status: 'pending',
          requested_level: targetLevel,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        verificationId: data.id,
        message: `Your upgrade request to ${targetLevel} level has been submitted.`
      };
    } catch (error: any) {
      console.error("Error upgrading verification level:", error);
      return {
        success: false,
        message: error.message || "Failed to request verification upgrade"
      };
    }
  }
};
