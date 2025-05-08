
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Escort } from "@/types/escort"; // Using lowercase to avoid casing issues

/**
 * Hook for mutating escort profile data
 */
export const useEscortProfileMutation = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Update an escort profile
   */
  const updateEscortProfile = async (escortData: Partial<Escort>): Promise<boolean> => {
    if (!escortData.id) {
      setError("Escort ID is required");
      return false;
    }

    try {
      setIsUpdating(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error: updateError } = await (supabase as any)
        .from('escorts')
        .update(escortData)
        .eq('id', escortData.id);

      if (updateError) throw updateError;
      
      return true;
    } catch (err: any) {
      console.error("Error updating escort profile:", err);
      setError(err.message || "Failed to update escort profile");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Create a new escort profile
   */
  const createEscortProfile = async (escortData: Partial<Escort>): Promise<string | null> => {
    try {
      setIsUpdating(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error: createError } = await (supabase as any)
        .from('escorts')
        .insert([escortData])
        .select();

      if (createError) throw createError;
      
      return data?.[0]?.id || null;
    } catch (err: any) {
      console.error("Error creating escort profile:", err);
      setError(err.message || "Failed to create escort profile");
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateEscortProfile,
    createEscortProfile,
    isUpdating,
    error
  };
};

export default useEscortProfileMutation;
