
import { useAuth } from "@/hooks/auth/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Escort } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";
import { updateEscortBoostScore } from "@/utils/boostScoreSystem";

/**
 * Custom hook for creating and updating escort profiles
 */
export const useEscortProfileMutation = (
  setEscort: (escort: Escort | null) => void,
  setSaving: (saving: boolean) => void,
  setError: (error: string | null) => void
) => {
  const { user } = useAuth();

  /**
   * Create a new escort profile
   */
  const createEscortProfile = async (profileData: Partial<Escort>) => {
    if (!user) {
      setError("You must be logged in to create an escort profile");
      return null;
    }

    try {
      setSaving(true);
      setError(null);

      // Make sure user_id is included
      const escortData = {
        ...profileData,
        user_id: user.id,
        verified: false,
        verificationLevel: "none" as const,
        rating: 0,
        reviews: 0,
        hasVirtualContent: profileData.providesVirtualContent || false,
        providesInPersonServices: profileData.providesInPersonServices || true,
        created_at: new Date(),
        boostScore: 0 // Initialize with 0
      };

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escorts')
        .insert(escortData)
        .select()
        .single();

      if (error) throw error;

      // Calculate and update the initial boost score
      if (data && data.id) {
        updateEscortBoostScore(data.id).catch(err => {
          console.error("Error updating initial boost score:", err);
        });
      }

      toast({
        title: "Profile Created",
        description: "Your escort profile has been created successfully."
      });

      setEscort(data as Escort);
      return data as Escort;
    } catch (err: any) {
      console.error("Error creating escort profile:", err);
      setError(err.message || "Failed to create escort profile");
      
      toast({
        title: "Error",
        description: err.message || "Failed to create escort profile",
        variant: "destructive"
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
    if (!user) {
      setError("You must be logged in to update an escort profile");
      return null;
    }

    try {
      setSaving(true);
      setError(null);

      // Add updated_at timestamp
      const updateData = {
        ...updates,
        updated_at: new Date()
      };

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escorts')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user can only update their own profiles
        .select()
        .single();

      if (error) throw error;

      // Update the boost score after profile updates
      updateEscortBoostScore(id).catch(err => {
        console.error("Error updating boost score after profile update:", err);
      });

      toast({
        title: "Profile Updated",
        description: "Your escort profile has been updated successfully."
      });

      setEscort(data as Escort);
      return data as Escort;
    } catch (err: any) {
      console.error("Error updating escort profile:", err);
      setError(err.message || "Failed to update escort profile");
      
      toast({
        title: "Error",
        description: err.message || "Failed to update escort profile",
        variant: "destructive"
      });
      
      return null;
    } finally {
      setSaving(false);
    }
  };

  return {
    createEscortProfile,
    updateEscortProfile
  };
};
