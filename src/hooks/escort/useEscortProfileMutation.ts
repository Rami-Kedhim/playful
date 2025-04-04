
import { supabase } from "@/integrations/supabase/client";
import { Escort } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";
import { updateEscortBoostScore } from "@/utils/boostScoreSystem";

/**
 * Custom hook for mutating escort profile data
 */
export const useEscortProfileMutation = (
  setEscort: (escort: Escort | null) => void,
  setSaving: (saving: boolean) => void,
  setError: (error: string | null) => void
) => {
  /**
   * Create a new escort profile
   */
  const createEscortProfile = async (profile: Omit<Escort, "id">) => {
    try {
      setSaving(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escorts')
        .insert([profile])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Profile created",
        description: "Your escort profile has been created successfully",
      });
      
      setEscort(data as Escort);
      return data as Escort;
    } catch (err: any) {
      console.error("Error creating escort profile:", err);
      setError(err.message || "Failed to create escort profile");
      
      toast({
        title: "Error creating profile",
        description: err.message || "Failed to create escort profile",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setSaving(false);
    }
  };

  /**
   * Update an existing escort profile
   */
  const updateEscortProfile = async (id: string, updates: Partial<Escort>) => {
    try {
      setSaving(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escorts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Update the escort boost score
      await updateEscortBoostScore(id);
      
      toast({
        title: "Profile updated",
        description: "Your escort profile has been updated successfully",
      });
      
      setEscort(data as Escort);
      return data as Escort;
    } catch (err: any) {
      console.error("Error updating escort profile:", err);
      setError(err.message || "Failed to update escort profile");
      
      toast({
        title: "Error updating profile",
        description: err.message || "Failed to update escort profile",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setSaving(false);
    }
  };

  return { createEscortProfile, updateEscortProfile };
};
